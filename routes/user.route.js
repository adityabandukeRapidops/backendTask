const {userSignup , userSignin} = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.post('/signup' , userSignup)
router.post('/signin' , userSignin)

module.exports = router;

