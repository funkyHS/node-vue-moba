import axios from 'axios'
import Vue from 'vue'
import router from './router'


const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})



// 请求拦截 ==> 往请求头里面添加 token
http.interceptors.request.use(function (config) {
    
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;

  }, function (error) {
    
    return Promise.reject(error);
  });
 


// 响应拦截
http.interceptors.response.use(res => {

    return res;

}, err => { // 通用的错误处理方案

    // err.response.data 服务端返回的信息
    // console.log(err.response.data);

    if(err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
    }

    if(err.response.status == 401) {
        router.push('/login')
    }

    return Promise.reject(err);

})

export default http