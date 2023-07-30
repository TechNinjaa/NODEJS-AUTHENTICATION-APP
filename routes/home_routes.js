const { Router } = require('express');
const homeController = require('../controllers/home_controllers');
const router = Router();

const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { initializingPassport, isAuthenticated } = require('../config/passport-local-strategy');
const googleOauth2 = require('../config/passport-google-oauth2-strategy');
const { check, validationResult } = require('express-validator'); // Corrected import

const { User } = require('../models/user');

// Initializing Passport Local Strategy
initializingPassport(passport);

// GET HOME PAGE ROUTE
router.get('/', homeController.get_home_page);

// GET AND POST SIGNUP ROUTES
router.get('/signup', homeController.get_signup);
router.post(
  '/signup',
  [
    check('username').isEmail().withMessage('Please enter a valid email'),
    check('password', 'Password length should be greater than 5').isLength({ min: 6 }), // Changed min length to 6
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must match');
      }
      return true;
    }),
  ],
  homeController.post_signup
);

// GET AND POST LOGIN ROUTES
router.get('/login', homeController.get_login);
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/', failureFlash: true }));

// GOOGLE AUTH ROUTES
router.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// EXPORTING THE ROUTER
module.exports = router;
