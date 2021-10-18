const executeSql = require("../../../../Mssql/mssqlConnect.js").executeSql
const Debug = require('debug')('PlayerListId')

async function getByPlayerId(req, res) {
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

    var responseBodey =  await getRecord(req.params['id']);
console.log("date",responseBodey)
    if (responseBodey.length > 0) {
        resonseObj.data = responseBodey;
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


async function getRecord(id) {
    QueryString = `select * from [dbo].[PlayerList] where TeamId=${id}`

    const send_data =
        await executeSql(QueryString);
        console.log("queryyyyyyyyyy",send_data)

    return send_data.recordset
}

module.exports = getByPlayerId