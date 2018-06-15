<template>
    <el-upload
        class="upload-demo"
        :action="url"
        :multiple="false"
        :on-success="imgSuccess"
        :on-remove="imgRemove"
        :auto-upload="true"
        :accept="accept"
        :file-list="fileList">
        <el-button plain size="small" type="primary" icon="el-icon-upload"
            :style="{marginLeft:'10px'}">图片上传</el-button>
    </el-upload> 
</template>
<script>
export default {
    name: 'upload',
    props:{
        url:null,
        uploadIndex:null, //接收到的自定义的参数
        onSuccess:Function,
        onRemove:Function,
        onChange:Function,
        fileList:null,
        autoUpload:Boolean,
        accept:{
            type:String,
            default:'image/jpg,image/png'
        }
    },
    methods:{
        imgRemove(){
            this.onRemove(...arguments,this.uploadIndex);
        },
        imgSuccess(){
            this.onSuccess(...arguments,this.uploadIndex);
        },
        imgChange(){
           this.onChange(...arguments,this.uploadIndex); 
        }
    }
}
</script>