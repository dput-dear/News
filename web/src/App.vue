<template>
    <div id="app">
        <v-header 
            v-bind:user='userName'
            v-bind:isLogin='isLogin'
            v-bind:current='current'
            v-on:changeLogStatus="changeLogStatus"> 
        </v-header>
        <div class="con">
            <router-view 
                v-on:setUser="setUser"
                v-on:changeNav="changeNav"
                v-on:changeLogStatus="changeLogStatus"
                v-bind:winHeight="winHeight">
            </router-view>
        </div>
    </div>
</template>
<script>
import Header from './components/Header.vue'
import checkLogin from './common/checkLogin.js'
export default {
    name: 'App',
    data:function(){
        return {
            userName:'',
            current:"",
            isLogin:false,
            winHeight:$(window).outerHeight(true),
            data:{
                news:{}
            }
        }
    },
    components:{
        VHeader:Header
    },
    mounted:function(){
        let _this = this;
        $(window).resize(function(){
            _this.winHeight = $(window).outerHeight()
        });
    },
    methods:{
        setUser:function(userName){
            if(userName){
                this.userName = userName;
            }else{
                this.userName = '';
            }  
        },
        changeNav:function(navName){
            this.current=navName;
        },
        changeLogStatus:function(status){
            this.isLogin = status;
        },
        changeData:function(data,type){
            this.data[type] = data;
        }
    }
}
</script>
<style lang='less'>
    #app{
        min-height:100%;
        position: relative;
        background-color: #f6f7fc;
        .con{
            min-height:100%;
        }
    }
</style>
