/* sudo service mongod start */

var config = {
    router: {
        PORT: process.env.PORT || 3001
    },
    mongo: {
        connectionstring: "mongodb://localhost:27017/projectmanagement"
    },
    // sqlConfig: {
    //     user: 'sa',
    //     password: 'admin@123',
    //     server: 'DELL',
    //     database: 'Cricdb'
    // }
    sqlConfig: {
        user: 'db_a7a81a_kannapps_admin',
        password: 'Zenminds@123',
        server: 'SQL5052.site4now.net',
        database: 'db_a7a81a_kannapps'
    }
};
var debug = {
    'Server': 'server',
    'mongooseConnect': 'MongooseConnect',
    'routerDebug': 'Routermodule',
    'routeErrorDebug': 'RouteError'
};

module.exports.debug = debug;
module.exports.config = config;