const routeErrorDebug = require('debug')('RouteError');
function error(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    routeErrorDebug(err);
}
module.exports = error;