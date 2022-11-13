// 导入二次封装的axios
import service from '../../utils/service';
// 查询全部
export function getAllMaterial(page, size) {
    if (!page && !size) {
        console.log("查询所有调用");
        return service({
            url: 'material/getAll',
            method: 'get'
        });
    } else {
        console.log("分页查询调用");
        return service({
            url: 'material/getAll',
            method: 'get',
            params: {
                page: page,
                size: size
            }
        });
    }
}
// 根据社团名称查询信息
export function getMaterialByname(page, size, name) {
    return service({
        url: 'material/getAll',
        method: 'get',
        params: {
            page,
            size,
            name,
        }
    });
}
// 修改或者增加信息
export function addAndUpdateMaterial(data) {
    console.log(data);
    if (!data.id) {
        return service({
            url: 'material/add',
            method: 'post',
            data: {
                name: data.aname,
                goods: data.goods,
                num: data.num,
                mtag: data.mtag,
            }
        });
    } else {
        return service({
            url: 'material/update',
            method: 'put',
            data: {
                id: data.id,
                name: data.aname,
                goods: data.goods,
                num: data.num,
                mtag: data.mtag,
            }
        });
    }
}
// 删除物资
export function deleteMaterial(id) {
    return service({
        url: 'material/remove',
        method: 'delete',
        data: {
            id,
        }
    });
}
