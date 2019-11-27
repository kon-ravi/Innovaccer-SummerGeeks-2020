let Visitor = require('../models/visitor');
let Host = require('../models/host');

let ticketId = 100;

let nodeMailer = require('nodemailer');

let sendEmailAfterCheckout = async visitor => {
  try {
    let testAccount = await nodeMailer.createTestAccount();
    let transporter = nodeMailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'preston23@ethereal.email',
        pass: '8SurkXsugEvVFDdyYE'
      }
    });
    let info = await transporter.sendMail({
      from: 'Yash Ranjan',
      to: visitor.email,
      subject: 'Hope you enjoyed your visit ' + visitor.name,
      text: `Here are the details of your visit:-
        Name:- ${visitor.name},
        Phone:- ${visitor.phoneNumber},
        Check-in Time:- ${visitor.checkIn.toLocaleString()},
        Check-out Time:-${visitor.checkOut.toLocaleString()},
        Host Name:-${visitor.hostId.name},
        Address Visited:- ${visitor.hostId.address}
        Hope you  enjoyed it!
      `
    });
    console.log("Checkout Email Sent To Visitor's Email");
  } catch (err) {
    console.log(err);
  }
};

let sendEmailToHost = async visitor => {
  try {
    let host = await Host.findById(visitor.hostId);
    let testAccount = await nodeMailer.createTestAccount();
    let transporter = nodeMailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'preston23@ethereal.email',
        pass: '8SurkXsugEvVFDdyYE'
      }
    });
    let info = await transporter.sendMail({
      from: 'Yash Ranjan',
      to: host.email,
      subject: 'Someone came to visit you ' + host.name,
      text: `Here are the details of the visitor:-
          Name:- ${visitor.name},
          Phone:- ${visitor.phoneNumber},
          Email:- ${visitor.email},
          Check-in Time:- ${visitor.checkIn.toLocaleString()}`
    });
    console.log("Checkin Email Sent To Hosts's Email");
  } catch (err) {
    console.log(err);
  }
};

exports.getVisitorPage = (req, res, next) => {
  Host.find()
    .then(result => {
      let hostArr = result;
      res.render('visitor', {
        pageTitle: 'Visitor Check In',
        hostArr: hostArr
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.addVisitor = (req, res, next) => {
  let reqVis = { ...req.body };
  let name = reqVis.firstName + ' ' + reqVis.lastName;
  let email = reqVis.email;
  let phoneNumber = reqVis.phoneNumber;
  let checkIn = new Date();
  let hostId = reqVis.hostId;
  let lastVis = null;
  Visitor.find()
    .sort({ checkIn: 1 })
    .limit(1)
    .then(doc => {
      if (doc) {
        lastVis = doc;
      }
    });
  if (lastVis) {
    ticketId = lastVis.ticketId;
  }
  ticketId++;
  let visitor = new Visitor({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    checkIn: checkIn,
    ticketId: ticketId,
    hostId: hostId,
    checkOut: new Date('0001-01-01'),
    hasCheckedOut: false
  });
  visitor
    .save()
    .then(result => {
      console.log('Visitor added!');
      sendEmailToHost(visitor);
      return res.status(200).json({
        ticketId: ticketId
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        message: 'Error'
      });
    });
};

exports.getCheckoutPage = (req, res, next) => {
  return res.render('checkout', {
    pageTitle: 'Checkout'
  });
};

exports.checkoutVisitor = async (req, res, next) => {
  try {
    let ticketId = +req.body.ticketNo;
    let visitor = await Visitor.findOne({ ticketId: ticketId });
    if (!visitor) {
      return res.status(404).json({
        message: 'Not Found!'
      });
    }
    if (visitor.hasCheckedOut === true) {
      return res.status(405).json({
        message: 'Already Checked Out!'
      });
    }
    visitor = await Visitor.findOneAndUpdate(
      { ticketId: ticketId },
      { checkOut: new Date(), hasCheckedOut: true }
    );
    visitor = await Visitor.findById(visitor._id).populate('hostId');
    await sendEmailAfterCheckout(visitor);
    return res.status(200).json({
      message: 'Checked out!'
    });
  } catch (err) {
    console.log(err);
  }
};
