const express = require('express');
const payment = require('../src/routes/payment');
const morgan = require('morgan');
const cors = require('cors')
const app = express();

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    optionsSuccessStatus: 204, 
  };
  //fijense siempre que levanten, que el "origin" apunte a la pagina a la cual le queremos dar acceso a nuestro backend
app.use(cors())
app.use(morgan('dev'))
app.use(payment);

app.listen(3001)
console.log("server listening on port 3001");