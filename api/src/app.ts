import express from "express";
import routes from './routes';

//config app

const app = express();
app.use("/", routes)
export default app;