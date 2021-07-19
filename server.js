const express = require('express');
const cors = require('cors');
const userRouters = require('./src/routers/userRouters')
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const app = express();
app.use(cors())
app.use(express.json());


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smart-door-lock-a0a10-default-rtdb.firebaseio.com"
});


app.use(express.urlencoded({ extended: true }))
 


// user server
app.use('/api/v1/user',userRouters)

// listen server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`)
})


// default response
app.use((err,req,res,next) => {
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {}
  })
})
