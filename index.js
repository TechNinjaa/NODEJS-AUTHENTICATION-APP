const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const flash = require('connect-flash');
const path = require('path');
const index_routes = require('./routes/home_routes');
const user_routes = require('./routes/user_routes');
const bcrypt = require('bcrypt');
const { connectMongoose } = require('./config/mongoose');
const ejs = require('ejs');
const { check, validationResult } = require('express-validator'); // Corrected import
const { User } = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { initializingPassport } = require('./config/passport-local-strategy');
const expressSession = require('express-session');
const { isAuthenticated } = require('./config/passport-local-strategy');
const { error } = require('console');
const googleOauth2 = require('./config/passport-google-oauth2-strategy');
require('dotenv').config();

// MIDDLEWARES
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(passport.initialize()); // Place this before passport.session()
app.use(passport.session());
app.set('view-engine', 'ejs');


// CALLING THE FUNCTIONS (Using async IIFE)
(async () => {
    await connectMongoose();
    await initializingPassport(passport);
})();

// GET LOGOUT

app.use(user_routes);
app.use(index_routes);

// APP LISTEN
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
