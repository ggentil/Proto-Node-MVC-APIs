var util = require('../services/util');

let contatos = [
    {_id: 1, nome: 'Contato Exemplo 1', email: 'cont1@empresa.com.br'},
    {_id: 2, nome: 'Contato Exemplo 2', email: 'cont2@empresa.com.br'},
    {_id: 3, nome: 'Contato Exemplo 3', email: 'cont3@empresa.com.br'}
];
let ID_CONTATO_INC = contatos.length;

module.exports = function() {
    let controller = {};
    let utilService = new util();

    controller.listaContatos = function(req, res) {
        res.json(utilService.throwDefaultResponse(true, null, contatos));
    };

    controller.obtemContato = function(req, res) {
        let contato = contatos.filter(function(contato) {
            return contato._id == req.params.id;
        })[0];
            
        contato ? 
            res.json(utilService.throwDefaultResponse(true, null, contato)) : 
            res.status(404).send(utilService.throwDefaultResponse(false, 'Contato não encontrado.', null));
    }

    controller.removeContato = function(req, res) {
        let qtdeContato = contatos.length;
        contatos = contatos.filter(function(contato) {
            return contato._id != req.params.id;
        })

        qtdeContato != contatos.length ?
            res.status(200).send(utilService.throwDefaultResponse(true, "Contato excluído com sucesso.", null)) :
            res.status(200).send(utilService.throwDefaultResponse(false, "Contato não encontrado.", null))
    }

    controller.salvaContato = function(req, res) {
        let contato = req.body;
        if (contato._id) {
            contato = atualizarContato(contato);
            contato ?
                res.status(200).send(utilService.throwDefaultResponse(true, "Contato atualizado com sucesso.", contato)) :
                res.status(200).send(utilService.throwDefaultResponse(false, "Contato não encontrado.", null));
        } else {
            contato = adicionaContato(contato);
            contato ?
                res.status(201).send(utilService.throwDefaultResponse(true, "Novo contato incluso com sucesso.", contato)) :
                res.status(200).send(utilService.throwDefaultResponse(false, "Não foi possível incluir novo contato.", null));
        }
    };

    function atualizarContato(contato) {
        let contatoAtualizado = false;

        for (let index = 0; index < contatos.length || !contatoAtualizado; index++) {
            if (contato._id == contatos[index]._id) {
                contatos[index] = contato;
                contatoAtualizado = true;
            }
        }

        return contatoAtualizado ? contato : null;
    };

    function adicionaContato(contato) {
        contato._id = ++ID_CONTATO_INC;
        contatos.push(contato);
        return contato;
    };

    return controller;
}