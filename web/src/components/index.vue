<template>
<div class="index" :style="{height:winHeight+'px'}">
  <div class="indexCon">
    <el-row :gutter="20">
        <el-col :span="6">
           <el-card shadow="hover">
               <img src="/static/images/newsIcon.png"  v-on:mouseenter="showIcon('news')">
               <router-link to="/addNews">
                   <div class="fixed" 
                        v-show='icon.news'
                        v-on:mouseleave="hideIcon('news')" >
                        <i class="el-icon-circle-plus"></i>
                    </div>
               </router-link>
            </el-card>
        </el-col>
    </el-row>
</div>
   
</div>
</template>

<script>
export default {
    name: 'Index',
    data:function(){
        return {
            icon:{
                news:false
            }
        }
    },
    props:["winHeight"],
    mounted:function(){
        this.$global.getCookie(this);
        this.$emit('changeNav','index');
    },
    methods:{
        showIcon:function(type){
            switch(type){
                case 'news':
                    this.icon.news = true;
                    break;
            }
        },
        hideIcon:function(type){
            switch(type){
                case 'news':
                    this.icon.news = false;
                    break;
            }
        }
    }
}
</script>
<style lang='less'>
    @mainColor:#3a93f2;
    .clearOverflow_t(@height,@color){
        &:before{
            display:block;
            content:'';
            height:@height;
            width:100%;
            background-color: @color;
        }
    }
    .index{
        .clearOverflow_t(150px,#f6f7fc);
        height:100%;
        background: url('../../static/images/bottomBg.png') bottom center no-repeat;
        .indexCon{
            width:1200px;
            margin:0 auto;
            .el-card{
                position:relative;
                img{
                    width:100%;
                }
                .fixed{
                    position:absolute;
                    left:0;
                    right:0;
                    bottom:0;
                    top:0;
                    background:rgba(255,255,255,0.8);
                    font-size:80px;
                    color:#666;
                    text-align:center;
                    line-height:300px;
                    cursor:pointer;
                }
            }
        }  
    }
</style>