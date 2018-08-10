var util = require('../services/util');

module.exports = function(app) {
    let controller = {};
    let utilService = new util();
    let Contato = app.models.contato;

    controller.listaContatos = function(req, res) {
        Contato.find().exec()
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
            Contato.findById(_id).exec()
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
        let _id = req.params.id;
        
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

        if(_id) {
            Contato.findByIdAndUpdate(_id, req.body).exec()
                .then(function(contato) {
                    res.json(utilService.throwDefaultResponse(true, null, contato));
                }, function(erro) {
                    console.log(erro);
                    res.status(500).json(utilService.throwDefaultResponse(false, "Erro ao atualizar contato.", erro));
                })
        } else {
            Contato.create(req.body)
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