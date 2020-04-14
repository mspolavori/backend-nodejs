module.exports = function(application){
    
    application.get('/sacar', function(req, res) {        
        res.render('sacar/sacar.ejs');
        
    }); 

    application.post('/sacar', function(req, res) {        
        res.render('sacar/sacar.ejs');
    }); 

    application.post('/sacar/cancelar', function(req, res) {
        res.render('home/index.ejs');

    });

    application.post('/sacar/salvar', function(req, res) {        
        var conta = req.body;

        var connection    = application.config.dbConnection();
        var contaModel    = application.app.models.contaModel;
        var histOperModal = application.app.models.histOperacaoModal;
        contaModel.getConta(conta, connection, function(error, result){
            if (conta.valorSaque > 600) {
                res.render('sacar/limiteUltrapassado.ejs');
            }else {
                if(!Object.keys(result).length){
                    //retornar mensagem para tela
                    res.render('sacar/contaNaoEncontrada.ejs');
                }else {
                    var saldoAtual = result[0].saldo;

                    if (saldoAtual + 0.30 < conta.valorSaque){
                        res.render('sacar/saldoInsuficiente.ejs');
                    }else {
                        var histOperacao = new Object();
                            histOperacao.idConta = result[0].idConta;
                            histOperacao.tpOperacao = 2;
                            histOperacao.valorOperacao = conta.valorSaque;

                        conta.valorSaque = parseFloat(conta.valorSaque) + 0.30;
                        
                        console.log(conta);

                        contaModel.saveSaque(conta, connection, function(error, result){
                            histOperModal.saveHistOperacao(histOperacao, connection, function(error, result){
                                contaModel.getConta(conta, connection, function(error, result){
                                    var contaAtualizada = result;
                                    histOperModal.getHistOperacao(histOperacao, connection, function(error, result){

                                        res.render('histOperacao/histOperacao.ejs', {conta : contaAtualizada,
                                                                                     histoper: result});
                                    });
                                });                                 
                            });
                        });
                    }
                }
            }
        });
    }); 
};
