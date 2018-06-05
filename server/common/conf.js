module.exports={
    SysID:"SYS021",
    // 权限数据库
    checkDatabase: {
        user: "sa",//数据库用户名
        password: "123.abc",//数据库密码
        server: "192.168.3.51",//服务器地址
        database: "Organization",//数据库名称
        port: 1433,//端口
        options: {
            encrypt: true
        },
        pool: {
            min: 0,
            max: 10,
            idleTimeoutMillis: 3000
        }
    },
    // 基本数据
    mainDatabase: {
        user: "lixiaohan",//数据库用户名
        password: "123.abc",//数据库密码
        server: "127.0.0.1",//服务器地址
        database: "news",//数据库名称
        port: 1433,//端口
        options: {
            encrypt: true
        },
        pool: {
            min: 0,
            max: 10,
            idleTimeoutMillis: 3000
        }
    }
}