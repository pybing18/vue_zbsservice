//引入vue
import Vue from 'vue'
//引入vue-router(路由模块的本质,就是建立起url和页面之间的映射关系)
//router就会去routes中去查找route，就是说路由器会去路由集合中找对应的路由
import VueRouter from 'vue-router'
import Manage from '../views/Manage.vue'
import User from '../views/User.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import CstmOperator from '../views/CstmOperator.vue'
import store from '../utils/store'

//第三方库需要use一下才能用
Vue.use(VueRouter)

//定义routes路由的集合，数组类型
const routes = [
    //单个路由均为对象类型，path代表的是路径，component代表组件
    {
    path: '/',
    component: Manage,
      redirect: '/home',
      children: [
          { path: 'home', name: '首页', component: Home},
          { path: 'user', name: '客户信息', component: User},
          { path: 'cstmOperator', name: '客户网上服务', component: CstmOperator}
      ]
  },
    {
       path: '/login',
       name: '登录',
       component: Login
    }
]

//实例化VueRouter并将routes添加进去
const router = new VueRouter({
    //ES6简写，等于routes：routes
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称，为了在Header组件中去使用
    store.commit("setPath")  // 触发store的数据更新
    next()  // 放行路由
})

//抛出这个实例对象方便外部读取以及访问
export default router
