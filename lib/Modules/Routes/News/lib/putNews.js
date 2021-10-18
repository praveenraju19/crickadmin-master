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




async function putNews(req, res) {
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

        const send_data = await executeSql('select * from dbo.News where id = ' + req.params['id']);
        console.log('select * from dbo.News where id = ' + req.body['Id'])
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
    QueryString = `UPDATE News SET  Title='${payload['Title']}',Description='${payload['Description']}',ImageSet='${payload['ImageSet']}',Reference='${payload['Reference']}' where id='${id}' ;`
    console.log(QueryString)
    const send_data =
        await executeSql(QueryString);

    console.log(send_data)
    return send_data.recordset
}






module.exports = putNews;