var express = require('express');
var multiparty  = require('multiparty');
var http = require('http');
var util = require('util');
var fs = require('fs');
var router = express.Router();

router.post('/',function(req,res){    /* 生成multiparty对象，并配置上传目标路径 */    
    var form = new multiparty.Form();
    /* 设置编辑 */
    form.encoding='utf-8';
    /*设置文件存储路径*/ 
    if (!fs.existsSync('./public/files')) {
        fs.mkdirSync('./public/files');
    }
    form.uploadDir='./public/files';
    /*设置文件大小 */
    form.maxFileSize = 2*1024*1024;
    /*上传后的处理 */
    form.parse(req,function(err,fields,files){
        if(err){
            console.log(err);
        }else{
            var file = files.file[0];
            var uploadedPath = file.path;
            var dstPath = `./public/files/${file.originalFilename}`;
            fs.rename(uploadedPath,dstPath);
        }
        res.set('Access-Control-Allow-Origin','*');
        res.set('Access-Control-Allow-Origin','*');
        res.set("Access-Control-Allow-Headers:content-type");
        res.set("Access-Control-Request-Method:GET,POST");
        res.send({
            Status:0,
            Message:"Success",
            files:[{
                name: file.originalFilename,
                url: `/files/${file.originalFilename}`
            }]
        });
    });
});

module.exports = router;
