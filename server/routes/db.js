var mssql = require('mssql');
var conf = require('../common/conf.js').mainDatabase;
var restoreDefaults = function(){
    conf;
}
// 连接数据库
var getConnectDb = function(callback){
    if(!callback){
        callback = function(){}
    }
    var con = new mssql.ConnectionPool(conf,(err)=>{
        if(err){
            throw(err);
        }
        callback(con);
    })
}

// 封装执行方法
var querySql = function(sql,params,callback){
    getConnectDb((connection)=>{
        var ps = new mssql.PreparedStatement(connection);
        if(params !=''){
            for(var name in params){
                if(typeof params[name] == "number"){
                    ps.input(name,mssql.Int);
                }else if(typeof params[name] == "string"){
                    ps.input(name,mssql.NVarChar);
                }
            }
        }
        ps.prepare(sql,(err)=>{
            if(err){
                console.log(err);
            }
            ps.execute(params,(err,doc)=>{
                callback(err,doc);
                ps.unprepare((err)=>{
                    if(err){
                        console.log(err);
                    } 
                });
            });
        });
    });
    restoreDefaults();
};

// 封装查询
var selectSql = function(sql){
    return new Promise((resolve,reject) =>{
        querySql(sql,'',(err,resoult)=>{
            if(err){
                reject(err)
            }else{
                resolve(resoult.recordset);
            }
        })
    });  
}

module.exports = {
    config:conf,
    restoreDefaults:restoreDefaults,
    selectSql:selectSql
}