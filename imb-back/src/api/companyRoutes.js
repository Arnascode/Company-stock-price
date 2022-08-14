const express = require('express');
const { dbClient, finnhubClient } = require('../config');

const companyRoutes = express.Router();

// ROUTES

companyRoutes.get('/company/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    const con = await dbClient.connect();
    console.log('connected');
    finnhubClient.companyProfile2({ symbol: `${symbol}` }, (error, data, response) => {
      res.json(data);
      console.log('Company name ===', data.name);

      let json = response.body.name;
      const collection = con.db('ibm').collection('ibm_user');
      collection.insertOne({ name: json });
      console.log('Inserted company name to MongoDatabase');
    });
  } catch (error) {
    console.error('error in get company', error);
    res.status(500).json('something is wrong');
  } finally {
    // await dbClient.close();
  }
});

companyRoutes.get('/company/:symbol/:startime/:endtime', async (req, res) => {
  const { symbol, startime, endtime } = req.params;

  try {
    const con = await dbClient.connect();
    console.log('connected');
    finnhubClient.stockCandles(`${symbol}`, 'D', `${startime}`, `${endtime}`, (error, data, response) => {
      res.json(data);
      console.log('Company stock data ===', data);

      let json = response.body;
      const collection = con.db('ibm').collection('ibm_user');
      collection.insertOne({ stocks: json });
      console.log('Inserted stock to MongoDatabase!');
    });
  } catch (error) {
    console.error('error in get stock', error);
    res.status(500).json('something is wrong');
  } finally {
    // await dbClient.close();
  }
});

module.exports = companyRoutes;
