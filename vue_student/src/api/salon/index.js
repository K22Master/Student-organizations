// 导入二次封装的axios
import service from '../../utils/service'

// 获取所有的salon信息
export function getAllSalon(page, size) {
    console.log("salon---" + page, size);
    if (page == null && size == null) {
        console.log("获取所有调用");
        return service({
            url: 'salon/getAll',
            method: 'GET',
        });
    } else {
        console.log("分页查询");
        return service({
            url: 'salon/getAll',
            method: 'GET',
            params: {
                page: page,
                size: size,
            }
        });
    }
}
// 通过时间或者社团获取信息
export function getSalonByTimeOrAssociation(page, size, time, name) {
    console.log(page, size, time, name);
    return service({
        url: 'salon/getAll',
        method: 'GET',
        params: {
            page,
            size,
            name,
            times: time,
        }
    });
}
// 活动审批
export function SalonIsNo(data) {
    console.log(data);
    return service({
        url: 'salon/isno',
        method: 'PUT',
        data: {
            id: data.id,
            isno: data.isno,
        }
    });
}
// 活动的新增与修改
export function addAndUpdateSalon(data) {
    console.log(data);
    if (data.id) {
        return service({
            url: 'salon/update',
            method: 'PUT',
            data,
        });
    } else {
        console.log(data);
        return service({
            url: 'salon/add',
            method: 'POST',
            data,
        });
    }
}