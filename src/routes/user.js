const router = require('express').Router();
const { userController, tokenController } = require('../controllers');
// Your User model should have an active attribute that is false by default
// When the user submits a valid signup form, create a new User (who's active will be false initially)
// Create a long random string (128 characters is usually good) with a crypto library and store it in your database with a reference to the User ID
// Send an email to the supplied email address with the hash as part of a link pointing back to a route on your server
// When a user clicks the link and hits your route, check for the hash passed in the URL
// If the hash exists in the database, get the related user and set their active property to true
// Delete the hash from the database, it is no longer needed
router.post('/signup', userController.signUp, tokenController.signUp);

router.get('/verify/:userId/:token', userController.verify);

module.exports = router;
