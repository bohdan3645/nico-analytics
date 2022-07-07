const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

//import routes
const testRoute = require('./routes/testRoute');

app.use('/', testRoute);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});