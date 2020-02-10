<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  /* 这是样式清空 */
  margin: 0;
  padding: 0;
  list-style: none;
  /* 格式为空 */
}
.el-checkbox__input.is-checked+.el-checkbox__label {
  color: #FF8000;
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #FF8000;
  background-color: #FF8000;
}

.el-checkbox__input{
  border-color: #FF8000;
}

.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #FF8000;
}
.el-checkbox__inner{
  border-radius: 50px;
}
.el-checkbox__inner:hover{
  border-color:#DCDFE6;
}
</style>
