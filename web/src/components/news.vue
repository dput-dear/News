<template>
    <div class="news">
        <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
        >
        <el-table-column
          type="selection"
          width="35">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="enumName"
          label="标签"
          width="120">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
            width="180">
        </el-table-column>
        <el-table-column
          prop="summary"
          label="摘要"
          width="500"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button size='mini' type="primary" icon="el-icon-document"
            @click="detail(scope.row)"></el-button>
            <el-button size='mini' type="primary" icon="el-icon-edit"
            @click="edit(scope.row)"></el-button>
            <el-button size='mini' type="danger" icon="el-icon-delete"
            @click='deleteRow(scope.row,scope.$index)'></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      background
      :page-size="20"
      layout="prev, pager, next,total"
      :total="totalCount"
      @current-change="changePageIndex">
    </el-pagination>
    </div>
</template>
<script>
    export default{
        name:"News",
        data:function(){
            return {
                loading:false,
                tableData:[],
                totalCount:0,
                query:{
                    pageIndex:1,
                    pageSize:20
                }
            }
        },
        props:["winHeight"],
        mounted:function(){
            let _this = this;
            this.$global.getCookie(this);
            this.getList();
        },
        methods:{
            getList:function(){
                let _this = this;
                this.loading = true;
                this.$axios.get('/api/news/getList',{params:this.query})
                .then(result=>{
                    _this.loading = false;
                    if(result.data.Status == 0){
                        var data = result.data.data;
                        $(data).each(function(index,item){
                            if(item.createTime){
                                item.createTime = _this.$global.formatDate(item.createTime.toLocaleString(),'yyyy-MM-dd hh:mm:ss');
                            }
                        });
                       this.tableData = data;
                       this.totalCount = result.data.count; 
                    }
                }).catch(err=>{
                    _this.loading = false;
                    console.log(err);
                })
            },
            changePageIndex:function(curPage){
                this.query.pageIndex = curPage;
                this.getList();
            },
            edit:function(data){
                this.$router.push({path:'/addNews', query:{"newID":data.newID}});
                this.$emit('changeData',data,'news');
            },
            deleteRow:function(scope,index){
                var param = {
                    newID : scope.newID
                }
                var _this = this;
                this.$axios.get('/api/news/delete',{params:param}).then(result=>{
                    if(result.data.Status == 0){
                        _this.tableData.splice(index,1);
                        _this.totalCount--;
                        _this.$message({
                            message:'删除成功',
                            type:"success"
                        });

                    }
                }).catch(err=>{
                    _this.$message.error(err);
                })
            },
            detail:function(data){
                this.$router.push({path:'/newsDetail', query:{"newID":data.newID}});
                this.$emit('changeData',data,'news');
            }
        }
    }
</script>
<style lang='less'>
    .clearOverflow_t(@height,@color){
        &:before{
            display:block;
            content:'';
            height:@height;
            width:100%;
            background-color: @color;
        }
    }
    .news{
        width:1200px;
        height:100%;
        margin:0 auto;
        .clearOverflow_t(100px,#f6f7fc);
        .el-table{
            table{
                th{
                    background:rgba(58,147,242,0.1);
                    color:#333;
                }
            }
        }
        .el-pagination{
            text-align:center;
            padding:20px 0;
        }
    }
</style>