// 二次封装axios
// 导入axios
import axios from "axios";
// 获取token
import { getToken, removeToken } from "./setToken";
import { Promise } from "core-js";
import { Message } from "element-ui";
// 设置axios
const service = axios.create({
    // baseURL会自动加到请求地址上
    baseURL: '/sys',
    // 响应事件超过5秒，就停止
    timeout: 8000,
});
// 请求拦截器
service.interceptors.request.use((config) => {
    // 配置响应头，给服务器发送token值，进行身份鉴定
    config.headers['Authorization'] = getToken('token');
    config.headers['Content-Type'] = ['application/json']
    return config;
}, (error) => {
    // 有错误则打印报错
    return Promise.reject(error);
});
// 响应拦截器
service.interceptors.response.use((response) => {
    // 将状态码和信息解构出来
    let { status, msg } = response.data;
    if (status == 105) {
        Message({
            message: msg,
            type: 'warning'
        });
        removeToken("name");
        removeToken("aname");
        removeToken("type");
        removeToken("id");
        removeToken("token");
        return window.location.href = '/login';
    }
    // 响应的返回码不等于200就是报错
    if (status !== 200) {
        Message({
            message: msg || 'error',
            type: 'warning'
        });
    }
    console.log(response);
    // 返回结果值
    return response.data;
});
export default service;