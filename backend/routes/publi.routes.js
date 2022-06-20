const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")
const publiCtrl = require('../controllers/publi.controllers')

// CRUD
router.post("/"/* ,auth */ , multer, publiCtrl.createPost);
router.get("/", publiCtrl.getAllPost)
router.get("/:id", publiCtrl.getOnePost)
router.put("/:id", /* auth , */publiCtrl.updatePost)
router.delete("/:id", /*  auth, */  publiCtrl.deletePost)
router.post("/:id/like",  auth,   publiCtrl.likePost );

module.exports = router