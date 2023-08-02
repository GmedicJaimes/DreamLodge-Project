// import mongoose from "mongoose";


// (async ()=>{
//     await mongoose.connect('mongodb://localhost27017/dreamLodge')
//     await 
// })();
// import mongoose from 'mongoose';

// const dbName = 'dreamLodge'; 
// const dbURI = `mongodb://localhost:27017/${dbName}`;

// (async () => {
//   try {
//     await mongoose.connect(dbURI);
//     console.log('Conexión exitosa a la base de datos.');
//   } catch (err) {
//     console.error('Error al conectar a la base de datos:', err);
//   }
// })();
// mongodb.ts
import { MongoClient, ServerApiVersion } from 'mongodb';
import config from './config';

const uri = config.mongoURI;

async function run() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export default run