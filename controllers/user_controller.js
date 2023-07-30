// Require necessary modules and User model
const { isAuthenticated } = require('../config/passport-local-strategy');
const { User } = require('../models/user');

// Render the 'changepassword.ejs' view with the user data and no errors
module.exports.get_changePassword = (req, res) => {
    res.render('changepassword.ejs', { user: req.user, errors: null });
};

// Handle the POST request for changing the user's password
module.exports.post_changePassword = async (req, res) => {
    const newPassword = req.body.password;
    let username;

    // Determine the username (or email) to identify the user
    if (!req.user.email) {
        username = req.user.username;
    } else {
        username = req.user.email;
    }

    // Find the user in the database based on the username (or email)
    const user = await User.findOne({ username: username });

    // Update the user's password with the new one
    user.password = newPassword;
    user.save();

    // Redirect the user to the home page after the password change
    res.redirect('/');
};

// Handle the GET request for user logout
module.exports.get_logout = async (req, res) => {
    // Perform logout using the 'req.logout()' method provided by Passport.js
    await req.logout(() => {
        // After logout, redirect the user to the home page
        res.redirect('/');
    });
};
