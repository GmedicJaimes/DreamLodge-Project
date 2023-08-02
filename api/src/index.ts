import app from './app';
import './db'

//startingServer
app.listen(app.get("port"), ()=>{
    console.log("server listen on port 4000")
})