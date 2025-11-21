const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  getMe,
  logout
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();


const passport = require('passport');

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/login',
    session: false 
  }),
  (req, res) => {
    try {
      // Generate JWT token
      const token = req.user.getSignedJwtToken();
      // For testing, you can send the token as JSON
      res.json({
        success: true,
        token: token,
        user: {
          id: req.user._id,
          name: req.user.fullname,
          email: req.user.email
        }
      });
    } catch (error) {
      console.error('Error in Google callback:', error);
      res.redirect('/login?error=auth_failed');
    }
  }
);

// Public routes
router.post(
  '/register',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
    body('fullname', 'Please include a name').not().isEmpty()
  ],
  register
);

router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  login
);

// Protected routes
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);

module.exports = router;