const express = require('express');
const payment = require('../src/routes/payment');
const morgan = require('morgan');
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(payment);

app.listen(3001)
console.log("server listening on port 3001")