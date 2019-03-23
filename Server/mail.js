var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'emailtoveginati@gmail.com',
    pass: 'Deloitte100g'
  }
});

var mailOptions = {
  from: 'emailtoveginati@gmail.com',
  to: 'pavansai.n@gmail.com',
  subject: 'Your Key for ',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
