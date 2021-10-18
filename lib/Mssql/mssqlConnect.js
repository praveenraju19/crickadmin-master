var sql = require("mssql");
const routerDebug = require('debug')('mssql');
const { Sequelize } = require('sequelize');
var poolPromise
// var sql
const sqlConfig = require('../../Config/config.js').config.sqlConfig

//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     // options: {
//     //     encrypt: false, // for azure
//     //     trustServerCertificate: true // change to true for local dev / self-signed certs
//     // }
// }
// var strng = 'Server=MAHADEV,1433;Database=MDGNexoft;User Id=sa;Password=6August1995;Encrypt=false'
async function mssqlConnect() {
    // try {
    //     // make sure that any items are correctly URL encoded in the connection string
    //     await sql.connect(sqlConfig);

    //     // await sql.connect(sqlConfig)

    //     // const result = await sql.query('select * from [dbo].[USERSN]')
    //     console.log(result)
    //     routerDebug(result)
    // } catch (err) {
    //     console.error(err)
    //     // ... error checks
    // }
    var sql = require("mssql");
    var config = sqlConfig;
    poolPromise = new sql.ConnectionPool(config)
        .connect()
        .then(pool => {
            console.log('Connected to MSSQL')
            return pool
        })
        .catch(err => console.log('Database Connection Failed! Bad Config: ', err))


    // sql.connect(config, function (err) {

    //     if (err) console.log(err);


    //     var request = new sql.Request();


    //     request.query('select * from dbo.News', function (err, recordset) {

    //         if (err) console.log(err)


    //         // res.send(recordset);

    //     });
    // });


}

async function executeSql(sqlQuery) {
    try {

        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig);

        return await sql.query(sqlQuery)


    } catch (err) {
        console.error(err)
        // ... error checks
    }
}
// async function mssqlConnect() {

//     const sequelize = new Sequelize('MDGNexoft', 'sa', '6August1995', {
//         host: 'MAHADEV',
//         dialect: 'mssql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
//     });

//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }

// }
module.exports = {
    sql, poolPromise, executeSql
}
module.exports.mssqlConnect = mssqlConnect;