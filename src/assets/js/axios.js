// import axios from 'axios'
import router from '../../router/index'

import { Message, Loading } from 'element-ui'
axios.interceptors.request.use(function(config) {
    let token = localStorage.getItem('token')
        // 在发送请求之前做些什么
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.token = token //请求头加上token
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
axios.defaults.baseURL = 'http://47.93.117.110:3000/';
axios.interceptors.response.use(
    response => {
        //拦截响应，做统一处理 
        if (response.data.code) {
            switch (response.data.code) {
                case 501:
                    Message({
                        message: '登录过期，请重新登录',
                        type: 'error',
                        duration: 3 * 1000
                    })
                    localStorage.removeItem('user')
                    localStorage.removeItem('token')
                    router.replace({
                        path: '/myHome',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    })
            }
        }
        return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(error.response.status) // 返回接口返回的错误信息
    })
export default function http(opt) {

    let config = {
        method: opt.type || 'post',
        url: opt.url,
        data: opt.data || {},
        headers: opt.headers || {}
    }

    return new Promise((resolve, reject) => {
        axios(config).then(data => {
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}