const express = require('express');
const router = express.Router();
const { getExperts, getExpertById, seedExperts } = require('../controllers/expertController');

router.get('/experts', getExperts);
router.get('/experts/:id', getExpertById);
router.post('/seed', seedExperts);

module.exports = router;