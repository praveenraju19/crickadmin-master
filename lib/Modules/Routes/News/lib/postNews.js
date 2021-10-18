const executeSql = require("../../../../Mssql/mssqlConnect.js").executeSql
const Debug = require('debug')('postNews')
var Validator = require('jsonschema').Validator;
var schema = {
    "type": "object",
    "properties": {
        "Title": { "type": "string" },
        "Description": { "type": "string" },
        "ImageSet": { "type": "string" },
        "Reference": { "type": "string" }
    },
    "required": ["Title", "Description", "ImageSet", "Reference"]
}




async function postNews(req, res) {
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
    QueryString = `INSERT INTO News (Title,Description,ImageSet,Reference) VALUES ('${payload['Title']}', '${payload['Description']}', '${payload['ImageSet']}','${payload['Reference']}') ; SELECT SCOPE_IDENTITY() AS id;`

    const send_data =
        await executeSql(QueryString);

    console.log(send_data)
    return send_data.recordset[0].id
}






module.exports = postNews;