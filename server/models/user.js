var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchame = new Schema({
  "userId": String,
  "userName": String,
  "userPwd": String,
  "orderList": Array,
  "cartList": [
    {
      "productId": String,
      "productName": String,
      "salePrice": String,
      "productImage": String,
      "checked": String,
      "productNum":String
    }
  ],
  "addressList": Array
})
// 导出集合名Schema
module.exports = mongoose.model('users', userSchame)