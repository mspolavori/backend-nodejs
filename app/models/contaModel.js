module.exports = function(){


    this.getConta = function(conta, connection, callback){
        var filter = ' where tpConta = ' + parseInt(conta.tpConta) + ' and numeroConta =' + parseInt(conta.numeroConta);
        connection.query('select * from conta ' + filter, callback);
    };

    this.saveConta = function(conta, connection, callback){
        connection.query('insert into conta set ?', conta, callback);
    };

    this.saveDeposito = function(conta, connection, callback){
        var filter = ' where tpConta = ' + parseInt(conta.tpConta) + ' and numeroConta = ' + parseInt(conta.numeroConta);
        var set    = ' set saldo = saldo + ' + parseFloat(conta.valorDeposito);

        connection.query('update conta' + set + filter, callback);
    };

    this.saveSaque = function(conta, connection, callback){
        var filter = ' where tpConta = ' + parseInt(conta.tpConta) + ' and numeroConta = ' + parseInt(conta.numeroConta);
        var set    = ' set saldo = saldo - ' + parseFloat(conta.valorSaque);

        connection.query('update conta' + set + filter, callback);
    };

    return this;
};