const express = require('express')
const history = require('connect-history-api-fallback');
const app = express()
const api = require('./router');
var bodyParser = require('body-parser')
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(api);
app.listen(3000, '0.0.0.0')