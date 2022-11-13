// 导入二次封装的axios
import service from '../../utils/service'
// 获取所有社团信息
export function getAllAssociations(page, size) {
    console.log(page, size);
    if (page == null && size == null) {
        console.log("查询全部调用");
        return service({
            url: 'association/getAll',
            method: 'GET',
        });
    } else {
        console.log("分页查询调用");
        return service({
            url: 'association/getAll',
            method: 'GET',
            params: {
                page,
                size,
            }
        });
    }

}
// 删除接口，传入id，根据id删除
export function deleteAssociationById(id) {
    console.log(id);
    return service({
        url: 'association/remove',
        method: 'DELETE',
        data: {
            id,
        }
    });
}
// 增加或者修改社团信息
export function addAndUpdateAssociation(data) {
    if (data.id) {
        console.log(data.id);
        return service({
            url: 'association/update',
            method: 'PUT',
            data: {
                id: data.id,
                name: data.name,
                tag: data.tag,
            }
        });
    } else {
        console.log(data);
        return service({
            url: 'association/add',
            method: 'POST',
            data: {
                name: data.name,
                tag: data.tag,
            }
        });
    }
}