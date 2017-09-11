var express = require('express');
var app = express();
app.set('view engine', 'pug');
app.set('views','./views');

app.get('/signin', function (req, res) {
    res.render('signin');
});

app.get('/profile', function (req, res) {
    res.render('profile',
    {       first_name: "jan",
            last_name: "kowalski"
        });
});

app.use(function(req, res, next){
    console.log('Hej, jestem pośrednikiem między żądaniem a odpowiedzią!');
    next();
});


var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
});