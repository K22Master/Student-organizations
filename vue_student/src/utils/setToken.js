// 存储token到localStorage
export function setToken(tonkenKey, token) {
    return localStorage.setItem(tonkenKey, token);
};
// 从localStorage获取token
export function getToken(tonkenKey) {
    return localStorage.getItem(tonkenKey);
};
// 从localStorage删除token
export function removeToken(tonkenKey) {
    return localStorage.removeItem(tonkenKey);
};