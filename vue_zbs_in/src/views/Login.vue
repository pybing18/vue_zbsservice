<template>
    <div class="wrapper">
        <div style="margin: 200px auto; background-color: #ffffff; width: 330px; height: 300px; padding: 20px; border-radius: 10px">
            <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>用户平台登录</b></div>
            <!-- 注意：el-form必须写 :model 否则无法使用表单校验功能 -->
            <!--因为element-ui button没有抛出keydown效果,所以在el-form添加@keydown.enter.native这个效果-->
            <el-form :model="operator" :rules="rules" ref="operatorForm" @keydown.enter.native="login">
                <!-- <el-form-item> 不能少 -->
                <el-form-item prop="loginCode">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="operator.loginCode" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="operator.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item style="margin: 10px 0; text-align: right">
                    <el-button type="primary" size="medium"  autocomplete="off" @click="login">登录</el-button>
                    <!--<el-button type="warning" size="small"  autocomplete="off">注册</el-button>-->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                operator: {},
                rules: {
                    loginCode: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                        //{ min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                        //{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            login() {
                this.$refs["operatorForm"].validate((valid) => {
                    if (valid) {  // 表单校验合法
                        this.$request.post("/operator/loginIn", this.operator).then(res => {
                            if(res.code === 200) {
                                localStorage.setItem("operator", JSON.stringify(res.data))  // 存储用户信息到浏览器
                                this.$router.push("/")
                                this.$message.success(res.msg)
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        height: 100vh;
        -moz-background-size: 100% 100%;
        background-size: 100% 100%;
        /*background-image: linear-gradient(to bottom right, #FC466B, #3F5EFB); 渐变色*/
        background-image: url("../assets/login.jpg");
        overflow: hidden;
    }
</style>