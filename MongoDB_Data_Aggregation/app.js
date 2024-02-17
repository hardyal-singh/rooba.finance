import env from "dotenv"
import { MongoClient, ServerApiVersion } from 'mongodb';
env.config()
const uri =process.env.MONGO_URI 

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
   const db= await client.db("RoboFinnace")

   const Userss=await db.collection("Userss")

   const user=await Userss.aggregate([
      {
          $group: {
              _id: null,
              total_users: { $sum: 1 },
              average_age: { $avg: "$age" },
              users_by_country: {
                  $push: {
                      country: "$country",
                      count: 1
                  }
              }
          }
      },
      {
          $unwind: "$users_by_country"
      },
      {
          $group: {
              _id: "$users_by_country.country",
              total_users: { $sum: "$users_by_country.count" },
              average_age: { $first: "$average_age" },
          }
      },
      {
          $project: {
              _id: 0,
              country: "$_id",
              total_users: 1,
              average_age: 1
          }
      }
  ]).toArray()
   console.log(user)
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


