const Html = require('../models/htmlCode')
const { getUserByQuery } = require('../repository/user.repo')
const {
    badRequestResponse,
    handle304,
    serverErrorResponse,
    successResponse,
    notFoundResponse,
} = require("../utils/response");

const cloudinary = require('../utils/cloudinary.js');
const { getHtmlbyquery, deleteHtmlById, updateHtmlById } = require('../repository/html.repo.js');


const postHtmlCode = async (req, res) => {
    try {
        const { uid } = req.query;
        console.log(uid)
        console.log(req.body , 'file is coming or not')
        const { title, subtext, code, endPoint, status } = req.body;
        console.log(req.file)
        // console.log(file)
        if (req.file) {
            const [err, user] = await getUserByQuery({ _id: uid });
            console.log(user, err);
            // console.log(file);
            console.log('coiming in')
            const filePath = req.file.path;

            cloudinary.uploader.upload(filePath, async (err, result) => {
                console.log('coming here')
                if (err) {
                    console.log('here is the error')
                    return res.status(500).json({ error: err.message, });
                }
                console.log(result.secure_url);
                const newHtml = await Html.create({
                    title,
                    subtext,
                    code,
                    uid,
                    endPoint,
                    status,
                    createdBy: user[0].name,
                    createdAt: Date.now(),
                    publishDate: "12/02/2000",
                    publishTime: "33:23",
                    file: result.secure_url,
                });
                res.status(201).json({ newHtml });
            });
        } else {

            console.log(req.body)
            const [err, user] = await getUserByQuery({ _id: uid });
            console.log(user, err);
            if (err) {
                return res.send('not a user');
            }



            // const encodedHtml = Buffer.from(code).toString('base64');
            const newHtml = new Html({
                title,
                subtext,
                code,
                uid,
                endPoint,
                status,
                createdBy: user[0].name,
                createdAt: Date.now(),
                publishDate: "12/02/2000",
                publishTime: "33:23"


            });
            console.log(newHtml)
            await newHtml.save();
            res.status(201).json(newHtml);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getHtmlCode = async (req, res) => {
    try {
        const { endPoint } = req.params;
        console.log(endPoint);
        const htmlData = await Html.findOne({ endPoint: endPoint });
        if (!htmlData) {
            return res.status(404).send('HTML code not found');
        }
        console.log(htmlData);
        console.log(htmlData.publishTime, 'publishTime');
        console.log(htmlData.publishDate, 'publishDate')
        const publishDate = htmlData.publishDate;
        const publishTime = htmlData.publishTime;
        const isValid = isPublishDateTimeValid(publishDate, publishTime);
        // console.log("Is publish date and time valid?", isValid);

        if(!isValid){
            return res.status(404).send('code is not deployed yet!! wait kar bhai')
        }

        
        res.status(200).send(htmlData.code);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const getAllCodesHtml = async (req, res) => {
    try {
        const codes = await Html.find();
        if (!codes) {
            return res.status(500).send('error')
        }
        res.send(codes);
    } catch (e) {
        res.status(500).send(e)
    }
}


const getAllCodeByStatus = async (req, res) => {
    try {
        const { status } = req.query;
        console.log(status);
        const codeofStatus = await Html.find({ status });
        res.send(codeofStatus)
    } catch (e) {
        res.status(500).send(e)
    }
}

const getHtmlByusercreatedItandStatus = async (req, res) => {
    try {
        const { status, user } = req.query;
        console.log(status, user);

        let query = {};
        if (status !== 'All' && user !== 'All') {
            query = { status: status, createdBy: user };
        } else if (status !== 'All') {
            query = { status: status };
        } else if (user !== 'All') {
            query = { createdBy: user };
        }
        console.log(query);
        console.log(user, 'gettting uid in by user')
        const [err, htmls] = await getHtmlbyquery(query);
        if (htmls.length <= 0) {
            return res.status(200).send([])
        }
        res.status(200).send(htmls);
    } catch (e) {
        res.status(500).send('some error in fetching user htmls')
    }
}

function isPublishDateTimeValid(publishDate, publishTime) {
    // Get the current date and time
    const currentDate = new Date();
    const currentTime = currentDate.getTime(); // Get current time in milliseconds since epoch

    // Parse publishDate and publishTime strings into Date objects
    const [day, month, year] = publishDate.split('-').map(Number);
    const [hours, minutes] = publishTime.split(':').map(Number);
    const publishDateTime = new Date(year, month - 1, day, hours, minutes); // Month is 0-indexed in Date constructor

    // Compare publishDateTime with current date and time
    return publishDateTime.getTime() < currentTime;
}


const deleteSelectedHtml = async (req,res)=>{
    try{
        const {id} = req.params;
        const [err , deleted] = await deleteHtmlById(id);
        if(err){
            return res.status(400).send('error in deleting html')
        }
        res.status(200).send('deleted success')
    }catch(e){
        res.status(400).send(e);
    }   
}

const updateSelectedHtml = async (req,res)=>{
    try{
        const {id} = req.params;
        const updatedHtml = await updateHtmlById(id,data);
        if(!updatedHtml){
            return res.status(400).send('failed to update')
        }
        res.staus(200).send('updated success');
    }catch(e){
        res.status(500).send('some error in updateing')
    }
}







module.exports = {
    postHtmlCode,
    getHtmlCode,
    getAllCodesHtml,
    getAllCodeByStatus,
    getHtmlByusercreatedItandStatus,
    deleteSelectedHtml,
    updateSelectedHtml
}