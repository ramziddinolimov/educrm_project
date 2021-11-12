const { sign, verify } = require("jsonwebtoken");

module.exports.createToken = function(data){
    return sign(data, process.env.JWT_SECRET);
}

module.exports.verifyToken = function(token){
    try{
        return verify(token, process.env.JWT_SECRET);
    }catch(error){
        return false;
    }
}