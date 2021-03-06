const { Comment, User  } = require("../models/")
const jwt = require('jsonwebtoken');

// Mettre un commentaire
exports.createComment = (req, res) => {
    if (req.file) {
        postObject.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename
            }`;
    }
    const newComment = {
        content: req.body.content,
        userId: req.body.userId,
        postId: req.params.id,
        imageUrl: req.body.imageUrl

    }
    Comment.create(newComment)
        .then(() => res.status(200).json({ message: "Commentaire crée" }))
        .catch((error) => res.status(500).json({ error }))
}

// Voir les autres commentaire
exports.getAllComment = async (req, res) => {
    Comment.findAll({
        include: [
            { model: User, as: 'User', attributes: ['pseudo'] },

        ],
        
        order: [["createdAt", "DESC"]],
    })
        .then((comments) => {
            res.status(200).json(comments)
        })
        .catch((error) => {
            res.status(400).json({ error: error })
        })
};

//voir un commentaire précis
exports.getCommentsForOnePost = (req, res, next) => {
    Comment.findAll({
        where: {
            postId: req.params.id,
            
        }
    })

        .then((comment) => {
            res.status(200).json(comment);
        })
        .catch((error) => {
            res.status(404).json({ error: error })
        });
}

// Modifier son commentaire
exports.updateComment = (req, res, next) => {
    const commentObject = req.body;
    Comment.findOne({ where: { id: req.params.id } })
        .then((Comment) => {
            
            Comment.update(commentObject)
                .then(() => res.status(200).json({ message: 'Publication modifiée !' }))
                .catch(error => res.status(400).json({ error }));
            //});
        })
    return res.status(400).send('ID unknown :' + req.params.id)
}

//supression d un commentaire

exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const admin = decodedToken.admin
    Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {;
        if(comment.userId !== req.auth.userId && admin == false ) {
            res.status(401).json({
                error: new Error("Requête non authorisé")        
            });
            
        } else{
        comment.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: 'Post supprimée !' }))
            .catch(error => res.status(400).json({ error }));
        }
    })
    .catch(error => res.status(500).json({ error }));
}



