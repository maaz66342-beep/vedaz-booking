const Expert = require('../models/Expert');
const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { expertId, userName, userEmail, date, time } = req.body;
    const io = req.app.get('io');

    if (!expertId || !userName || !userEmail || !date || !time) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (!/\S+@\S+\.\S+/.test(userEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // RACE CONDITION FIX: Atomic update
    const expert = await Expert.findOneAndUpdate(
      { _id: expertId, "slots.date": date, "slots.time": time, "slots.booked": false },
      { $set: { "slots.$.booked": true } },
      { new: true }
    );

    if (!expert) {
      return res.status(409).json({ error: 'Slot already booked or not available' });
    }

    const booking = new Booking({ expertId, userName, userEmail, date, time, status: 'Confirmed' });
    await booking.save();

    io.emit('slot_booked', { expertId, date, time });
    res.status(201).json({ message: 'Booking Confirmed Successfully', booking });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    
    const bookings = await Booking.find({ userEmail: email })
      .populate('expertId', 'name expertise price')
      .sort({ createdAt: -1 });
      
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    
    res.json({ message: 'Status updated', booking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};