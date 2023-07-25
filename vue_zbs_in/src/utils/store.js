import Vue from 'vue'
//用来管理组件之间通信的一个插件,注意：vuex4版本只能在vue3中使用，vue2中要用vuex3版本,
// 若版本号不对应的话，会提示$store is undefined
import Vuex from 'vuex'

Vue.use(Vuex); //将Vuex插件加载到Vue中

const store = new Vuex.Store({
    //存放组件之间共享的数据
    state: {
        currentPathName: '',
        sideWidth: 200,
        logoTextShow: true
    },
    //显式的更改state里的数据
    mutations: {
        setPath(state) {
            state.currentPathName = localStorage.getItem("currentPathName")
        },
        unfold(state) {  //收缩状态
            state.sideWidth = 50
            state.logoTextShow = false
        },
        fold(state) {   //展开状态
            state.sideWidth = 200
            state.logoTextShow = true
        }
    }
})

export default store