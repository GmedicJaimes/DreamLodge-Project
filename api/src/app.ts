import express from "express";
import mainRouter from './routes/index';

//config app

const app = express();
app.use("/", mainRouter)
export default app;