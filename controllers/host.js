let Host = require('../models/host');

exports.getHostPage = (req, res, next) => {
  res.render('host', {
    pageTitle: 'Add Host'
  });
};

exports.addHost = (req, res, next) => {
  let reqHost = { ...req.body };
  let name = reqHost.firstName + ' ' + reqHost.lastName;
  let email = reqHost.email;
  let phoneNumber = reqHost.phoneNumber;
  let address = reqHost.address;
  let host = new Host({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    address: address
  });
  host
    .save()
    .then(result => {
      console.log('Host Added!');
      return res.status(200).json({
        message: 'Success'
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    });
};
