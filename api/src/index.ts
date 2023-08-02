import app from './app';
import './db'
import run from "./db"
const PORT = 3001;

//startingServer



async function main(){
    await run()

    app.listen(PORT, () => {
        console.log(`server listen on port ${PORT}`);
    });
}

main()