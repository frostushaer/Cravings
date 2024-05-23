import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if(err) {
                res.status(403).json({status: "error", message: "Invalid token"});
            } 

            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({status: "error", message: "You are not authenticated"});
    }
};

export const verifyTokenAndAuthorization = (req, res, next) => {   
    verifyToken(req, res, () => {
        if(req.user.userType === 'Admin' || req.user.userType === 'Vendor' || req.user.userType === 'Driver' || req.user.userType === 'Client') {
            next();
        } else {
            res.status(403).json({status: false, message: "You are not allowed to do that"});
        }
    });
};

export const verifyVendor = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.userType === 'Admin' || req.user.userType === 'Vendor') {
            next();
        } else {
            res.status(403).json({status: false, message: "You are not allowed to do that"});
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.userType === 'Admin') {
            next();
        } else {
            res.status(403).json({status: false, message: "You are not allowed to do that"});
        }
    });
};

export const verifyDriver = (req, res, next) => { 
    verifyToken(req, res, () => {
        if(req.user.userType === 'Driver') {
            next();
        } else {
            res.status(403).json({status: false, message: "You are not allowed to do that"});
        }
    });
};