const express = require('express');
const router = express.Router();
const User = require('../models/register');
// const jwt    = require('jsonwebtoken');
const config = require('../config');
const Sharelog = require('../models/sharelog');


module.exports = (req, res, next) => {
    const userid = req.params.id;
    console.log(req.params.medId, req.params.id);

    Sharelog.findOne({
        userId: userid, medId: req.params.medId
    }, function (err, users) {
        if (err) throw err;
        console.log(users)
        if (users && users.status) {
            User.findOne({
                userId: userid
            }, function (err, user) {
                if (err) throw err;
                res.json({
                    success: true,
                    userId: user.userId,
                    phone: user.phone,
                    name: user.name,
                    rights: user.rights,
                    status: user.profileStatus,
                    data: user.data
                });
            });
        } else {
            res.json({
                success: false
            })
        }
    });


}
