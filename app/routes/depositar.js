module.exports = function(application){
    
    application.get('/depositar', function(req, res) {        
        res.render('depositar/depositar.ejs');
        
    }); 

    application.post('/depositar', function(req, res) {        
        res.render('depositar/depositar.ejs');
    }); 

    application.post('/depositar/cancelar', function(req, res) {
        res.render('home/index.ejs');

    });

    application.post('/depositar/salvar', function(req, res) {        
        var conta = req.body;

        var connection    = application.config.dbConnection();
        var contaModel    = application.app.models.contaModel;
        var histOperModal = application.app.models.histOperacaoModal;
        contaModel.getConta(conta, connection, function(error, result){

            if(!Object.keys(result).length){
                //retornar mensagem para tela
                res.render('depositar/contaNaoEncontrada.ejs');
            }else {

                var histOperacao = new Object();
                    histOperacao.idConta = result[0].idConta;
                    histOperacao.tpOperacao = 1;
                    histOperacao.valorOperacao = conta.valorDeposito;

                contaModel.saveDeposito(conta, connection, function(error, result){
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
            
            
        });
        
        
    }); 
};
