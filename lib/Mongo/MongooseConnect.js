const mongooseConnect = require('debug')('MongooseConnect');
async function mongooseconnect() {
    const mongoose = require('mongoose');
    var url = require('../../Config/config.js').config.mongo.connectionstring;
    console.log(url);

    await mongoose.connect(url)
        .then(() => {
            // console.log('mongodb connected');
            mongooseConnect('mongodb connected');
        })
        .catch((err) => {
            console.error(err);
            mongooseConnect(err);
        });
}
module.exports.mongooseconnect = mongooseconnect;