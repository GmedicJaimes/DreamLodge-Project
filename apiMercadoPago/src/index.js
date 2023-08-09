const express = require('express');
const payment = require('../src/routes/payment');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'))
app.use(payment);

app.listen(3001)
console.log("server listening on port 3001")