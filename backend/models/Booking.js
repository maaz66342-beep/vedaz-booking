const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  expertId: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert' },
  userName: String,
  userEmail: String,
  date: String,
  time: String,
  status: { type: String, default: 'Confirmed' },
  createdAt: { type: Date, default: Date.now }
});

// Ye line important hai - Error fix karti hai
module.exports = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);