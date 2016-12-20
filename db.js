'use strict';
const pg = require('pg');

const insertQuery = "INSERT INTO post_data(_route, _content, _date) VALUES($1, $2, $3)";

exports.put = function(request, response){
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(insertQuery,[request.path, request.body, new Date().toISOString()] , function(err, result) {
      done();
      return err ? err : 'null';
    });
  });   
}

exports.get = function(request, response){
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM post_data', function(err, result) {
      done();
    //   return err ? err : 'null';
       if (err)
        { console.error(err);
     }
       else {
            response.render('pages/db', {results: result.rows} ); 
        }
     });
  });
}