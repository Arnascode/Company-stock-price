/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

const express = require('express');
const { dbClient, finnhubClient } = require('../config');

const companyRoutes = express.Router();

// ROUTES

// finnhubClient.stockCandles('AAPL', 'W', 1590988249, 1591852249, (error, data, response) => {
//   console.log(data);
//   res.json(data);
// });

companyRoutes.get('/company/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    await dbClient.connect();
    console.log('connected, Company name');
    finnhubClient.companyProfile2({ symbol: `${symbol}` }, (error, data, response) => {
      res.json(data);
      console.log(data);
      // console.log(data.name);
      // data.name =
      // script(name);
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
      // script(' company price history for selected date range');
    });
  } catch (error) {
    console.error('error in get stock', error);
    res.status(500).json('something is wrong');
  } finally {
    await dbClient.close();
  }
});

module.exports = companyRoutes;
