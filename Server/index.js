const express = require('express')
const app = express()
const config = require('./config');
const mongoose = require('mongoose');
const registerUser = require('./routes/registerUser');
const signinUser = require('./routes/signinUser');
const changeProfileStatus = require('./routes/changeProfileStatus');
// const getMedicalSheet = require('./routes/getMedicalSheet');
const putMedicalSheet = require('./routes/putMedicalSheet');
const getUserInfo = require('./routes/getUserInfo');
const requestUserDetails = require('./routes/requestUserDetails')
const bodyParser = require('body-parser');
const allow = require("./routes/allow")
const search = require("./routes/search.js")

mongoose.connect(config.database)
  .then(() => console.log('connected to mongoose'))
  .catch((err) => console.error('error connecting to mongo', err));



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/registerUser', registerUser);
app.post('/signinUser', signinUser);
app.post('/changeProfileStatus', changeProfileStatus);
// app.get('/getMedicalSheet', getMedicalSheet);
app.post('/putMedicalSheet', putMedicalSheet);
app.get('/getUserInfo/:id/:medId', getUserInfo);
app.get('/requestUserDetails/:userId/:medId/:medName', requestUserDetails)
app.get('/allow/:userId/:medId', allow)

app.get('/search/:data', search)


app.listen(4002, () => console.log('Example app listening on port 4002!'))
