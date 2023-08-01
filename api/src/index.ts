import express from "express";
//importing Routes
import indexRoutes from "./routes"
//initialization
const app = express()

//settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(express.json());


//routes
app.use('/users', indexRoutes);

//staticFiles

//startingServer
app.listen(app.get("port"), ()=>{
    console.log("server listen on port 4000")
})