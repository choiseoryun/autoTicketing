const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes/index.js');
require('dotenv').config();
const http = require('http').createServer(app);

http.listen(65017, function(){
    console.log('Server is running on', process.env.SERV_PORT);
});

app.use( express.static( path.join(__dirname, '../public') ) );
app.use('/', router);
