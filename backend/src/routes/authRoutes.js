const express = require('express');
const { login, signup } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

// Rruga e mbrojtur
router.get('/protected-route', protect, (req, res) => {
  res.status(200).json({ success: true, message: 'You are authorized!', user: req.user });
});



module.exports = router;
