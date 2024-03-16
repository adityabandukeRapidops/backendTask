const jwt = require("jsonwebtoken");
const {
  unauthorizedResponse,
  serverErrorResponse,
} = require("../utils/response");

const userValidate = (req, res, next) => {
  try {
    // validate token
    console.log(req.headers)
    const bearerToken = req.headers.authorization
    const parts = bearerToken.split(' ');
    const authToken = parts[1];
    console.log(authToken)
    const data = jwt.decode(authToken);
    
   
    console.log(data , 'lkjl');
    if(!data){
        return unauthorizedResponse(res,"Access Denied");
    }

    console.log(data.uid);

    
    req.uid = data.uid;
    // console.log(userId , 'have got it')
    next();
  } catch (error) {
    console.log(`Error occured while user validation : ${error.message}`);
    return serverErrorResponse(res, error.message);
  }
};




module.exports = {
  userValidate,
 
};