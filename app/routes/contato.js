var verificarAutenticacao = require('../../config/auth');

module.exports = function(app) {
    var controller = app.controllers.contato;
    
    app.route('/contatos')
        .get(verificarAutenticacao, controller.listaContatos)
        .post(verificarAutenticacao, controller.salvaContato);

    app.route('/contatos/:id')
        .get(verificarAutenticacao, controller.obtemContato)
        .delete(verificarAutenticacao, controller.removeContato);
}