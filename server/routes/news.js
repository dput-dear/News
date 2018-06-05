var express = require('express');
var router = express.Router();

let db = require('./db')
let formatSql = require('../common/formatSql')
let formatDate = require('../common/common').formatDate;

router.post('/create', function (req, res) {
	let query = req.body;
	let user = decodeURI(req.cookies.user).split('|')[0];
	let loginCode = decodeURI(req.cookies.user).split('|')[1];
	db.selectSql(`select * from T_User where name='${user}' and loginCode='${loginCode}'`).then(data => {
		if (data.length) {
			let content = query.content;
			query.createUserName = user;
			query.createTime = formatDate(new Date(),'yyyy-MM-dd hh:mm:ss');
			for (var i in content) {
				content[i].fileList = JSON.stringify(content[i].fileList);
			}
			content = JSON.stringify(content);
			query.content = content;
			let sql = formatSql.insert(query, 'T_News');
			console.log(sql);
			
			db.selectSql(sql)
				.then(data=>{
					res.send({
						Status:0,
						Message:'Success'
					})
				},err=>{
					throw err;
				})
		}
	}, err => {
		throw err;
	})



});

module.exports = router;
