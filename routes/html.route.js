const {postHtmlCode, getHtmlCode, getAllCodesHtml,getAllCodeByStatus,getHtmlByusercreatedItandStatus , deleteSelectedHtml ,updateFewHtmlFields ,getHtmlById ,updateHtml} = require('../controllers/html.controller');
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer.js');
const { userValidate } = require('../middlewares/authmiddleware.js');

router.post('/postCode' ,upload.single('file'), postHtmlCode)
router.get('/getCode/:endPoint' , getHtmlCode);
router.get('/getAllCodes' ,userValidate, getAllCodesHtml);
router.get('/getCodeByStatus' ,userValidate, getAllCodeByStatus);
router.get('/getHtmlbyfilter'  , getHtmlByusercreatedItandStatus);
router.delete('/deleteHtml/:id' , deleteSelectedHtml);
router.patch('/updateHtml/:id' , updateFewHtmlFields)
router.patch('/updateHtmlFull/:id' ,upload.single('file'), updateHtml)
router.get('/HtmlbyId/:id' , getHtmlById )
 
module.exports = router;

