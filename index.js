'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const db = require('./db');


const app = express();

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/db', function (request, response) {
  db.get(request, response);
});

app.get('*', function(request, response) {  
  db.put(request, response);
  response.status(404).end();
});

app.post('*', function(request, response) {
    db.put(request, response);
    response.status(404).end();
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


