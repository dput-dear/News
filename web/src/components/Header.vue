<template>
<div class="header">
    <div class="headerCon">
        <ul class="clearfix topBox">
            <li class="fl topLogo"><a href="/">办公平台</a></li>
            <ul class='fl nav' v-if="isLogin">
                <li><router-link to="/">首页</router-link></li>
                <li :class='{active:current=="new"}'><router-link to="/new">新闻</router-link></li>
            </ul>
            <li class='fr clearfix userInfo' v-if="isLogin">
                <span class="fl realName">{{user}}</span>
                <span class="fl line"></span>
                <span class="fl exit" @click="exit">退出</span>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import Cookie from 'js-cookie';
export default {
    name: 'Header',
    props:['user','current','isLogin'],
    methods:{
        exit:function(){
            Cookie.remove('user');
            this.$router.push( `/login?router=${this.$route.path.split('/')[1]}`);
            this.$emit('changeLogStatus',false);
        }
    }
}
</script>
<style lang='less'>
    @mainColor:#3a93f2;
    .header{
        height:50px;
        line-height:50px;
        width:100%;
        position:fixed;
        left:0;
        right:0;
        top:0;
        z-index:2;
        border-bottom: 1px solid #ddd;
        background-color: #fff;
        .headerCon{
            width:1200px;
            margin:0 auto;
            .topBox{
                .topLogo{
                    display:inline-block;
                    height:50px;
                    background:url('../../static/images/title_pic.png') left center no-repeat;
                    padding-left:55px;
                    font-size: 24px;
                    font-weight: bold;
                    a{
                        color:@mainColor;
                    }
                }
                .nav{
                    margin-left:100px;
                    li{
                        float:left;
                        height:50px;
                        line-height:50px;
                        font-size:18px;
                        a{
                            display:block;
                            height:100%;
                            padding:0 20px;
                            &.router-link-exact-active{
                                background-color:@mainColor;
                                color:#fff;
                            }
                        }
                        &.active{
                            background-color:@mainColor;
                            a{
                                color:#fff;
                            }
                        }
                    }
                }
                .userInfo{
                    height:50px;
                    line-height:50px;
                    span{
                        height:50px;
                        &.line{
                            height:16px;
                            width:2px;
                            background:#999;
                            margin:17px 10px;
                        }
                        &.exit{
                            cursor:pointer;
                            color:red;
                        } 
                    }
                }
            }
        }
    }
</style>