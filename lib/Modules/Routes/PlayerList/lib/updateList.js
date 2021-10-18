const executeSql = require("../../../../Mssql/mssqlConnect.js").executeSql
const Debug = require('debug')('updateteams')
var Validator = require('jsonschema').Validator;
var schema = {
    "type": "object",
    "properties": {
      "TeamId":{"type":Number},
       
            "PlayerName": { "type": "string" },
			// "playerImage":{ "type": "string" },
            "BattingStyle": { "type": "string" },
            "BowlingStyle":{ "type": "string" },
            "Role": { "type": "string" },
            "Nationalty":{ "type": "string" },
            "Dob":{ "type": "string" },
            "DebutYear": { "type": "string" },
         
    },
}


async function putTeams(req, res) {

    var resonseObj = {
        success: false,
        error: true,
        data: {}
    }
    try {
        var isValidPayload = new Validator().validate(req.body, schema).valid;

        if (!isValidPayload) {
            res.status(400)
            resonseObj.error = 'Not a valid payload';
            res.send(resonseObj)
            return
        }
        if (!req.params['id']) {
            res.status(400)
            resonseObj.error = 'Id is mandatory';
            res.send(resonseObj)
            return
        }

        const send_data = await executeSql('select * from dbo.PlayerList where PlayerId = ' + req.params['id']);
        console.log('select * from dbo.PlayerList where PlayerId = ' + req.body['Id'])
        if (send_data.recordset.length == 0) {

            resonseObj.error = "Record does not exists";
            res.send(resonseObj);
            return;
        }
        else {
            try {
                var responseBodey = await update(req.params['id'], req.body);
                req.body['Id'] = req.params['id'];
                resonseObj.data = req.body;
                resonseObj.error = false;
                resonseObj.success = true;
                res.json(resonseObj);
            } catch (sqlErr) {
                console.log(sqlErr)
                resonseObj.data = {};
                resonseObj.error = 'sql Error';
                resonseObj.success = false;
                res.status(500);
                res.send(resonseObj);
            }
        }


    } catch (err) {
        resonseObj.data = {};
        resonseObj.error = err.message;
        resonseObj.success = false;
        res.status(500);
        res.send(resonseObj);
    }


}


async function update(id, payload) {
    var date=new Date().toISOString()
    QueryString = `UPDATE PlayerList SET 
PlayerName='${payload['PlayerName']}', 
BattingStyle= '${payload['BattingStyle']}',
BowlingStyle= '${payload['BowlingStyle']}',
Role=  '${payload['Role']}',
Nationalty=  '${payload['Nationalty']}',
Dob='${payload['Dob']}',
DebutYear=  '${payload['DebutYear']}',
CreatedBy='Admin',
CreatedDate=  '${date}',
ModifiedBy=  'Admin',
ModifiedDate= '${date}',
TeamId=  '${payload['TeamId']}'

where PlayerId='${id}' ;`
    console.log(QueryString)
    const send_data =
        await executeSql(QueryString);

    console.log(send_data)
    return send_data.recordset
}

module.exports = putTeams;