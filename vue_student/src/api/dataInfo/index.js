// 导入二次封装的axios
import service from '../../utils/service'
// 各社团活动的审批情况
export function salonShow() {
    console.log("salonShow调用");
    return service({
        url: "/data/salonApproval",
        method: "get",
    });
}
// 各社团的活动数量
export function salonCount() {
    console.log("salonCount调用");
    return service({
        url: "/data/salonCount",
        method: "get",
    });
}
// 查看某个社团的活动详情
export function getSalonByAss(aname) {
    console.log("getSalonByAss");
    return service({
        url: "/data/getSalonCount",
        method: "get",
        params: {
            aname,
        }
    })
}
// 资金审批情况
export function capitalShow() {
    console.log("capitalShow调用");
    return service({
        url: "/data/capitalApproval",
        method: "get",
    });
}