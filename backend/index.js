const express = require('express')
const app= express();
const cors= require("cors");
app.use(cors({
  origin: 'http://localhost:5173'  // replace with your frontend's URL
}));
const bodyParser= require('body-parser');

const port=3000;
const mainRouter = require('../backend/routes/index');
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/v1",mainRouter); // app.use is used for middlewares but we have use it routes case also 
app.get('/', (req, res) => {
    res.send('Hello World!')
  })


  // Catch-all error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


