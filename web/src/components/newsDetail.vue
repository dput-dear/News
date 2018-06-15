<template>
<div class="newsDetail" :loading="true">
    <h1>{{data.title}}</h1>
    <p class='clearfix newInfo'>
        <span class='fl return' @click="back"> <<返回</span>
        <span class='fr'>{{data.createUserName}}</span> 
        <span class='fr'>{{data.createTime}}</span> 
    </p>
    <p class='summary'>摘要：{{data.summary}}</p>
    <div class="content" v-for="(p,index) in data.content" :key="index">
        <div class='item' v-for="(img,i) in p.fileList" :key="i">
            <img :src="imgUrl(img.url)" alt="">
        </div>
        <p>{{p.text}}</p>
    </div>
</div>
</template>

<script>
export default {
    name: 'newsDetail',
    props:[],
    data:function(){
        return {
            domian:this.$global.domian,
            data:{}
        }
    },
    mounted:function(){
        this.$global.getCookie(this);
        this.$emit('changeNav','new');
        let _this = this;
       // 获取详情
        let newID = this.$route.query.newID;
        if(newID){
            this.$axios.get('/api/news/detail',{params:{newID:newID}})
            .then(result=>{
                let data = result.data.data
                let content = JSON.parse(JSON.parse(data.content));
                data.content = content;
                data.createTime = _this.$global.formatDate(data.createTime);
                _this.data = data;
            })
            .catch(err=>{
                console.log(err);
            })   
        }
    },
    methods:{
        imgUrl:function(url){
            return this.domian+url
        },
        back:function(){
            this.$router.push('/new');
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
    .clearOverflow_b(@height,@color){
        &:after{
            display:block;
            content:'';
            height:@height;
            width:100%;
            background-color: @color;
        }
    }
    .newsDetail{
        .clearOverflow_t(90px,#f6f7fc);
        width:1200px;
        margin:0 auto;
        background-color: #fff;
        h1{
            font-size:28px;
            font-weight:bold;
            text-align:center;
            line-height:100px;
        }
        .summary{
            padding:0 40px;
            text-indent:2em;
            line-height:26px;
            font-weight:bold;
        }
        .newInfo{
            width:1000px;
            padding:0 20px;
            margin:20px auto;
            border-bottom:1px solid #e4e4e4;
            color:#999;
            line-height:30px;
            span{
                margin:0 10px;
                &.return{
                    color:@mainColor;
                    cursor:pointer;
                }
            }
        }
        .content{
            padding:20px 40px;
            .item{
                img{
                    display:block;
                    margin:0 auto;
                }
            }
            p{
                text-indent:2em;
                line-height:26px;
            }
        }
    }
</style>