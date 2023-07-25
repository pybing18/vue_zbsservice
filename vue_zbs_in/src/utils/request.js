import axios from 'axios'   //发送HTTP请求与获取响应
import ElementUI from 'element-ui'

const request = axios.create({
    baseURL: 'http://localhost:8880', //前端对后端的访问地址
    timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'; //设置字符集编码

    let operator = localStorage.getItem("operator") ? JSON.parse(localStorage.getItem("operator")) : null
    if(operator) {
        config.headers['token'] = operator.token;  // 设置请求头
    }
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 当权限验证不通过的时候给出提示
        if (res.code === 510) {
            ElementUI.Message({
                message: res.msg,
                type: 'error'
            });
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default request