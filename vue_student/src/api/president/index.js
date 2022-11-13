import service from '../../utils/service'
// 获取所有的信息
export function getAll(page, size) {
    if (!page && !size) {
        return service({
            url: '/api/getAll',
            method: 'GET'
        });
    } else {
        return service({
            url: '/api/getAll',
            method: 'GET',
            params: {
                page: page,
                size: size,
            }
        });
    }
}
// 根据社团名称获取信息
export function getAllByname(page, size, name) {
    return service({
        url: '/api/getAll',
        method: 'GET',
        params: {
            name: name,
            page: page,
            size: size,
        }
    });
}
// 会长信息增加或者修改
export function addOrUpdate(data) {
    if (!data.type) {
        return service({
            url: 'api/reguser',
            method: 'POST',
            data: data
        });
    } else {
        return service({
            url: 'api/update',
            method: 'PUT',
            data: {
                id: data.id,
                name: data.pname,
                pwd: data.pwd,
                pdepartment: data.pdepartment,
                phone: data.phone,
                aname: data.aname,
                aid: data.aid,
            }
        });
    }
}
// 根据id重置会长密码
export function updatePwd(data) {
    return service({
        url: 'api/updatePwd',
        method: 'PUT',
        data: data
    });
}
// 根据id删除会长
export function deleteInfo(id) {
    return service({
        url: 'api/delete',
        method: 'DELETE',
        data: {
            id,
        }
    });
}