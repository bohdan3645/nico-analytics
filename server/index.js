const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 4000;

//import routes
const websites = require('./routes/websites');

app.use('/', websites);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});