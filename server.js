const express=require("express");
const app=express();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv=require("dotenv").config();

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/comicBook", require("./routes/comicBookRoutes"));
app.use(errorHandler);

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is listening to port ${port}`);
});