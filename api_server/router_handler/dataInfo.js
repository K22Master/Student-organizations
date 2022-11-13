const { getDataInfo } = require('../db/dataInfo');
exports.salonApproval = (req, res) => {
    const sql = "select isno ,count(isno) as 'value' from salon GROUP BY isno";
    getDataInfo(sql, res);
}
exports.salonCount = (req, res)=>{
    const sql = "select aname as 'name' ,count(aname) as 'value' from salon GROUP BY aname";
    getDataInfo(sql, res);
}
exports.getSalonCount= (req, res) => {
    const data=req.query;
    const sql = "select isno as 'name' ,count(isno) as 'value' from salon where aname='"+data.aname+"' GROUP BY isno";
    getDataInfo(sql, res);
}
exports.capitalApproval = (req, res) => {
    const sql ="select isno ,count(isno) as 'value' from capital GROUP BY isno"
    getDataInfo(sql, res);
};