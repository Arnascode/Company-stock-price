const express = require('express');
const { dbClient, finnhubClient } = require('../config');

const companyRoutes = express.Router();

// ROUTES

companyRoutes.get('/company/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    await dbClient.connect();
    console.log('connected, Company name');
    finnhubClient.companyProfile2({ symbol: `${symbol}` }, (error, data, response) => {
      res.json(data);
      console.log(data);
      // console.log(data.name);
    });
  } catch (error) {
    console.error('error in get company', error);
    res.status(500).json('something is wrong');
  } finally {
    await dbClient.close();
  }
});

companyRoutes.get('/company/:symbol/:startime/:endtime', async (req, res) => {
  const { symbol, startime, endtime } = req.params;

  try {
    await dbClient.connect();
    console.log('connected');
    finnhubClient.stockCandles(`${symbol}`, 'D', `${startime}`, `${endtime}`, (error, data, response) => {
      console.log(data);
      res.json(data);
    });
  } catch (error) {
    console.error('error in get stock', error);
    res.status(500).json('something is wrong');
  } finally {
    await dbClient.close();
  }
});

module.exports = companyRoutes;
