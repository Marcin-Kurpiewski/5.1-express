var express = require('express');
var app = express();
app.use(express.static('assets'));
app.set('view engine', 'pug');  // pug jako kreator widoków
app.set('views','./views'); // widoki

app.get('/', function (req, res) {
    res.sendFile('/index.html')
});

app.get('/userform', function (req, res) {
    const response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    res.end(JSON.stringify(response));
});

app.use(function(req, res, next){
    console.log('Hej, jestem pośrednikiem między żądaniem a odpowiedzią!');
    next();
});

app.get('/store', function(req, res, next){
    console.log(" jestś w sklepie :-)  ");
    res.send("jesteś w sklepie");
});

app.get('/first-view', function(req, res){
    res.render('first-view');
});

app.get('/dynamic', function(req, res){
    res.render('dynamic', {
        name: "moja dynamiczna strona",
        url:"http://www.google.com"
    });
});

app.get('/logic', function (req, res){
    res.render('logic', {
        user:
            { name: "Johny", age:"20"}
    });

});


app.get('/content', function (req, res){
    res.render('content');
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port);
});