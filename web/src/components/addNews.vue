<template>
<div class="addNews">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="新闻标题" prop="title">
            <el-input v-model="form.title" ></el-input>
        </el-form-item>
        <el-form-item label="标签">
            <el-select v-model="form.tagID"
                placeholder="请选择新闻所属标签"
                remote clearable>
                <el-option v-for="item in tags" 
                    :label="item.enumName" 
                    :value="item.enumCode"  
                    :key="item.enumCode"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="新闻摘要" prop="summary">
            <el-input type="textarea" 
                v-model="form.summary"
                :style="{width:'520px',height:'100px'}">
            </el-input>
        </el-form-item>
        <el-form-item label="新闻段落"
            :rules="{required:true,message:'新闻段落不能为空',trigger:'blur'}"
            v-for="(pContent,index) in form.content" :key="pContent.key"
            :prop="'content.'+index+'.text'">
            <el-row :gutter="0"  >
                <el-col :span="18">
                    <el-input type="textarea" 
                        v-model="pContent.text" 
                        :style="{width:'520px',height:'100px'}"
                        placeHolder="请分段输入..."
                        >
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <v-upload
                      url="http://127.0.0.1:3000/api/upload/"
                      accept="image/jpg,image/png"
                      :uploadIndex="index"
                      :headers="{method:'post'}"
                      :on-remove="handleRemove"
                      :on-success="handleSuccess"
                      :file-list="pContent.fileList"
                      list-type="list">
                    </v-upload>
                </el-col>
                <el-col :span="2">
                    <el-button type='danger' size="mini" icon="el-icon-delete" circle
                        :style="{marginLeft:'10px'}"
                        @click="delParagraph(index)"></el-button>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-button 
                type='primary'
                plain
                icon='el-icon-plus' 
                size="mini"
                :style="{marginLeft:'200px'}"
                @click="addParagraph">新增段落</el-button>
        </el-form-item>
        <el-form-item>
            <el-row :gutter="0">
                <el-col :span="5" :style="{height:'1px'}"> </el-col>
                <el-col :span="6">
                    <el-button type="primary" :loading="isLoad" @click="submitForm('form')">发布</el-button>
                </el-col>
                <el-col :span="6">
                    <el-button>取消</el-button>
                </el-col>
            </el-row>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import upload from './upload.vue'
export default {
    name: 'AddNews',
    props:[],
    data:function(){
        return {
            isLoad:false,
            form:{
                title:'',
                tagID:null,
                summary:"",
                content:[{
                    index:0,
                    text:"",
                    fileList:[]
                }]
            },
            rules:{
                title:[
                    {required:true,message:"请输入新闻标题",trigger:'blur'}
                ],
                summary:[
                {min:0,max:150,message:"摘要长度不能超过150",trigger:'blur'}]
            },
            tags:[]
        }
    },
    components:{
        VUpload:upload
    },
    mounted:function(){
        this.$global.getCookie(this);
        this.$emit('changeNav','new');
        let _this = this;
        // 获取标签的下拉框
        this.$axios.get('/api/enmu/getList?type=1')
            .then(result=>{
                if(result.data.Status == 0){
                    _this.tags = result.data.data;
                }else{
                    _this.$message.error(result.data.message);
                }
            }).catch(err=>{
                console.log(err);
            });
        // 获取详情
        let newID = this.$route.query.newID;
        if(newID){
            this.$axios.get('/api/news/detail',{params:{newID:newID}})
            .then(result=>{
                let data = result.data.data
                let content = JSON.parse(JSON.parse(data.content));
                data.content = content;
                _this.form = data;
            })
            .catch(err=>{
                console.log(err);
            })   
        }
    },
    methods:{
        addParagraph:function(){
            var index = this.form.content[this.form.content.length-1].index+1;
            this.form.content.push({
                index:index,
                text:'',
                fileList:[]
            });
        },
        delParagraph:function(index){
            this.form.content.splice(index,1);
        },       
        handleRemove(file, fileList,index) {
            var fileIndex = this.form.content[index = index].fileList[name = file.name]
            this.form.content[index = index].fileList.splice(fileIndex,1);
        },
        handleSuccess(response,file,fileList,index){
            this.form.content[index = index].fileList.push(response.files[0]);
        },
        submitForm:function(formName){
            this.isLoad = true;
            let _this = this;
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    let query = {
                        newID:this.form.newID,
                        title:this.form.title,
                        tagID:this.form.tagID,
                        summary:this.form.summary,
                        content:JSON.stringify(this.form.content)
                    }
                    _this.$axios.post('/api/news/create',query)
                        .then(result=>{
                            _this.isLoad = false;
                            if(result.data.Status == 0){
                                this.$message({
                                  message: '发布成功！',
                                  type: 'success'
                                });
                                setTimeout(function(){
                                   _this.$router.push('/new');
                                },500);
                            }
                        }).catch(err=>{
                            _this.isLoad = false;
                            this.$message.error(err);
                        })
                }
            });
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
    .addNews{
        .clearOverflow_t(90px,#fff);
        .clearOverflow_b(50px,#fff);
        background-color: #fff;
        min-height:100%;
        .el-form{
            border:1px solid #ddd;
            box-shadow:0 0 10px #ddd;
            border-radius:5px;
            width:800px;
            padding:30px 50px;
            margin:0 auto;
            background:#fff;
            input{
                width:220px;
            }
            .el-form-item{
                &:last-child{
                    margin-top:40px;
                }
                .el-textarea{
                    margin-bottom: 15px;
                    textarea{
                        resize:none;
                        height:100%;
                    }
                }
                .el-upload-list{

                }
            }
        }
    }
</style>