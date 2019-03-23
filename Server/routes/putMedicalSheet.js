const express = require('express');
const router = express.Router();
const User = require('../models/register');
// const jwt    = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    const userid = req.body.userId;
    const data = req.body.data;
    console.log(userid)
    User.findOne({
        userId: userid
    }, function (err, user) {
        if (err) throw err;
        // console.log(user);
        let temp = user.data
        if (temp != []) {
            temp = JSON.parse(temp)
        }
        temp.push(data)
        // console.log(temp)
        user.data = JSON.stringify(temp)

        console.log(user);

        user.save(function (err) {
            if (err) throw err;

            res.json({ success: true });

        });
    });
}
