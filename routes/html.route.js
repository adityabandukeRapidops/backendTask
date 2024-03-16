const {postHtmlCode, getHtmlCode, getAllCodesHtml,getAllCodeByStatus,getHtmlByusercreatedItandStatus} = require('../controllers/html.controller');
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer.js');
const { userValidate } = require('../middlewares/authmiddleware.js');

router.post('/postCode' ,upload.single('file'), postHtmlCode)
router.get('/getCode/:endPoint' , getHtmlCode);
router.get('/getAllCodes' ,userValidate, getAllCodesHtml);
router.get('/getCodeByStatus' ,userValidate, getAllCodeByStatus)
router.get('/getHtmlbyfilter'  , getHtmlByusercreatedItandStatus)
 
module.exports = router;

