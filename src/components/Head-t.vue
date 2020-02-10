<template>
  <div class="head-t">
    <header>
      <div class='lwq-biao'>
        <ul class='lwq-to'>
          <li><img src="/static/img/logo1.png" alt=""></li>
          <li class='lwq-to-yo'>
            <el-button type="text" @click="dialogFormVisible = true" >Login</el-button>
            <span  @click="logOut">登出</span>
            <el-dialog title="Login in" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                  <el-input v-model="form.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input v-model="form.userPwd" autocomplete="off" @keyup.enter="login"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="login" >确 定</el-button>
              </div>
            </el-dialog>
          </li>
          <li><img src="/static/img/goodsList_spec_03.png" alt="" class='lwq-gwctu'></li>
        </ul>
      </div>
      <div class='lwq-ye'>
        <ul>
          <li>Home</li>
          <li>/</li>
          <li>Goods</li>
        </ul> 
      </div>
    </header>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'head-t',
  data() { 
    return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        nickName:false,
        form: {
          userName: '',
          userPwd: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        formLabelWidth: '120px',
        loginModalFlag:false
      };
  },
  methods: {
      login(){
        if(this.form.userName==''||this.form.userPwd==''){
           return false;
        }
        console.log(this.form.userName);
        console.log(this.form.userPwd);
        axios.post('/users/login',{userName:this.form.userName,userPwd:this.form.userPwd}).then((response)=>{
          console.log(response);
          let res=response.data;
          if(res.status='0'){
            this.errorTip=false,
            this.dialogFormVisible=false
            this.nickName=res.result.userName;
            this.form.userName='';
            this.form.userPwd='';
          }else{ 
            this.errorTip=true; 
          } 
        })
      },
      logOut(){
        axios.post('/users/logout').then((response)=>{
          let res=response.data;
          if(res.status='0'){
            this.form.userName='';
            this.form.userPwd='';
          }
        })
      }
  },
  mounted() {

  },
 }
</script>

<style scoped>
ul>li{
  float: left;
  margin-top: 25px;
}
header {
  width:1517px;
  height:231px;
  /* border: 1px solid red; */
  
  /* 这是头部 */
}
.lwq-biao{
  width:1517px;
  height:140px;
  /* border:1px solid red; */
}
.lwq-to{
  margin-top: 5px;
}
.lwq-gwctu{
  width:25px;
  height:22px;
  margin-top: 32px;
}
.lwq-to-yo{
  margin-left: 1200px;
  margin-top: 57.5px;
}
.lwq-ye{
  width:1517px;
  height:90px;
  /* border:1px solid red; */
  background: #f0f0f0;
  font-size: 14px;
}
.lwq-ye>ul{
  margin-left: 15px;
  
}
.lwq-ye>ul>li{
  margin-left: 5px;
  margin-top: 32.5px;
}
.lwq-ye>ul>li:nth-child(1){
  color:#a1a1a1;
}
.lwq-ye>ul>li:nth-child(3){
  color:#d1434a;
}

</style>