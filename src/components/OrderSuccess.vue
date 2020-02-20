<template>
  <div class="orderSuccess">
    <Head></Head>
    <div class='lwq-img'>
      <img src="/static/img/ok-2.png" alt="">
      <div class='lwq-di'>
        <span>订单ID{{orderId}}</span>
        <span>订单价格{{orderTotal}}</span>
      </div>
      <div class='lwq-ding'>
        <p><router-link to='/'>Goods List</router-link></p>
        <p><router-link to='/cart'>Cart List</router-link></p>
    </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import Head from '@/components/Head-t'
export default {
  name: 'orderSuccess',
  components: {
    Head
  },
  data() { 
    return {
      orderId:'',
      orderTotal:0
    }
  },
  methods: {

  },
  mounted() {
    var orderId=this.$route.query.orderId;
    if(!orderId){
      return;
    }
    axios.get('/users/orderDetail',{params:{orderId:orderId}}).then((response)=>{
      console.log(response);
      let res=response.data;
      if(res.status=='0'){
        this.orderId=orderId;
        this.orderTotal=res.result.orderTotal;
      } 
    })
  },
 }
</script>

<style scoped>
img{
  width:200px;
  height:250px;
}
.lwq-img{
  text-align: center;
}
.lwq-di>span{
  margin:0 50px 0 50px;
}
.lwq-ding>p{
  margin-top: 50px;
  float: left;
  margin-left: 50px;
  text-align: center;
}
</style>