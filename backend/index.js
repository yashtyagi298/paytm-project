const express = require('express')
const app= express();
const cors= require("cors");
app.use(cors());
const port=3000;
const mainRouter = require('../backend/routes/index');
app.use(express.json());
app.use("/api/v1",mainRouter); // app.use is used for middlewares but we have use it routes case also 
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


