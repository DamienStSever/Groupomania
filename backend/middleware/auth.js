const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const {jwt: token} = req.cookies;
      const decodedToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN');
      const userId = decodedToken.userId;

      if (req.body.userId && req.body.userId !== userId) {
        res.status(403).json({ message: 'Requête non autorisée' })
        throw 'Identification incorrect';
      } else {
        next();
      }
    }
  }
  catch {
    res.status(401).json({
      error: new Error('Requête non authentifié!')
    });
  }

};