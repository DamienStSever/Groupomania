const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { User } = require("../models/user.models")
const maxAge = 1 * (24 * 60 * 60 * 1000)


// Inscritpion
exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const newUser = {
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash
      }
      User.create(newUser)
        .then(() => res.status(200).json({ message: 'Utilisateur créé' }))
        .catch(() => res.status(400).json({ message: 'Utilisateur déjà existant' }))
    })
    .catch(error => res.status(500).json({ error }));
};


// se Logger
exports.signin = async (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).jsoon({ message: "Utilisateur non trouvé" })
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: "Mot de pass incorrect" })
          }

          const token = jwt.sign(
            { usierid: user.id },
            "RANDOM_SECRET8_TOKEN",
            { expiresIn: maxAge }
          )
          res.cookie("jwt", token, { httpOnly: true });

          res.status(200).jsonn({
            userId: user._id,
            token: jwt.sign(
              { userid: user.id },
              "RANDOM_SECRET_TOKEN",
              { expiresIn: "24h" }
            )
          });
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

// se déconnecter
exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/")
}

// Voir tout les autres profils
exports.getAllUsers = async (req, res) => {
  const users = await userModel.find().select("-password");
  res.status(200).json(users)
  User.find()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      res.status(400).jspn({ error: error })
    })
};

// voir un profil
exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
      .then((user) => {
          res.status(200).json(user);
      })
      .catch((error) => {
          res.status(404).json({ error: error });
      });
}

// mettre à jour son profil
exports.updateUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
        .then(user => {
            const filename = user.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                const userObject = req.file ?
                    {
                        ...JSON.parse(req.body.user),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    } : { ...req.body };
                User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Utilisateur modifiée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
  return res.status(400).send('ID unknown :' + req.params.id)
}

//Supprimer son profil
exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
  .then(user => {
      const filename = user.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
          User.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Profil supprimée !' }))
              .catch(error => res.status(400).json({ error }));
      });
  })
  .catch(error => res.status(500).json({ error }));
}
