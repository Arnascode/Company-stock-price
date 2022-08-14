const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const companyRoutes = require('./api/companyRoutes');
const { PORT } = require('./config');

const app = express();

// Global MiddleWare
app.use(morgan('dev'));
app.use(cors());
app.get('/', (req, res) => res.json('OK'));

// Routes
app.use('/api', companyRoutes);

app.all('*', (req, res) => {
  res.status(400).json({ error: 'page not found' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
