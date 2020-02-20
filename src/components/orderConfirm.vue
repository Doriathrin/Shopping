<template>
  <div class="orderConfirm">
    <Head></Head>
    <table>
      <tr v-for='(item,key) of cartList' @key='key' v-if="item.checked=='1'">
        <td>
           {{item.productName}}
        </td>
        <td>
          <img :src="'/static/img/'+item.productImage" alt="">
        </td>
        <td>￥{{item.salePrice}}</td>
        <td>${{item.salePrice*item.productNum}}</td>
      </tr>
      <tr>
        <td>总价：{{subTotal}}</td>
        <td>运费：{{shipping}}</td>
        <td>折扣：{{discount}}</td>
        <td>税款：{{tax}}</td>
        <td>最终价格为:{{orderTotal}}</td>
      </tr>
      <tr>
        <td><router-link to='/address'>上一页</router-link></td>
        <td @click='payMent'>支付</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Head from '@/components/Head-t'
export default {
  name: 'orderConfirm',
  components: {
    Head
  },
  data() { 
    return {
      cartList:[],
      orderTotal:0,
      subTotal:0,
      tax:400,
      shipping:100,
      discount:200,
    }
  },
  methods: {
    init(){
      axios.get('/users/cartList').then((response)=>{
        console.log(response);
        let res=response.data;
        this.cartList=res.result;  
        this.cartList.forEach((item)=>{
          if(item.checked=='1'){
            this.subTotal+=item.salePrice*item.productNum; 
          }
        });
        this.orderTotal=this.subTotal+this.shipping-this.discount+this.tax;
      });
    },
    payMent(){
      var addressId=this.$route.query.addressId;
      axios.post('/users/payMent',{addressId:addressId,orderTotal:this.orderTotal}).then((response)=>{
        let res=response.data;
        if(res.status=='0'){
          this.$router.push({path:'/orderSuccess?orderId='+res.result.orderId})
        }
      })
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
</style>