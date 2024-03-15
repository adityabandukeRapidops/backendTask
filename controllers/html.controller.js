const Html = require('../models/htmlCode')
const { getUserByQuery } = require('../repository/user.repo')
const {
    badRequestResponse,
    handle304,
    serverErrorResponse,
    successResponse,
    notFoundResponse,
} = require("../utils/response");

const cloudinary = require('../utils/cloudinary.js')


const postHtmlCode = async (req, res) => {
    try {
        const { uid } = req.query;
        const { title, subtext, code, endPoint, status, publishDate, publishTime } = req.body;
        console.log(req.file)
        // console.log(file)
        if (req.file) {
            // console.log(file);
            console.log('coiming in')
            const filePath = req.file.path;
            
            cloudinary.uploader.upload(filePath, async (err, result) => {
                console.log('coming here')
                if (err) {
                    console.log('here is the error')
                    return res.status(500).json({ error: err.message  , });
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
                    publishDate,
                    publishTime,
                    file: result.secure_url,
                });
                res.status(201).json({ newHtml });
            });
        } else {


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
                publishDate,
                publishTime


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
        const htmlData = await Html.findOne({ endPoint });
        console.log(htmlData);
        if (!htmlData) {
            return res.status(404).send('HTML code not found');
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




module.exports = {
    postHtmlCode,
    getHtmlCode,
    getAllCodesHtml,
    getAllCodeByStatus
}