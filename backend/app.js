const express = require("express");

const errorRoute = require("./utils/errorRoute");
const cors = require('cors');
const fileUpload = require("express-fileupload"); 
const userRoute = require("./routers/userRoute");

const fileRouter = require("./routers/fileRoutes");
  const path = require('path');
const bookRoute = require("./routers/bookRoute");


const app = express();
app.use(cors({
    origin: 'https://roaring-wisp-c91833.netlify.app', // Replace with your frontend URL
    credentials: true, // Allow credentials to be sent
  
  //   origin: 'http://localhost:5173', // your Netlify frontend URL
  // credentials: true, 

}));

//Middleware to parse JSON request bodies
app.use(express.json());



app.use('/api/auth',userRoute);
 
   app.use('/api/file',fileRouter);
   app.use('/api/book',bookRoute);
  

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get("/", (req, res) => {
    res.send("server is running..")
})



// Middleware to handle 404 errors
app.use(errorRoute);

module.exports = app;