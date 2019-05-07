const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = "cI538Y4NKxy2BK";

const hash = async(password) => {
    return await bcrypt.hash(password, 10);
}

const compare = async(password, hash) => {
    return await bcrypt.compare(password, hash);
}

const encode = (data) => {
    return jwt.sign(data, SECRET);
}

const verify = (token) => {
    return jwt.verify(token, SECRET);
}

const restrict = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        const data = verify(token);
            res.locals.user = data;
            next();
    } catch(e){
        console.log(e);
        res.status(401).send('Invalid Credentials');
    }
}

module.exports = { hash, compare, encode, verify, restrict };

