<template>
  <div class="index">
        <Head></Head>
        <div class='lwq-quan'>
          <div class='lwq-bjing'></div>
          <div class='lwq-sheng'>
            <ul class='lwq-to'>
              <li>Sort by:</li>
              <li><span @click='defa'>Default</span></li>
              <li><span class='lwq-price'>Price</span></li>
              <li><span class='lwq-fuhao'>↑</span></li>
            </ul>
          </div>
          <section>
            <nav>
              <ul>
                <li>PRICE:</li>
                <li>All</li>
                <li v-for='(item,key) in pai' @click="setPriceFilter(key)">
                  {{item.a}}-{{item.b}}
                </li>
              </ul>
            </nav>
            <div class='lwq-yo'>
              <!-- 这是内容 -->
                <ul class='lwq-ul'>
                  <li class='lwq-dan' v-for='(item,key) in list'>
                    <div><img v-lazy="'/static/img/'+item.productImage" alt=""></div>
                    <div>{{item.productName}}</div>
                    <div>￥{{item.salePrice}}</div>
                    <div><p class='lwq-jia' @click="addCart(item.productId)">加入购物车</p></div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" class='loadMore' infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                  <img src="/static/lazy/loading-spinning-bubbles.svg" alt="" v-show='loading'>
                </div>              
            </div>
          </section>

        </div>
  </div>
</template>

<script>
import Head from '@/components/Head-t'
import Footer from '@/components/Footer-f'
import axios from 'axios'
export default {
  name: 'Head-t',
  components:{Head,Footer},
  data () {
    return {
      dropDown: false,
      up: false,
      pai: [{ a: '0.00', b: '100.00' }, { a: '100.00', b: '500.00' }, { a: '500.00', b: '1000.00' }, { a: '1000.00', b: '2000.00' }],
      list: [],
      add: [],
      sortFlag: true,
      page: 1,
      pageSize: 8,
      busy: true,
      priceChecked:'pai',
      loading:false
      
    }
  },
  mounted () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList (flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag?1:-1,
        priceLevel:this.priceChecked
      }
      console.log(this.sortFlag?1:-1);
      this.loading=true;
      axios.get('/goods', {params: param}).then((response) => {
        let res=response.data
        this.loading=false;
        if(res.status=='0'){
          console.log(res);
          if(flag){
            this.list =this.list.concat(res.result.list); 
            if(res.result.count==0){
              this.busy=true;
            }else{
              this.busy=false;
            }
          }else{
            this.list =res.result.list; 
            this.busy=false;
          }
        }else{
          this.list=[];
        }
      })
    },
    // 这是价格的升序和降序 
    defa () {
      this.sortFlag = !this.sortFlag;
      // console.log(this.sortFlag = !this.sortFlag);
      this.page = 1;
      // console.log(this.page = 1);
      this.getGoodsList();
    },
    addCart(productId){
      axios.post('/goods/addCart',{productId:productId}).then((res)=>{
         if(res.status='0'){
           alert('加入成功');
           this.$store.commit('updateCartCount',1);
         }else{
           alert('msg:'+res.msg)
         }
      })
    },
    loadMore(){
       this.busy=true;
       setTimeout(() => {
        this.page++;
        this.getGoodsList(true)
      }, 1000)
    },
    setPriceFilter(key){
      this.priceChecked=key;
      this.page=1;
      this.getGoodsList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lwq-quan{
  background: #f5f7fc;
}
.lwq-bjing{
  width:1517px;
  height:120px;
  /* border:1px solid red; */
  background: #f5f7fc;
}
.lwq-sheng{
  width:1497px;
  height:110px;
  /* border:1px solid red; */
  margin-left: 20px;
  background: white;
}
.lwq-to{
  margin-top: 45px; 
  float: right;
}
.lwq-to>li{
  margin-left: 20px;
}
.lwq-fuhao{
  margin-left:-13px;
}
.lwq-price{
  margin-left: 20px;

}
.lwq-sheng>ul>li{
  float: left;
}
section {
  width: 1520px;
  display: flex;
  margin-top: 60px;
}
.lwq-yo {
  width: 1205px;
  /* border: 1px solid red; */
}
.lwq-yo > ul {
  float: left;
}
.lwq-yo>ul::after{
  clear:both;
  content:'';
  height:0;
  display: block;
  visibility: hidden;
}
.lwq-jia {
  width: 256px;
  height: 48px;
  border: 1px solid red;
  text-align: center;
  line-height: 48px;
  color:#d1434a;
}
img {
  width: 184px;
  height: 217px;
}
nav {
  width: 315px;
  height: 732px;
  /* border: 1px solid red; */
  float: left;
}
nav>ul{
  margin-left: 60px;
}
nav>ul>li{
  width:146px;
  height:30px;
  /* border:1px solid red; */
  line-height: 30px;
  margin-top: 24px;
  
}
nav>ul>li:hover{
  border-left:4px solid #ec6b01;
  padding-left: 5px;
}
.lwq-dan {
  float: left;
  width: 285px;
  height: 480px;
  border: 2px solid #ececec;
  background: white;
  margin-left: 10px;
  margin-bottom: 1.5873%;
  
}
.lwq-dan:hover{
  border:2px solid #f26100;
  box-shadow: 0px 1px 3px 2px #8888885b;
}
.lwq-ul{
  margin-left: -12px;
}
.loadMore{
  height:100px;
  line-height: 100px;
  text-align: center;
}
</style>
