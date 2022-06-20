const { Comment, } = require("../models/")
const fs = require("fs")

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
            // { model: User, as: 'User', attributes: ['pseudo'] },


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
    console.log(req.body);
    const commentObject = req.body;
    Comment.findOne({ where: { id: req.params.id } })
        .then((Comment) => {
            /*  const filename = comment.imageUrl.split('/images/')[1];
             fs.unlink(`images/${filename}`, () => {
                 const commentObject = req.file ?
                     {
                         ...JSON.parse(req.body.comment),
                         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                     } : { ...req.body }; */
            Comment.update(commentObject)
                .then(() => res.status(200).json({ message: 'Publication modifiée !' }))
                .catch(error => res.status(400).json({ error }));
            //});
        })
    return res.status(400).send('ID unknown :' + req.params.id)
}

//supression d un commentaire

exports.deleteComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id } })
        .then(comment => {
            /* const filename = comment.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { */
            Comment.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Publication supprimée !' }))
                .catch(error => res.status(400).json({ error }));
            //});
        })
        .catch(error => res.status(500).json({ error }));
}



