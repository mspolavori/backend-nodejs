module.exports = function(){

    this.saveHistOperacao = function(histOperacao, connection, callback){
        connection.query('insert into histOperacao set ?', histOperacao, callback);
    };

    this.getHistOperacao = function(histOperacao, connection, callback){
        var filter = ' where idConta = ' + parseInt(histOperacao.idConta);
        connection.query('select * from histOperacao ' + filter, callback);
    };

    return this;
};