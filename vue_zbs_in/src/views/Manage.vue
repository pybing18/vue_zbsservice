<template>
  <el-container style="min-height: 100vh">
    <!-- 左边菜单栏 -->
    <el-aside :width="sideWidth + 'px'">
      <Aside/>
    </el-aside>

    <el-container>
      <!-- 右边顶部 -->
      <el-header style="border-bottom: 1px solid #ccc;">
        <Header/>
      </el-header>
      <!-- 右边主体 -->
      <el-main>
        <!--表示当前页面的子路由会在 <router-view /> 里面展示-->
        <router-view />
      </el-main>

    </el-container>
  </el-container>
</template>

<script>

    import Aside from "@/components/Aside";
    import Header from "@/components/Header";

    export default {
        name: 'Manage',
        components: {
            Aside,
            Header
        },
        computed: {
            sideWidth () {
                return this.$store.state.sideWidth;　　//需要监听的数据
            }
        }
    }
</script>