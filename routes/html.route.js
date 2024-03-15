const {postHtmlCode, getHtmlCode, getAllCodesHtml,getAllCodeByStatus} = require('../controllers/html.controller');
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer.js')

router.post('/postCode' ,upload.single('file'), postHtmlCode)
router.get('/getCode/:endPoint' , getHtmlCode);
router.get('/getAllCodes' , getAllCodesHtml);
router.get('/getCodeByStatus' , getAllCodeByStatus)
 
module.exports = router;

