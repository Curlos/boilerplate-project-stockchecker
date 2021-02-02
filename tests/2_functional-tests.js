const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    suite('GET request to /api/stock-prices/', function() {
      
        test('Viewing one stock', (done) => {
          chai.request(server)
          .get('/api/stock-prices?stock=GME')
          .end(function(err, res){
            assert.equal(res.status, 200);
            console.log(res.body);
            done();
          });
        });
        
    });
});
