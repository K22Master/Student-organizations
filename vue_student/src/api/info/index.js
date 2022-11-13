// 导入二次封装的axios
import service from '../../utils/service'
export function UpdateAdmin(data) {
    console.log("amdin修改触发");
    return service({
        url: 'api/updateAd',
        method: 'put',
        data: {
            username: data.name,
            pwd: data.pass,
        }
    });
}