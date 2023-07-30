# NODEJS-AUTHENTICATION-APP

This Authentication System is made with NODEJS.
It Authenticates User and Direct them to Homescreen/Index page.
You can use isAuthenticated function to Protect Routes against Unauthenticated Users.
I used Passport Google OAuth2.0 to login/signup using Google.
I also used passport local to Authentication Users using classic singnup and sign in way. 
I have used MongoDB as Database to store User Schema.


#Built With
🟠NODEJS 🟠ExpressJS 🟠MongoDB 🟠Mongoose 🟠EJS 🟠Google OAuth2.0 🟠Passport Local

✨Features
● Implemented the following for a user with respective html pages:

Sign up with email.
Sign in (you can redirect to a blank home page with a sign out and reset password button after sign in).
Log out.
Change Password after sign in.
The password stored in the db is encrypted.
Google Login (Social authentication).
● Added Server Side Validations for:

Sign Up Page
Shows alert to user when user tries to signup with email that is already used by other user.
Shows alert to user regarding password when:
User enter password which has length lesser than 5 character.
When password do not match in password and confirm password field.
Sign In Page
Shows alert to user when user tries to login with email which is not signed up.
Shows alert to user when user enters wrong password.


SCREENSHOTS
HOMEPAGE:
![Screenshot (3)](https://github.com/TechNinjaa/Music-Player-Project/assets/125077438/5c8dcfc6-f145-4aaf-bca3-49c148143775)

LOGIN PAGE:
![Screenshot (4)](https://github.com/TechNinjaa/Music-Player-Project/assets/125077438/58619ee8-82f6-4f14-909c-825d4cda99d7)

SIGNUP PAGE:
![Screenshot (5)](https://github.com/TechNinjaa/Music-Player-Project/assets/125077438/7324dcb2-dd68-4c93-83e5-b12fd0f00ab3)

MAIN PAGE:
![Screenshot (6)](https://github.com/TechNinjaa/Music-Player-Project/assets/125077438/880d9e0c-6f53-4eeb-9412-6b40c5667893)

