//importing modules
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
require('dotenv').config()

var cors = require("cors");
var path = require("path");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var app = express();

//Connect to Mongodb
mongoose.connect(process.env.DB_URL);

mongoose.connection.on('connected',() =>{
    console.log('Connected');
})

mongoose.connection.on('error',(err) =>{
    console.log('Error connection' + err);
})

const userroute = require("./routes/userroute");
const adminroute = require("./routes/adminroute");

//Port No
const port = process.env.PORT || 3000;

//adding middleware cors
app.use(cors())

//body-parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')))

if (process.env.NODE_ENV  === "production") {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendFile((__dirname + '/public/index.html')));
}

app.use('/user', userroute);
app.use('/admin', adminroute);

app.get('/', (req, res) => {
    res.send('Success');
})

app.listen(port, () =>{
    console.log('Server Started--->' + port);
})