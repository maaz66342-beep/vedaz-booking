const Expert = require('../models/Expert');

exports.getExperts = async (req, res) => {
  try {
    const { search, expertise, page = 1, limit = 10 } = req.query;
    let query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (expertise) query.expertise = expertise;
    
    const experts = await Expert.find(query).limit(limit * 1).skip((page - 1) * limit);
    const count = await Expert.countDocuments(query);
    
    res.json({ experts, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) return res.status(404).json({ error: 'Expert not found' });
    res.json(expert);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.seedExperts = async (req, res) => {
  try {
    await Expert.deleteMany({});
    await Expert.insertMany([
      { name: "Dr. Sharma", expertise: "Cardiology", price: 500, rating: 4.8, slots: [{date:"2026-05-11", time:"10:00 AM", booked:false}, {date:"2026-05-11", time:"11:00 AM", booked:false}] },
      { name: "CA Mehta", expertise: "Taxation", price: 800, rating: 4.9, slots: [{date:"2026-05-12", time:"2:00 PM", booked:false}, {date:"2026-05-12", time:"3:00 PM", booked:false}] },
      { name: "Adv. Khan", expertise: "Legal", price: 1000, rating: 4.7, slots: [{date:"2026-05-13", time:"4:00 PM", booked:false}, {date:"2026-05-13", time:"5:00 PM", booked:false}] }
    ]);
    res.json({ message: 'Data seeded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Seeding failed' });
  }
};