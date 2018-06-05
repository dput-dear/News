<template>
    <div class="login" :style="{height:winHeight+'px'}">
        <div class="loginCon">
            <ul class='clearfix'>
                <li 
                    :class="{active:type==2}"
                    @click='changeTab'
                >登录</li>
                <li 
                    :class="{active:type==1}"
                    @click='changeTab'
                >注册</li>
            </ul>
            <el-form ref='ruleForm' :rules="rules" :model="formData" @keyup.enter.native="submitForm('ruleForm')">
                <el-form-item label="" prop="name" >
                    <el-input placeholder='用户名' v-model='formData.name' ></el-input>
                </el-form-item>
                <el-form-item label="" prop="pwd">
                    <el-input type='password' placeholder='密码' v-model='formData.pwd'></el-input>
                </el-form-item>
                <el-form-item label="" prop="pwdConfirm" v-if='type==1'>
                    <el-input type='password' placeholder='再次输入密码' v-model='formData.pwdConfirm'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">submit</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import checkLogin from '../common/checkLogin.js'
export default {
    name: 'Login',
    props:["winHeight"],
    data:function(){
        var confirmPwd = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.formData.pwd) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
        };
        var checkName = (rule,value,callback)=>{
            if(this.type == 1){
                this.$axios.get('/api/user/getNames?name='+encodeURIComponent(value))
                    .then(data=>{
                        if(data.data.length>0){
                            callback(new Error('该用户名已被占用！'));
                        }else{
                           callback(); 
                        }
                    }).catch(err=>{
                        throw err;
                    });
            }else{
                callback();
            }
        }
        return {
            type:2,
            formData:{
                name:'',
                pwd:'',
                pwdConfirm:''
            },
            rules:{
                name:[
                    {required:true,message:"用户名不能为空！",trigger:"blur"},
                    {validator:checkName,trigger:"change"}
                ],
                pwd:[
                    {required:true,message:"密码不能为空！",trigger:"blur"}
                ],
                pwdConfirm:[
                    {validator:confirmPwd,trigger:"blur"}
                ]
            }
        }
    },
    beforeCreate:function(){
        this.$global.getCookie(this);
    },
    methods:{
        changeTab:function(){
            this.type = this.type==1?2:1;
            this.$refs['ruleForm'].resetFields();
        },
        submitForm:function(formName){
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(_this.type == 1){//注册
                        _this.$axios.post('/api/user/register',_this.formData)
                            .then(result=>{
                                if(result.data.Status == 0){
                                    _this.$message({
                                        message: '注册成功',
                                        type: 'success'
                                    });
                                    _this.$refs['ruleForm'].resetFields();
                                    _this.type=2;
                                }
                            }).catch(err=>{
                                throw err;
                            })
                    }else if(_this.type == 2){//登录
                        let path = window.location.href.split('?')[1];
                        if(path){
                            path = path.split('router=')[1];
                        }else{
                            path='/';
                        }
                        _this.$axios.post('/api/user/login',_this.formData)
                            .then(result=>{
                                if(result.data.Status == 0){
                                    _this.$router.push(path?path:'/');
                                    _this.$emit('changeLogStatus',true);
                                }else{
                                    _this.$message.error(result.data.Message);
                                }
                            }).catch(err=>{
                                throw err;
                            })
                    }
                } else {
                    return false;
                }
            });
        }
    }
}
</script>
<style lang='less'>
    @mainColor:#3a93f2;
    .login{
        min-height:500px;
        background: url('../../static/images/bottomBg.png') bottom center no-repeat;
        .loginCon{
            width:300px;
            margin:0 auto;
            border:1px solid #ddd;
            border-radius:5px;
            overflow:hidden;
            position:absolute;
            top:30%;
            left:0;
            right:0;
            background-color: #fff;
            ul{
                border-bottom: 1px solid #e4e4e4;
                li{
                    float:left;
                    width: 50%;
                    height:40px;
                    line-height:40px;
                    text-align:center;
                    cursor: pointer;
                    &.active{
                        background-color:@mainColor;
                        color:#fff;
                    }
                }
            }
            form{
                padding:10px 20px 0;
                text-align:center;
            }
        }
    }
</style>

