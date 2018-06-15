var express = require('express');
var router = express.Router();

let db = require('./db')
let formatSql = require('../common/formatSql')
let formatDate = require('../common/common').formatDate;

router.post('/create', function (req, res) {
	let query=req.body;
	let user = decodeURI(req.cookies.user).split('|')[0];
	let loginCode = decodeURI(req.cookies.user).split('|')[1];
	db.selectSql(`select * from T_User where name='${user}' and loginCode='${loginCode}'`).then(userInfo => {
		if (userInfo.length) {
			let content = query.content;
			let newID = query.newID;
			content = JSON.stringify(content);
			query.content = content;
			if (newID) {//更新
				query.updateUserName = user;
				query.updateUserID = userInfo[0].userID;
				query.updateTime = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
				let value = '';
				for (var i in query) {
					if(i!='newID'){
						if (typeof query[i] == 'number') {
							value += `${i}=${query[i]},`;
						} else {
							value += `${i}='${query[i]}',`;
						}
					}
				}
				value = value.substring(0, value.length - 1);
				let sql = `update T_News set ${value} where newID=${newID}`;
				db.selectSql(sql).then(data => {
					res.send({
						Status: 0,
						Message: '更新成功！'
					})
				}, err => {
					throw err;
				})

			} else {//添加
				query.createUserName = user;
				query.createUserID = userInfo[0].userID;
				// query.createTime = formatDate(new Date().toLocaleString(), 'yyyy-MM-dd hh:mm:ss');
				// console.log(query.createTime);
				
				query.status = 0;
				let sql = formatSql.insert(query, 'T_News');
				db.selectSql(sql)
					.then(data => {
						res.send({
							Status: 0,
							Message: '添加成功！'
						});
					}, err => {
						throw err;
					})
			}
		}
	}, err => {
		throw err;
	});
});

router.get('/getList',function(req,res){
	let pageSize = req.query.pageSize;
	let pageIndex = req.query.pageIndex;
	let start,end;
	delete req.query.pageSize;
	delete req.query.pageIndex;
	if (pageSize && pageIndex) {
		start = parseInt(pageIndex - 1) * pageSize;
		end = parseInt(start) + parseInt(pageSize);
	}
	req.query.status = 0;
	let sql = formatSql.select(req.query, 'T_News',true);
	sql +=` left join T_Enum on T_News.tagID = T_Enum.enumCode where T_News.status=0 order by T_News.createTime desc`;
	db.selectSql(sql).then(data=>{
		res.send({
			Status:0,
			Message:"Success",
			count:data.length,
			data:data.slice(start,end)
		})
	},err=>{
		throw err;
	})
});

router.get('/delete',function(req,res){
	db.selectSql(`update T_News set status=-1 where newID=${req.query.newID}`)
		.then(data=>{
			res.send({
				Status:0,
				Message:"Success"
			});
		},err=>{
			throw err;
		})
});

router.get('/detail',function(req,res){
	let newID = req.query.newID;
	if(newID){
		db.selectSql(`select * from T_News where newID=${newID}`)
			.then(data => {
				res.send({
					Status: 0,
					Message: "Success",
					data: data[0]
				})
			}, err => {
				throw err;
			})
	}
});

module.exports = router;
