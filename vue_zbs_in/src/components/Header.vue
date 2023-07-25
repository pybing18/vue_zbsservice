<template>
 <div style="line-height: 60px; display: flex">
   <div style="flex: 1">
     <!--收缩菜单栏图标 cursor: pointer将光标变成手形 -->
     <span :class="collapseBtnClass" style="cursor: pointer;font-size: 18px" @click="collapse"></span>
     <!--显示当前所选菜单栏项目 -->
     <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
       <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
       <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
     </el-breadcrumb>
   </div>
   <el-dropdown style="width: 70px; cursor: pointer">
       <div style="display: inline-block">
           <span>{{ operator.empname }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
       </div>
     <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
<!--       <el-dropdown-item style="font-size: 14px; padding: 5px 0">个人信息</el-dropdown-item>-->
       <el-dropdown-item style="font-size: 14px; padding: 5px 0">
           <span style="text-decoration: none" @click="logout">退出</span>
       </el-dropdown-item>
     </el-dropdown-menu>
   </el-dropdown>
 </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                operator: localStorage.getItem("operator") ? JSON.parse(localStorage.getItem("operator")) : {},
                collapseBtnClass: 'el-icon-s-fold',
                isCollapse: false
            }
        },
        methods: {
            logout() {
                this.$router.push("/login")
                localStorage.removeItem("operator")
                this.$message.success("退出成功")
            },
            collapse() {  // 点击收缩按钮触发
                this.isCollapse = !this.isCollapse
                if (this.isCollapse) {  // 收缩
                    this.collapseBtnClass = 'el-icon-s-unfold'
                    this.$store.commit("unfold")
                } else {   // 展开
                    this.collapseBtnClass = 'el-icon-s-fold'
                    this.$store.commit("fold")
                }
            }
        },
        //面包屑动态展示当前路径
        computed: {
            currentPathName () {
                return this.$store.state.currentPathName;　　//需要监听的数据
            }
        }
    }
</script>