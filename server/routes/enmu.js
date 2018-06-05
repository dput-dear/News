var express = require('express');
var router = express.Router();
var db = require('./db');

router.get('/getList',(req,res) =>{
    let type = req.query.type;
    let sql = `select * from T_Enum where enumType=${type}`;
    db.selectSql(sql).then(data=>{
        res.send({
            Status:0,
            Message:"Success",
            data:data
        });
    },err=>{
        res.send({
            Status: -1,
            Message: "err"
        });
        throw err;
    })
});
module.exports=router;