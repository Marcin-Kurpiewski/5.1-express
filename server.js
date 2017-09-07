var express = require('express');
var app = express();
var fs= require('fs');
var bodyParser = require('body-parser');
var stringifyFile='';

app.use(bodyParser.json());


app.get('/:getNote', function(req, res) {
    fs.readFile('./test.json', 'utf8', function(err, data) {
        if (err) throw err;
        fileContent = data;
        res.send(data);
    });
});

app.post('/updateNote/:note', function(req, res) {
    fs.writeFile('./test.json', stringifyFile, function(req, res, next) {
        if (err) throw err;
        console.log('file updated');
    });
});  // nie działa

app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!');
});

app.listen(3000);
