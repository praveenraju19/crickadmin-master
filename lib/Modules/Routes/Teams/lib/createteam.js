const executeSql = require("../../../../Mssql/mssqlConnect.js").executeSql
const Debug = require('debug')('PostTeams')
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

async function createTeam(req,res){

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

        try {
            var responseBodey = await insert(req.body);
            req.body['Id'] = responseBodey;
            resonseObj.data = req.body;
            resonseObj.error = false;
            resonseObj.success = true;
            res.json(resonseObj);
        } catch (sqlErr) {
            resonseObj.data = {};
            resonseObj.error = 'sql Error';
            resonseObj.success = false;
            res.status(500);
            res.send(resonseObj);
        }



    } catch (err) {
        resonseObj.data = {};
        resonseObj.error = err.message;
        resonseObj.success = false;
        res.status(500);
        res.send(resonseObj);
    }


}
async function insert(payload) {
    var date=new Date().toISOString()
    QueryString = `INSERT INTO Teams (TeamName,
  
    TeamHomeGround,
    Title,
    Owner,
    Coach,
    Captain,
    CreatedBy,
    CreatedDate,
    ModifiedBy,
    ModifiedDate) VALUES ('${payload['TeamName']}', '${payload['TeamHomeGround']}','${payload['Title']}','${payload['Owner']}','${payload['Coach']}','${payload['Captain']}','Admin','${date}','Admin','${date}') ; SELECT SCOPE_IDENTITY() AS id;`

    const send_data =
        await executeSql(QueryString);

    console.log(send_data)
    return send_data.recordset[0].id
}
module.exports = createTeam;