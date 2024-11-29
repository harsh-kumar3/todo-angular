const express = require('express');
const port = 5000;
const app = express();
var cors = require('cors') 
require("dotenv").config()

require('./config/mongoose')

// To use req.body
app.use(express.json())

app.use(cors())

// use express router
// require('./routes/index) is similar to require('./routes) in this case, it by default fetch routes
app.use('/', require('./routes/index'))
app.listen(port, function () {
    console.log(`Server is listening at port ${port}`);
})