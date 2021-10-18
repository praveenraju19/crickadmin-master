const executeSql = require("../../../../Mssql/mssqlConnect.js").executeSql
const Debug = require('debug')('updateteams')
var Validator = require('jsonschema').Validator;
var schema = {
    "type": "object",
    "properties": {
        "TeamName":{ "type": "string" },
		// "TeamImage":{ "type": "string" },
		"TeamHomeGround":{ "type": "string" },
		"Title":{ "type": "number" },
		"Owner":{ "type": "string" },
		"Coach":{ "type": "string" },
		"Captain":{ "type": "string" }
    },
    "required": ["TeamName",  "TeamHomeGround", "Title","Owner","Coach","Captain"]
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

        const send_data = await executeSql('select * from dbo.Teams where TeamId = ' + req.params['id']);
        console.log('select * from dbo.Teams where TeamId = ' + req.body['Id'])
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
    QueryString = `UPDATE Teams SET 
    TeamName= '${payload['TeamName']}',
    TeamHomeGround= '${payload['TeamHomeGround']}',Title='${payload['Title']}',
    Owner='${payload['Owner']}',
    Coach='${payload['Coach']}',
    Captain='${payload['Captain']}',
    CreatedBy='Admin',
    ModifiedBy='Admin',
    ModifiedDate='${date}' where TeamId='${id}' ;`
    console.log(QueryString)
    const send_data =
        await executeSql(QueryString);

    console.log(send_data)
    return send_data.recordset
}

module.exports = putTeams;