const express = require("express");
const router = express.Router();
const publiCtrl = require('../controllers/publi.controllers')

// CRUD
router.post("/publi", publiCtrl.post);
router.get("/publi", publiCtrl.getAllPost)
router.get("/publi/:id", publiCtrl.getOnePost)
router.put("/publi/:id", publiCtrl.updatePost)
router.delete("/publi/:id", publiCtrl.deletePost)
router.post("/publi/:id", publiCtrl.likePost)

module.exports = router