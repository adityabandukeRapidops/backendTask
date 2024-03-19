const {userSignup , userSignin, getAllUsers,getUserById} = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.post('/signup' , userSignup)
router.post('/signin' , userSignin)
router.get('/getAllUsers' , getAllUsers)
router.get('/getUser/:id' , getUserById)

module.exports = router;

