const executeSql = require("../../../../Mssql/mssqlConnect.js").executeSql
const Debug = require('debug')('deleteMethod')


async function deleteList(req, res) {
    console.log("---------------------")
    var resonseObj = {
        success: false,
        error: true,
        data: {}
    }
    if (!req.params['id']) {
        res.status(400)
        resonseObj.error = 'Id is mandatory';
        res.send(resonseObj)
        return
    }

    var responseBodey = await deleteRecord(req.params['id']);
    if (responseBodey > 0) {
        resonseObj.data = {};
        resonseObj.error = false;
        resonseObj.success = true;
        res.json(resonseObj);
    } else {
        resonseObj.data = {};
        resonseObj.error = "does not exists";
        resonseObj.success = false;
        res.json(resonseObj);
    }

}


async function deleteRecord(id) {
    QueryString = `delete from [dbo].[PlayerList] where PlayerId=${id};`

    const send_data =
        await executeSql(QueryString);

    return send_data.rowsAffected[0]
}

module.exports = deleteList