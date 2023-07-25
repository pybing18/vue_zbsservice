import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入element-ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入自定义css文件
import './assets/gloable.css'
//导入封装的request.js文件
import request from "@/utils/request"
//导入封装的store.js文件
import store from "@/utils/store"

Vue.config.productionTip = false  //设置为 false以阻止 vue 在启动时生成生产提示

Vue.use(ElementUI, { size: "small" });

Vue.prototype.$request = request //通过在vue原型上全局定义，使其在每个vue的实例中都可用；
// $ 是在 Vue 所有实例中都可用的属性的一个简单约定。这样做会避免和已被定义的数据、方法、计算属性产生冲突。

//在此处进行配置全局的路由守卫(全局前置钩子)
//目的是：判断当前用户中本地存储是否有token,使用户在登录之前，之前访问到/login页面，其他的页面是访问不到的
router.beforeEach((to, from, next)=>{
     // to 即将进入的路由
    //from 在哪个路由进入的
    //next 放行
    let token = localStorage.getItem("operator");//在本地存储中获取token
    if(token){
      //判断是否有token
        next();
    }else{
      //在没有token的前提下，to下面的path是否为/login,如果不是则页面跳转到登录页面
        if(to.path == "/login"){
          next();
        }else{
          next({path: "/login"});//跳转到login页面
        }
    }
});

new Vue({
  router,
    store,
  render: h => h(App)
}).$mount('#app')