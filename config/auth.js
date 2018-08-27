var utilService = require('../services/util')();

module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status('401').json(utilService.throwDefaultResponse(false, "Não autorizado", null));
    }
}