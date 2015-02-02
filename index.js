var pg = require('pg');
var when = require('when');

var query = module.exports = function(sql, data) {

  var d = when.defer();

  pg.connect(query.connectionParameters, function(err, client, done) {
    if(err) { return d.reject(new Error(err.toString())); }

    var query = client.query(sql, data, function(err, result) {
      done();
      if(err) { return d.reject(new Error(err.toString())); }

      return d.resolve(result);
    });
  });

  return d.promise;

};