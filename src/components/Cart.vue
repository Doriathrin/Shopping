<template>
  <div class="cart">
    <Head></Head>
    <table>
      <tr v-for='(item,key) of cartList' @key='key'> 
        <td><el-checkbox class="checkbox"></el-checkbox></td>
        <td><img v-lazy="'/static/img/'+item.productImage" :alt="item.productName"></td>
        <td>{{item.productName}}</td>
        <td>￥{{item.salePrice}}</td>
        <td>
          <el-button type="primary">-</el-button>
            {{item.productNum}}
          <el-button type="primary">+</el-button>
        </td>
        <td>{{item.salePrice*item.productNum}}</td>
        <td><i class="el-icon-delete"></i></td>
      </tr>
    </table>
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
    }
  },
  methods: {
    init(){
      axios.get('/users/cartList').then((response)=>{
        let res=response.data;
        this.cartList=res.result;

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