// Require necessary modules and configurations
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { initializingPassport, isAuthenticated } = require('../config/passport-local-strategy');
const googleOauth2 = require('../config/passport-google-oauth2-strategy');
const { check, validationResult } = require('express-validator');
const { User } = require('../models/user');

// Render the login page with any flash error messages
module.exports.get_login = (req, res) => {
    const errors = req.flash('error') || [];
    res.render('login.ejs', { user: req.user, errors });
};

// Handle the POST request for user signup
module.exports.post_signup = async (req, res) => {
    // Extract user input data from the request body
    const displayName = req.body.displayName;
    const username = req.body.username.toLowerCase();
    const password = req.body.password;
    
    // Check if the username already exists in the database
    const user = await User.findOne({ username: username });
    if (user) {
        // If the username already exists, render the signup page with an error message
        return res.status(400).render('signup.ejs', {
            user: req.user,
            errorMessage: 'User Already Exists',
            oldInput: {
                displayName: req.body.displayName,
                username: req.body.username,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            },
            validationErrors: []
        });
    }

    // Perform validation on user input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If validation errors are present, render the signup page with appropriate error messages
        console.log(errors.array());
        return res.status(422).render('signup.ejs', {
            user: req.user,
            errorMessage: errors.array()[0].msg,
            oldInput: {
                displayName: req.body.displayName,
                username: req.body.username,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            },
            validationErrors: errors.array()
        });
    }

    // If user input is valid, create a new user object and save it to the database
    const newUser = new User({ displayName, username, password });
    newUser.save();
    console.log(newUser);
    
    // Redirect the user to the login page after successful signup
    res.redirect('/login');
};

// Render the signup page with empty fields and no error message
module.exports.get_signup = (req, res) => {
    res.render('signup.ejs', {
        user: req.user,
        errorMessage: null,
        oldInput: { displayName: "", username: "", password: "", confirmPassword: "" },
        validationErrors: []
    });
};

// Render the home page (index.ejs) with the user data (if authenticated)
module.exports.get_home_page = (req, res) => {
    res.render('index.ejs', { user: req.user });
};
