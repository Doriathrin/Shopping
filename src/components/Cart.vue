<template>
  <div class="cart" >
    <Head></Head>
    <table v-for='(item,key) of cartList' @key='key'>
      <tr> 
        <td>
          <input type="checkbox" @click="editCart('checked',item)" :class='{"check":item.checked=="1"}'>
        </td>
        <td><img v-lazy="'/static/img/'+item.productImage" :alt="item.productName"></td>
        <td>{{item.productName}}</td>
        <td>￥{{item.salePrice}}</td>
        <td>
          <el-button type="primary" @click='editCart("minus",item)'>-</el-button>
            {{item.productNum}}
          <el-button type="primary" @click='editCart("add",item)'>+</el-button>
        </td>
        <td>{{item.salePrice*item.productNum}}</td>
        <td>
          <el-button type="text" @click="delCartConfirm(item.productId)" ><i class="el-icon-delete"></i></el-button>
          <el-dialog  :visible.sync="dialogFormVisible">
              <el-form>
                <p>您确认要删除商品吗</p>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false"  style='width:150px; border-radius:0px; border:1px solid red;color:red;'>取 消</el-button>
                <el-button @click='delCart' style='width:150px; border-radius:0px; border:1px solid red;color:red;'>确 认</el-button>
              </div>
          </el-dialog>
        </td>
      </tr>
    </table>
    <div class='lwq-he'>
      <p class='lwq-zongjia' @click='checkOut'>C H E C K O U T</p>
      <p>${{zong()}}.00</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Head from '@/components/Head-t'
export default {
  name: 'cart',
  components:{Head},
  data() { 
    return {
      cartList:[],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      productId:'',
    }
  },
  methods: {
    init(){
      axios.get('/users/cartList').then((response)=>{
        let res=response.data;
        this.cartList=res.result;

      })
    },
    delCartConfirm(productId){
      this.productId=productId;
      this.dialogFormVisible=true;
    },
    delCart(){
      axios.post('/users/cartDel',{productId:this.productId}).then((response)=>{
        let res=response.data;
        if(res.status='0'){
          this.dialogFormVisible=false;
          this.init(); 
        }
      })
    },
    editCart(flag,item){
      if(flag=='add'){
        item.productNum++;
      }else if(flag=='minus'){
        if(item.productNum<=1){
          return;
        }
        item.productNum--;
      }else{
        item.checked=item.checked=="1" ? "0":"1";
      }
      axios.post('/users/cartEdit',{
        productId:item.productId,
        productNum:item.productNum,
        checked:item.checked
      }).then((response)=>{
        let res=response.data;
      })
    },
    zong(){
      let num=0;
      for(var i in this.cartList){
        num+=this.cartList[i].salePrice*this.cartList[i].productNum;
      }
      return num;
    },
    checkOut(){
        this.$router.push({path:'/address'})
    }
  },
  mounted() {
    this.init();
  },
 }
</script>

<style scoped>

table{
  width:1520px;
  /* border:1px solid red; */
  border-collapse: collapse;
  text-align: center;
  border-radius: 50px;
}
td{
  width:100px;
  height:100px;
  border-bottom:1px solid red;
}
img{
  width:100px;
  height:100px;
}
.lwq-he{
  width:1520px;
  height:100px;
  border:1px solid red;
  line-height: 100px;
  float: right;
}
.lwq-he>p{
  float: right;
  margin-left: 50px;
}
.lwq-zongjia{
  margin-top: 25px;
  width:150px;
  height:50px;
  /* border:1px solid red; */
  line-height: 50px;
  text-align: center;
  background: red;
  color:white;
}
</style>