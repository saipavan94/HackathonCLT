const express = require('express');
const router = express.Router();
const User = require('../models/register');
// const jwt    = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    const userEmail = req.body.email;
    const status = req.body.status;

    User.findOne({
        email: userEmail
    }, function (err, user) {
        if (err) throw err;
        // console.log(user);
        if (!user) {
            res.json({ success: false, message: ' User not found.' });
        } else {
            user.profileStatus = status;

            user.save(function (err) {
                if (err) throw err;

                res.json({ success: true });

            });


        }

    });
}
