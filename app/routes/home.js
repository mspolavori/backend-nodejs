module.exports = function(application){
    application.get('/', function(req, res) {
        res.render('home/index.ejs');
    });

    application.post('/', function(req, res) {
        res.render('home/index.ejs');
    });

    application.post('/conta/criar', function(req, res) {
        
        res.redirect('/conta');
    
    });
    application.post('/conta/depositar', function(req, res) {
        
        res.redirect('/depositar');
    
    });
    application.post('/conta/sacar', function(req, res) {
        
        res.redirect('/sacar');
    
    });

    

};