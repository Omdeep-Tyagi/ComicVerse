const mongoose = require("mongoose");
const initData = require("./data.js");
const ComicBook= require("../models/comicBookModel");
require('dotenv').config({ path: '../.env' });

const MONGO_URL = process.env.CONNECTION_STRING;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("DB connection error:", err);
  });

  async function main() {
    if (!MONGO_URL) {
      throw new Error('MongoDB connection string is not defined in the environment variables');
    }
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

const initDB = async () => {
  try {
    await ComicBook.deleteMany({});  // Delete all existing records
    await ComicBook.insertMany(initData.data);  // Insert new data
    console.log("Data was initialized successfully");
  } catch (err) {
    console.error("Error during database initialization:", err);
  }
};

initDB();
