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
  User.findOne({ _id: req.params.id})
  try {
    userModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio
        }
      },
      { new: true, upset: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err })
      }
    )
  } catch (err) {
    return res.status(500).json({ message: err })
  }
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

// Possibilite de suivre un profil
exports.follow = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
    return res.status(400).send('ID unknown :' + req.params.id)

  try {
    // rajout au followers
    userModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upset: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err)
      }
    );
    // Ajout de following
    userModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upset: true },
      (err, docs) => {
        if (err) return res.status(400).json(err)
      }
    )
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

//possibilite de ne plus suivre un profil
exports.unfollow = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnfollow))
    return res.status(400).send('ID unknown :' + req.params.id)

  try {
    // enlever au followers
    userModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upset: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err)
      }
    );
    // enlever de following
    userModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upset: true },
      (err, docs) => {
        if (err) return res.status(400).json(err)
      }
    )
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}
