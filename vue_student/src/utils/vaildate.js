// 用户名验证规则
export function nameRule(rule, value, callback) {
    // 定义正则表达式：用户名
    let reg = /(^[a-zA-Z0-9]{5,8}$)/;
    if (value === "") {
        callback(new Error("请输入用户名！"));
    } else if (!reg.test(value)) {
        callback(new Error("请输入5-8位用户名"));
    } else {
        callback();
    }
}
// 密码验证规则
export function passRule(rule, value, callback) {
    // 定义正则表达式：密码
    let reg = /(^[a-zA-Z0-9]{6,12}$)/;
    if (value === "") {
        callback(new Error("请输入密码"));
    } else if (!reg.test(value)) {
        callback(new Error("请输入6-12位密码"));
    } else {
        callback();
    }
}
