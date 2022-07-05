const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const admin = decodedToken.admin
        console.log(admin);
        req.auth = { userId: userId};
        if((req.body.userId && req.body.userId !== userId) 
            && admin == false
             ) {
           return res.status(403).json({ message: 'Requête non authorisé'});
        } 
        else {
            next();
        }
    }
    catch(error) {
        console.log(error);
        res.status(401).json({ error: new Error('Requête invalide') })
    }
};