module.exports = {
    // flag用于标识是否是多表查询
    select: function (query, t_name,flag) {
        let sql = `select * from ${t_name}`;
        if (query) {
            if(!flag){
                sql += ` where 1=1`;
            }
            for (var i in query) {
                if(flag){
                    sql += `${query[i] ? " and " +t_name+"."+ i + "='" + query[i] + "'" : ''}`;
                }else{
                    sql += `${query[i] ? " and " + i + "='" + query[i] + "'" : ''}`;
                }
            }
        }
        return sql;
    },
    select1: function (query,selectData,t_name) {
        let selectStr = '';
        for(var i in selectData){
            selectStr+=`${selectData[i]},`
        }
        let sql = `select ${selectStr.substring(0, selectStr.length-1)} from ${t_name} where 1=1`;
        for (var i in query) {
            sql += `${query[i] !=null ? " and " + i + "='" + query[i] + "'" : ''}`;
        }
        return sql;
    },
    where:function(query){
        let sql='where 1=1';
        if(query){
            for(var i in query){
                sql += `${query[i] ? " and " + i + "='" + query[i] + "'" : ''}`
            }
        }
        return sql;
    },
    insert:function(query,t_name){
        let sql = `INSERT INTO ${t_name} `;
        if(query){
            sql+="(";
            for(var i in query){
                sql+=i+','
            }
            sql=`${sql.substring(0,sql.length-1)}) VALUES(`;
            for (var i in query) {
                if (typeof (query[i]) == 'number'){
                    sql += query[i] + ','
                }else{
                    sql += `'${query[i]}',`;
                }
            }
            sql = `${sql.substring(0, sql.length - 1)})`;
        }
        return sql;
    }
};