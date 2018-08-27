var util = require('../app/services/util');

module.exports = function(req, res, next) {
    let utilService = new util();

    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status('401').json(utilService.throwDefaultResponse(false, "Não autorizado", null));
    }
}