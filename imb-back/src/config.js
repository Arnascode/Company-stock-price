/* eslint-disable camelcase */
require('dotenv').config();

const { MongoClient } = require('mongodb');

const finnhub = require('finnhub');

const dbClient = new MongoClient(process.env.MONGO_URL);

const PORT = +process.env.PORT || 5000;

const { api_key } = finnhub.ApiClient.instance.authentications;
api_key.apiKey = process.env.API_key;

const finnhubClient = new finnhub.DefaultApi();

module.exports = {
  PORT,
  dbClient,
  finnhubClient,
};
