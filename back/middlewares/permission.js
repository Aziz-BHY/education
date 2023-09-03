var jwt = require("jsonwebtoken");


const verfiyPermission = (req, res, next, roles) => {
    try{
        jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.status("401").json("user not authenticated");
                return;
            }
            if(roles.length != 0){
                if(roles.indexOf(decoded.role) === -1){
                    res.status("401").json("user not authorized");
                    return;
                }
            }
            req.body = {...req.body, userdata: decoded}
            next();
        })
    }
    catch(err){
        res.status("401").json("user not authenticated");
    }
    
}

module.exports = {
    verfiyPermission
}