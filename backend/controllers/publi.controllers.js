const { Post } = require ("../models/")
const fs = require("fs")

// Mettre une publication
exports.post = (req, res) => {
    const newPost = {
        content: req.body.content,
    }
    Post.create(newPost)
        .then(()=> res.status(200).json({message: "Publication crée"}))
        .catch ((error) => res.status(500).json({error}))
}

// Voir les autres ppublication
exports.getAllPost = async (req, res) => {
    Post.findAll({
        order: [["createdAt", "DESC"]],
    })
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            res.status(400).json({error: error})
        })
};

//voir un post précis
exports.getOnePost = (req,res, next) => {
    Post.findOne({where: {id:req.params.id}})
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(404).json({error: error})
        });
}

// Modifier son post
exports.updatePost = (req, res, next) => {
    console.log(req.body);
    const postObject = req.body;
    Post.findOne({ where:{id: req.params.id }})
        .then((Post) => {
           /*  const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                const postObject = req.file ?
                    {
                        ...JSON.parse(req.body.post),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    } : { ...req.body }; */
                Post.update(postObject)
                    .then(() => res.status(200).json({ message: 'Publication modifiée !' }))
                    .catch(error => res.status(400).json({ error }));
            //});
        }) 
  return res.status(400).send('ID unknown :' + req.params.id)
                }

//supression d un post

exports.deletePost = (req, res, next) => {
   Post.findOne({ where:{id: req.params.id }})
    .then(post => {
        /* const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => { */
            Post.destroy({ where: {id: req.params.id }})
                .then(() => res.status(200).json({ message: 'Publication supprimée !' }))
                .catch(error => res.status(400).json({ error }));
        //});
    })
    .catch(error => res.status(500).json({ error }));
  }


  //Liker un post
  exports.likePost= (req, res, next) => {
    Post.findOne({ where: {id: req.params.id }}).then((resultat) => {
        if (resultat.usersDisliked.indexOf(req.body.userId) == -1 && resultat.usersLiked.indexOf(req.body.userId) == -1) {
            if (req.body.like === 1) {
                Post.findOneAndUpdate({ where: {id: req.params.id }}, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
                    .then(() => res.status(200).json({ message: "Like ajouté !" }))
                    .catch((error) => res.status(400).json({ error }));
            }

            else if (req.body.like === -1) {
               Post.findOneAndUpdate({ where: {id: req.params.id }}, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
                    .then(() => res.status(200).json({ message: "Dislike ajouté !" }))
                    .catch((error) => res.status(400).json({ error }));
            }
        }
        if (resultat.usersLiked.includes(req.body.userId)) {
           Post.findOneAndUpdate({ where: {id: req.params.id }}, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
                .then(() => res.status(200).json({ message: "Like retiré !" }))
                .catch((error) => res.status(400).json({ error }));
        }
        else if (resultat.usersDisliked.includes(req.body.userId)) {
            Post.findOneAndUpdate({ where: {id: req.params.id }}, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
                .then(() => res.status(200).json({ message: "Dislike retiré !" }))
                .catch((error) => res.status(400).json({ error }));
        }
    })

};
