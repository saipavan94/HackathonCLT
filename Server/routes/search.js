const express = require('express');
const router = express.Router();
const User = require('../models/register');
// const jwt    = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    const str = req.params.data;
    let re = [];
    User.find({}, function (err, user) {
        if (err) throw err;
        // console.log(user);
        for (let i = 0; i < user.length; i++) {
            let data
            if (user[i].data.length > 0) {
                data = JSON.parse(user[i].data)

            } else {
                data = []
            }
            data.forEach(element => {
                // console.log(user.profileStatus)
                if (element.cause == str && user[i].profileStatus) {
                    re.push(element)
                }
            });
            if (i === user.length - 1) {
                console.log(re)
                res.json({ data: re })

            }
        }


    });

}
