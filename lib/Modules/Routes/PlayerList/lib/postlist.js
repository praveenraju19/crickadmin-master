const executeSql = require("../../../../Mssql/mssqlConnect.js").executeSql
const Debug = require('debug')('postplayerlist')
const moment=require('moment')
var Validator = require('jsonschema').Validator;
var schema = {
    "type": "object",
    "properties": {
      "TeamId":{"type":Number},
       
            "playerName": { "type": "string" },
			// "playerImage":{ "type": "string" },
            "battingStyle": { "type": "string" },
            "bowlingStyle":{ "type": "string" },
            "role": { "type": "string" },
            "nationalty":{ "type": "string" },
            "dob":{ "type": "string" },
            "debutYear": { "type": "string" },
         
    },
}




async function postList(req, res) {
    var resonseObj = {
        success: false,
        error: true,
        data: {}
    }
    try {
        console.log("request",req.body)
        console.log("schma",schema)
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
    console.log("----------------------")
    
    var dt=new Date()
    var date=new Date(dt).toISOString()
    
    var inputdate=new Date(payload['dob'])
    
 
    QueryString = `INSERT INTO PlayerList (PlayerName,BattingStyle,BowlingStyle,Role,Nationalty, Dob,DebutYear, CreatedBy,CreatedDate,ModifiedBy,ModifiedDate,TeamId) VALUES ('${payload['playerName']}',  '${payload['battingStyle']}',
    '${payload['bowlingStyle']}',
    '${payload['role']}',
    '${payload['nationalty']}',
    '${inputdate.toJSON().slice(0, 19).replace('T', ' ')}',
    '${payload['debutYear']}',
    'Admin',
   '${date}',
    'Admin',
    '${date}',
    '${payload['teamId']}');SELECT SCOPE_IDENTITY() AS id;`
   
console.log("query",QueryString)
    const send_data =
        await executeSql(QueryString);

    console.log(send_data)
    return send_data.recordset[0].id
}






module.exports = postList;