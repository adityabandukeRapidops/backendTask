const Html = require('../models/htmlCode.js')

const getHtmlbyquery = async (query) => {
    try {
      console.log(query , 'lkjljlkj')

      console.log('coming in this ')
      let html = await Html.find(query);

      console.log(html , 'why');
      return [null, html];
    } catch (err) {
      let errObj = {
        code: 500,
  
        message: `Internal Server Error: ${err.message}`,
      };
      return [errObj, null];
    }
  };

  const updateHtmlById = async (id,data)=>{
    try{
      const updatedHtmlItem = await Html.findByIdAndUpdate(id, data, { new: true });
      if(!updatedHtmlItem){
        return null;  
      }
      return [null , updatedHtmlItem]
    }catch(e){
      return [e , null];
    }
  }

  module.exports = {
    getHtmlbyquery,
    updateHtmlById
  }