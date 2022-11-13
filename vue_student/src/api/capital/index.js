// 导入二次封装的axios
import service from '../../utils/service'
export function getAllCapital(page, size) {
    if (!page && !size) {
        console.log("获取所有调用");
        return service({
            url: 'capital/getAll',
            method: 'GET',
        });
    } else {
        console.log("分页查询");
        return service({
            url: 'capital/getAll',
            method: 'GET',
            params: {
                page: page,
                size: size,
            }
        });
    }
}
// 根据时间或者社团查询
export function getCapitalByTimeOrAssociation(page, size, time, name) {
    return service({
        url: 'capital/getAll',
        method: 'GET',
        params: {
            page,
            size,
            name,
            times: time,
        }
    });
}
// 资金审批
export function CapitalIsNo(data) {
    console.log(data);
    return service({
        url: 'capital/isno',
        method: 'PUT',
        data: {
            id: data.id,
            isno: data.isno,
        }
    });
}
// 资金的增加或者修改
export function addOrUpdate(data) {
    if (!data.id) {
        return service({
            url: 'capital/add',
            method: 'POST',
            data: {
                name: data.aname,
                cnum: data.cnum,
                ctag: data.ctag,
                time: data.time,
                money: data.money,
            }
        });
    } else {
        return service({
            url: 'capital/update',
            method: 'PUT',
            data: {
                id: data.id,
                name: data.aname,
                cnum: data.cnum,
                ctag: data.ctag,
                time: data.time,
                money: data.money,
            }
        });
    }
}