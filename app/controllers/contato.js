var util = require('../services/util');
var sanitize = require('mongo-sanitize');

module.exports = function(app) {
    let controller = {};
    let utilService = new util();
    let Contato = app.models.contato;

    controller.listaContatos = function(req, res) {
        Contato.find().populate('emergencia').exec()
            .then(function(contatos){
                res.json(utilService.throwDefaultResponse(true, null, contatos));
            }, function(erro) {
                console.log(erro);
                res.status(500).json(utilService.throwDefaultResponse(false, "Erro ao encontrar contatos.", erro));
            });
    };

    controller.listarContatosPorEmail = function(req, res) {
        let email = req.params.email;
        
        if(email) {
            Contato.find()
                .select("nome email")
                .where("email").equals(email)
                .populate('emergencia')
                .exec()
                .then(function(contatos){
                    if (!contatos) throw new Error("Nenhum contato encontrado.");
                    res.json(utilService.throwDefaultResponse(true, null, contatos));
                }, function(erro) {
                    console.log(erro);
                    res.status(500).json(utilService.throwDefaultResponse(false, "Erro ao encontrar contatos.", erro));
                });
        } else {
            res.status(400).json(utilService.throwDefaultResponse(false, "E-mail inexistente.", null));
        }
    };

    controller.obtemContato = function(req, res) {
        let _id = req.params.id;
        
        if(_id) {
            Contato.findById(_id).populate('emergencia').exec()
                .then(function(contato){
                    if (!contato) throw new Error("Contato não encontrado.");
                    res.json(utilService.throwDefaultResponse(true, null, contato));
                }, function(erro) {
                    console.log(erro);
                    res.status(500).json(utilService.throwDefaultResponse(false, "Erro ao encontrar o contato.", erro));
                });
        } else {
            res.status(400).json(utilService.throwDefaultResponse(false, "ID inexistente.", null));
        }
    };

    controller.removeContato = function(req, res) {
        let _id = sanitize(req.params.id);
        
        if(_id) {
            Contato.remove({"_id": _id}).exec()
                .then(function(){
                    res.json(utilService.throwDefaultResponse(true, null, null));
                }, function(erro) {
                    return console.error(erro);
                });
        } else {
            res.status(400).json(utilService.throwDefaultResponse(false, "ID inexistente.", null));
        }
    };

    controller.salvaContato = function(req, res) {
        var _id = req.body._id;
        var dados = {
            "nome": req.body.nome,
            "email" : req.body.email,
            "emergencia" : req.body.emergencia || null
        }

        if(_id) {
            Contato.findByIdAndUpdate(_id, dados).exec()
                .then(function(contato) {
                    res.json(utilService.throwDefaultResponse(true, null, contato));
                }, function(erro) {
                    console.log(erro);
                    res.status(500).json(utilService.throwDefaultResponse(false, "Erro ao atualizar contato.", erro));
                })
        } else {
            Contato.create(dados)
                .then(function(contato) {
                    res.status(201).json(utilService.throwDefaultResponse(true, null, contato));
                }, function(erro) {
                    console.log(erro);
                    res.status(500).json(utilService.throwDefaultResponse(false, "Erro ao registrar contato.", erro));
                });
        }
    };

    return controller;
}