'use strict';

const axios = require('axios');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async (req, res) => {
      
      if(req.query.stock.length == 2) {
        let responseOne = await axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${req.query.stock[0].toUpperCase()}/quote`)
        let stockInfoOne = responseOne.data;

        let responseTwo = await axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${req.query.stock[1].toUpperCase()}/quote`)
        let stockInfoTwo = responseTwo.data;

        return res.json({
          stockData: [
            {
              stock: stockInfoOne.symbol,
              price: stockInfoOne.latestPrice,
              rel_likes: 1
            },
            {
              stock: stockInfoTwo.symbol,
              price: stockInfoTwo.latestPrice,
              rel_likes: -1
            }
          ]
        })
      }

      let response = await axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${req.query.stock.toUpperCase()}/quote`)
      let stockInfo = response.data;
      console.log(stockInfo);
      console.log(req.query.stock)

      return res.json({
        stockData: {
          stock: stockInfo.symbol,
          price: stockInfo.latestPrice,
          likes: 1
        }
      });
    });
    
};
