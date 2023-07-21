<template>
  <el-menu :default-openeds="['2']" style="min-height: 100%; overflow-x: hidden"
           background-color="rgb(48, 65, 86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router="router"
  >
    <div style="height: 60px; line-height: 60px;position: relative;left: 25px">
      <img src="../assets/logo.png" alt="" style="width: 30px;height: 30px; position: relative; top: 10px; right: 5px">
      <b style="color: white;font-size:15px" v-show="logoTextShow">质保书后台管理系统</b> <!-- v-show控制显示与隐藏 -->
    </div>
    <el-menu-item index="/home">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">主页</span>
      </template>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item index="/user">
        <i class="el-icon-s-custom"></i>
        <span slot="title">客户信息</span>
      </el-menu-item>
      <el-menu-item index="/cstmOperator">
        <i class="el-icon-s-platform"></i>
        <span slot="title">客户网上服务</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
    export default {
        name: "Aside",
        data() {
            return {
                isCollapse: false
            }
        },
        computed: {
            logoTextShow () {
                return this.$store.state.logoTextShow;　　//需要监听的数据
            }
        }
    }
</script>