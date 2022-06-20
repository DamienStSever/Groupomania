const { Post, User, Comment, Like } = require("../models/")
const fs = require("fs")


// Mettre une publication
exports.createPost = (req, res) => {
    const newPost = {
        userId: req.body.userId,
        content: req.body.content,
        imageUrl: req.body.imageUrl

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
            {
                model: Comment, include: [
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
    const postObject = req.body;
    Post.findOne({ where: { id: req.params.id } })
        .then((Post) => {

            Post.update(postObject)
                .then(() => res.status(200).json({ message: 'Publication modifiée !' }))
                .catch(error => res.status(400).json({ error }));
            // });
        })
        .catch(err => res.status(400).send('ID unknown :' + req.params.id))
}

//supression d un post

exports.deletePost = (req, res, next) => {
    console.log(req.params.id);
    Post.findOne({ where: { id: req.params.id } })
        .then((Post) => {

            Post.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Profil supprimée !' }))
                .catch(error => res.status(400).json({ error }));
            //});
        })
        .catch(error => res.status(500).json({ error }));
}

// Possibilite de liker un post
exports.likePost = (req, res) => {
    Like.findOne({    
        where: {
            userId: req.body.userId,
            postId: req.body.postId
        }
    })
    
        .then(response => {
            // Si l'utilisateur n'a jamais liké ou disliké la publication
            if (response == null) {
                // S'il clique sur "like"
                if (req.body.likeValue == 1) {
                    Like.create({
                        userId: req.body.userId,
                        postId: req.body.postId,
                        liked: req.body.likeValue
                    });
                    
                    Post.increment(
                        { likes: 1 },
                        { where: { id: req.body.postId } }
                    );
                    res.status(201).json({ message: 'Like ajouté' })
                }

            }
        })
}

