import service from '../../utils/service'
// 获取所有学生信息
export function getAll(page, size) {
    if (!page && !size) {
        return service({
            url: '/student/getAll',
            method: 'GET'
        });
    } else {
        return service({
            url: '/student/getAll',
            method: 'GET',
            params: {
                page: page,
                size: size,
            }
        });
    }
}
// 根据社团获取学生信息
export function getStudentByAss(page, size, name) {
    return service({
        url: '/student/getAll',
        method: 'GET',
        params: {
            name: name,
            page: page,
            size: size,
        }
    });
}
// 增加学生数据或者修改学生数据
export function addOrUpdateStudent(data) {
    if (!data.id) {
        return service({
            url: '/student/add',
            method: 'POST',
            data: {
                name: data.uname,
                sex: data.sex,
                department: data.department,
                phone: data.phone,
                aname: data.aname,
            }
        });
    } else {
        return service({
            url: '/student/update',
            method: 'PUT',
            data: {
                id: data.id,
                name: data.uname,
                sex: data.sex,
                department: data.department,
                phone: data.phone,
                aname: data.aname,
            }
        })
    }
}
// 根据id删除信息
export function deleteById(id) {
    return service({
        url: '/student/remove',
        method: 'DELETE',
        data: {
            id: id
        }
    });
}