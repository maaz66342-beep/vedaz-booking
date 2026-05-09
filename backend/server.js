const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MONGO ATLAS STRING YAHAN DALNA HAI
mongoose.connect('PASTE_YOUR_ATLAS_STRING_HERE/vedaz')
.then(() => console.log('MongoDB Atlas connected ✅'))
.catch(err => console.log('MongoDB Error:', err));

// Expert Schema
const expertSchema = new mongoose.Schema({
  name: String,
  expertise: String,
  price: Number,
  rating: Number,
  availability: [String]
});
const Expert = mongoose.model('Expert', expertSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
  expertId: String,
  expertName: String,
  userName: String,
  userEmail: String,
  slot: String,
  date: { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);

// GET all experts - Frontend yahi call karta hai
app.get('/api/experts', async (req, res) => {
  try {
    const experts = await Expert.find();
    res.json(experts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST booking
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
    res.json({ reply: "VEDAZ Booking Backend Online" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`VEDAZ Backend running on http://localhost:${PORT}`));
