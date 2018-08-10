var MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    url = 'mongodb://localhost:27017/',
    _idProcurado = new ObjectID('5b6b062d2c339ed0e8c42911');

MongoClient.connect(url, function(err, client){
    if (err) throw err;
    var collection = client.db('contatooh').collection('contatos');
    
    collection.findOne({_id: _idProcurado}, {nome: 1}, function(erro, docs) {
        if (erro) throw erro;
        console.log(docs);
    });
});