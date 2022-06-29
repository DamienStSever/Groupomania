const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const admin = decodedToken.admin
        req.auth = { userId: userId};
        if(req.body.userId && req.body.userId !== userId) {
          console.log(req.body.userId);
          console.log(admin);
           return res.status(403).json({ message: 'Requête non authorisé'});
        } else if (req.body.admin && req.body.admin !== admin) {
            return res.status(401).json ({message: "Vous n êtes pas Admin"})
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