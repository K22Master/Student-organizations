// 导入二次封装的axios
import service from '../utils/service'
// admin登录
export function loginAd(name, pass) {
    console.log("admin登录" + name, pass);
    return service({
        url: '/api/loginAd',
        method: 'POST',
        data: {
            "username": name,
            "pwd": pass
        }
    });
}
// 会长登录
export function loginPresident(name, pass) {
    return service({
        url: "api/login",
        method: "POST",
        data: {
            username: name,
            pwd: pass,
        }
    });
}   