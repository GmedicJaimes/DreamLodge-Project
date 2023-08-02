import app from './app';
import run from './db'
const PORT = 3001
//startingServer

async function main() {
    await run();
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

main();
