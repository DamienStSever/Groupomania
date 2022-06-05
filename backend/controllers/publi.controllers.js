const { Post, User, Comment } = require("../models/")
const fs = require("fs")


// Mettre une publication
exports.createPost = (req, res) => {
    const newPost = {
        userId: req.body.userId,
        content: req.body.content,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    Post.create(newPost)
        .then(() => res.status(200).json({ message: "Publication crée" }))
        .catch((error) => res.status(500).json({ error }))
}

// Voir les autres ppublication
exports.getAllPost = async (req, res) => {
    Post.findAll({
        include: [
            { model: User, as: 'User', attributes: ['pseudo'] },
            {model: Comment, include: [
                    { model: User, attributes: ['pseudo'] }
                ]
            }
        ],
        order: [["createdAt", "DESC"]],
    })
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            res.status(400).json({ error: error })
        })
};

//voir un post précis
exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(404).json({ error: error })
        });
}

// Modifier son post
exports.updatePost = (req, res, next) => {
    //console.log(req.body);
    const postObject = req.body;
    Post.findOne({ where: { id: req.params.id } })
        .then((Post) => {
             const filename = post.imageUrl.split('/images/')[1];
             fs.unlink(`images/${filename}`, () => {
                 const postObject = req.file ?
                     {
                         ...JSON.parse(req.body.post),
                         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                     } : { ...req.body };
            Post.update(postObject)
                .then(() => res.status(200).json({ message: 'Publication modifiée !' }))
                .catch(error => res.status(400).json({ error }));
            });
        })
    .catch(err => res.status(400).send('ID unknown :' + req.params.id))
}

//supression d un post

exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(post => {
             const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { 
            Post.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Publication supprimée !' }))
                .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
}

