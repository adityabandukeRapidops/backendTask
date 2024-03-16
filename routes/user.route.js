const {userSignup , userSignin, getAllUsers} = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.post('/signup' , userSignup)
router.post('/signin' , userSignin)
router.get('/getAllUsers' , getAllUsers)

module.exports = router;

