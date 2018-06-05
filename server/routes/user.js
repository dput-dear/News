var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var db = require('./db')

router.get('/getNames', function (req, res) {
	let name = req.query.name;
	db.selectSql(`select * from T_User where name = '${name}'`).then(data => {
		res.send(data);
	}, err => {
		throw err;
	});
});
router.post('/register', function (req, res) {
	let name = req.body.name;
	db.selectSql(`select * from T_User where name = '${name}'`).then(data => {
		if (data.length > 0) {
			res.send({
				Status: -1,
				Message: '用户名已被占用！'
			});
		} else {
			let d = crypto.createHash('md5').update(req.body.pwd).digest('hex');
			let sql = `insert into [dbo].[T_User] (name,pwd) values('${name}','${d}')`;
			db.selectSql(sql).then(data => {
				res.send({
					Status: 0,
					Message: "Success"
				});
				return;
			}, err => {
				throw err;
			})
		}

	}, err => {
		throw err;
	});

});
router.post('/login',function(req,res){
	let name = req.body.name;
	let pwd = crypto.createHash('md5').update(req.body.pwd).digest('hex');
	let sql1 = `select * from T_User where name='${name}' and pwd='${pwd}'`;
	db.selectSql(sql1)
		.then(data1=>{
			if(data1.length>0){
				let loginCode = new Date().getTime()+parseInt(Math.random()*100);
				db.selectSql(`update T_User set loginCode=${loginCode} where name='${name}'`).then(data2=>{
					res.cookie('user', `${encodeURI(name)}|${loginCode}`);
					res.send({
						Status: 0,
						Message: "登陆成功"
					})
				},err=>{
					throw err;
				});
			}else{
				res.send({
					Status:-1,
					Message:"用户名或密码错误！"
				})
			}
		},err=>{
			throw err;
		})
});
module.exports = router;
