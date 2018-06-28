const contatos = [
    {_id: 1, nome: 'Contato Exemplo 1', email: 'cont1@empresa.com.br'},
    {_id: 2, nome: 'Contato Exemplo 2', email: 'cont2@empresa.com.br'},
    {_id: 3, nome: 'Contato Exemplo 3', email: 'cont3@empresa.com.br'}
];

module.exports = function() {
    let controller = {};

    controller.listaContatos = function(req, res) {
        res.json(contatos);
    };

    controller.obtemContato = function(req, res) {
        let contato = contatos.filter(function(contato) {
            return contato._id == req.params.id;
        })[0];
            
        contato ? res.json({
            success: true,
            message: null,
            data: contato
        }) : res.status(404).send({
            success: false,
            message: 'Contato não encontrado.',
            data: null
        });
    }

    return controller;
}