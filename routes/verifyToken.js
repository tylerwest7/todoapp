const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    //const token = req.header('auth-token');
    const token = req.cookies['auth-token'];
    if(!token) return res.send(false)

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(error){
        res.state(400).send('Invalid Token');
    }
}