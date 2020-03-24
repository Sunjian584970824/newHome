import axios from 'axios'
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

let token = localStorage.getItem('token')
axios.interceptors.request.use(
    config => {
        console.log(config)
        if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.token = token //请求头加上token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    })
axios.interceptors.response.use(
    response => {
        console.log(response)
            //拦截响应，做统一处理 
        if (response.data.code) {
            switch (response.data.code) {
                case 501:
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