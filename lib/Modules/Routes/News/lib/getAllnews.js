const executeSql = require("../../../../Mssql/mssqlConnect.js").executeSql
var sql = require("mssql")


async function getAllNews(req, res) {
    var resonseObj = {
        success: false,
        error: true,
        data: {}
    }
    try {

        const send_data = await executeSql('select * from dbo.News');
        resonseObj.data = send_data.recordset;
        resonseObj.error = ""
        resonseObj.success = true;
        res.json(resonseObj);
    } catch (err) {
        resonseObj.data = {};
        resonseObj.error = err.message;
        resonseObj.success = false;
        res.status(500)
        res.send(resonseObj)
    }


}








module.exports = getAllNews;