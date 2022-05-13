const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")
const commentCtrl = require('../controllers/comment.controllers')

// CRUD
router.post("/",auth , multer, commentCtrl.createComment);
router.get("/", commentCtrl.getAllComment)
router.get("/:id", commentCtrl.getOneComment)
router.put("/:id", commentCtrl.updateComment)
router.delete("/:id", auth, commentCtrl.deleteComment)
//router.post("/:id", commentCtrl.likeComment)

module.exports = router