const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const visitorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date
  },
  hasCheckedOut: {
    type: Boolean,
    required: true
  },
  hostId: {
    type: Schema.Types.ObjectId,
    ref: 'Host',
    required: true
  },
  ticketId: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Visitor', visitorSchema);
