const mongoose = require("mongoose");
const User = require("../models/User");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://techvishwasindia_db_user:WJ9BHRc1UUPDwz9m@ac-xndl7m7-shard-00-00.mnvbx15.mongodb.net:27017,ac-xndl7m7-shard-00-01.mnvbx15.mongodb.net:27017,ac-xndl7m7-shard-00-02.mnvbx15.mongodb.net:27017/?ssl=true&replicaSet=atlas-1sj1bt-shard-0&authSource=admin&appName=Cluster0",
    );
    console.log(`Mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting the Mongodb ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
