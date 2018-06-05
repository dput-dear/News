<template>
    <div class="news">
        <el-table
        :data="tableData"
        border
        style="width: 100%"
        :style="{minHeight:'104px',maxHeight:tabHeight}"
        >
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createUserName"
          label="作者"
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
            <el-button size='mini' type="primary" icon="el-icon-document"></el-button>
            <el-button size='mini' type="primary" icon="el-icon-edit"></el-button>
            <el-button size='mini' type="danger" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
    export default{
        name:"News",
        data:function(){
            return {
                tableData:[{
                    title:'优酷72小时闪电战',
                    createUserName:'严冬雪',
                    summary:"6月14日，北京时间23点，本届世界杯揭幕战就要开始。知道了南北半球差异、答对了高考题的袁晞也许会坐在自家宽大客厅的沙发上，回想起40年前那个炎热的夏天，光膀子的汗水味道，和12寸黑白电视屏幕上的雪花噪点",
                    createTime:"2018-01-02 09:10:09",
                }]
            }
        },
        props:["winHeight"],
        beforeCreate:function(){
            this.$global.getCookie(this);
        },
        computed:{
            tabHeight:function(){
                return this.winHeight-200+'px';
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
    }
</style>