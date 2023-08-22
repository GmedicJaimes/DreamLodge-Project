import express from 'express';
import payment from '../src/routes/payment.mjs'; // Asegúrate de usar la extensión .mjs
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(payment);

app.listen(3001);
console.log("server listening on port 3001");
