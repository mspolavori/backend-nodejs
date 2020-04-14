module.exports = function(application){
    
    application.get('/conta', function(req, res) {        
        res.render('conta/criarConta.ejs');
        
    }); 

    application.post('/conta', function(req, res) {        
        res.render('conta/criarConta.ejs');
        
    });

    application.post('/conta/cancelar', function(req, res) {
        res.render('home/index.ejs');
        
    });

    application.post('/conta/salvar', function(req, res) {        
        //res.render('conta/criarConta.ejs');
        var conta = req.body;
            conta.saldo = 0;
        

        var connection = application.config.dbConnection();
        var contaModel = application.app.models.contaModel;
        contaModel.getConta(conta, connection, function(error, result){
            

            if(!Object.keys(result).length){
                
                contaModel.saveConta(conta, connection, function(error, result){
                    
                    res.redirect('/');
                });
            
            }else {
                //retornar mensagem para tela
                res.render('conta/contaExiste.ejs');
            }
            
            
        });

        
        
    }); 
};
