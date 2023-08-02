import express from "express";
import mainRouter from "./routes";
import morgan from 'morgan';
import cors from 'cors';

//config app

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use("/", mainRouter)
export default app;