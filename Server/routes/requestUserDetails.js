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
    let sharelog = new Sharelog({
        userId: userid,
        medId: req.params.medId,
        status: false
    })
    sharelog.save(function (err) {
        if (err) throw err;

        // res.json({ success: true });

    });


    console.log(userid)
    User.findOne({
        userId: userid
    }, function (err, user) {
        if (err) throw err;
        let mailOptions = {
            from: 'ajaykumartelanakula4@gmail.com',
            to: "pavansai.n@gmail.com",
            subject: 'Requesting Access for your medical Record',
            text: req.params.medName + ' wnats to access your records. To share your records please click http://localhost:4002/allow/' + userid + '/' + req.params.medId
        };
        //
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.json({ "success": false })
                console.log(error);

            } else {
                res.json({ "success": true })

                console.log('Email sent: ' + info.response);
            }
        });
    });
}
