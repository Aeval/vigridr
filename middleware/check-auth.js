const jwt = require('jsonwebtoken');
const keys = require('../keys.js');

module.exports = (req, res, next) => {
    try{
        const decoded = jwt.verify(req.body.token, keys);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed!'
        })
    }
    
};