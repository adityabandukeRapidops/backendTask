const Html = require('../models/htmlCode')
const postHtmlCode = async (req,res)=>{
    try {
        const { code , endPoint} = req.body;
        // const encodedHtml = Buffer.from(code).toString('base64');
        const newHtml = new Html({
          code ,
          endPoint
          
        });
        await newHtml.save();
        res.status(201).json(newHtml);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const getHtmlCode = async (req, res) => {
    try {
        const { endPoint } = req.params;
        console.log(endPoint);
        const htmlData = await Html.findOne({ endPoint }); // Use findOne instead of find
        console.log(htmlData);
        if (!htmlData) {
            return res.status(404).send('HTML code not found');
        }
        res.status(200).send(htmlData.code);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};




module.exports = {
    postHtmlCode,
    getHtmlCode
}