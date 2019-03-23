const express = require('express');
const router = express.Router();
const User = require('../models/register');
const Sharelog = require('../models/sharelog');

// const jwt    = require('jsonwebtoken');
const config = require('../config');
const nodemailer = require('nodemailer');



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ajaykumartelanakula4@gmail.com',
        pass: 'saiajay14'
    }
});
module.exports = (req, res, next) => {
    const userid = req.params.userId;
    // const data = req.body.data;
    Sharelog.findOne({ userId: req.params.userId, medId: req.params.medId }, function (err, user) {
        user.status = true;
        user.save(function (err) {
            if (err) throw err;

            res.send("Done !!")

        });
    });
}