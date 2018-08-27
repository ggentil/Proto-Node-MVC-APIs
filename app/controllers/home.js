module.exports = function() {
    var controller = {};

    controller.index = function(req, res) {
        res.render('home', {
            'nome': "Drauzio",
            'usuarioLogado': req.user.login
        });
    };

    return controller;
};