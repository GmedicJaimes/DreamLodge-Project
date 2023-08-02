import app from './app';
import './db'
import run from "./db"

//startingServer



async function main(){
    await run()

    app.listen(app.get("port"), ()=>{
        console.log("server listen on port 4000")
})}


main()