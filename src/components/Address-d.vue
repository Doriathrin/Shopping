<template>
  <div class="address-d">
    <NavHead></NavHead>
    <ul>
      <li v-for='(item,key) of addressListFilter' @key='key' :class='{"check":checkIndex==key}' @click='checkIndex=key;selectedAddrId=item.addressId'>
        <dl >
          <dt></dt>
          <dd>
            <p>{{item.userName}}</p>
            <p>{{item.postCode}}</p>
            <p>{{item.streetName}}</p>
            <p>{{item.tel}}</p>
            <div class='lwq-dizhi'>
              <p v-if='item.isDefault'>Default address</p>
              <p v-if='!item.isDefault' @click='setDefault(item.addressId)'>set</p>
              <div>
                <el-button type="text" @click="delAddressConfirm(item.addressId)" ><i class="el-icon-delete"></i></el-button>
                <el-dialog  :visible.sync="dialogFormVisible">
                <el-form>
                  <p style='text-align:center'>您确认要删除商品吗</p>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false"  style='width:150px; border-radius:0px; border:1px solid red;color:red;'>取 消</el-button>
                  <el-button @click='delAddress' style='width:150px; border-radius:0px; border:1px solid red;color:red;'>确 认</el-button>
                </div>
                </el-dialog>
              </div>
            </div>
          </dd>
        </dl>
      </li>
    </ul>
    <div class='lwq-icon' @click='expand' >
      <a href="javascript:;" :class="{'open':limit>3}">
        <i>
          <i class='el-icon-arrow-down'></i>
          <i class='el-icon-arrow-up'></i>
        </i>
      </a>
    </div>
    <div class='lwq-ding'>
      <router-link :to="{path:'/orderConfirm',query:{'addressId':selectedAddrId}}"><p>Next</p></router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavHead from '@/components/Head-t'
export default {
  name: 'address-d',
  components: {
    NavHead
  },
  data() { 
    return {
      limit:3,
      checkIndex:0,
      addressList:[],
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      addressId:'',
      selectedAddrId:'',
    }
  },
  computed: {
    addressListFilter(){
      return this.addressList.slice(0,this.limit);
    }
  },
  methods: {
    init(){
      axios.get('/users/addressList').then((response)=>{
        console.log(response);
        let res=response.data;
        this.addressList=res.result;
      });
    },
    expand(){
      if(this.limit==3){
        this.limit=this.addressList.length;
      }else{
        this.limit=3;
      }
    }, 
    setDefault(addressId){
     axios.post('/users/setDefault',{
       addressId:addressId
     }).then((response)=>{
       let res=response.data;
       if(res.status=='0'){
         console.log('set default');
         this.init();
       }
     })
    },
    delAddressConfirm(addressId){
      this.dialogFormVisible=true;
      this.addressId=addressId;
    },
    delAddress(){
      this.dialogFormVisible=true;
      axios.post('/users/delAddress',{
        addressId:this.addressId
      }).then((response)=>{
         let res=response.data;
         if(res.status=='0'){
           console.log('del suc');
           this.dialogFormVisible=false;
           this.init();
         }
      })
    }
  },
  mounted() {
    this.init();
  },
 }
</script>

<style  scoped>
ul{
  width:1520px;
  height:300px;
}
dl{
  width: 200px;
  height:150px;
  border:1px solid red;
  float: left;
  margin-left: 10px;
}
p{
  margin-top:10px;
  font-size:15px;
}
.lwq-dizhi>p{
  float: left;
}
.lwq-icon{
  margin-left:800px;
}
.check{
  color:red;
}
.lwq-ding{
  float: right;
  margin-right: 50px;
}
.lwq-ding>a>p{
  width:150px;
  height:50px;
  /* border:1px solid red; */
  text-align: center;
  line-height: 50px;
  background: red;
  color:white;
}
</style>