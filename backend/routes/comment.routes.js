const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")
const commentCtrl = require('../controllers/comment.controllers')

// CRUD
router.post("/ofpost/:id",auth , multer, commentCtrl.createComment);
router.get("/", commentCtrl.getAllComment)
router.get("/ofpost/:id", commentCtrl.getCommentsForOnePost)
router.put("/:id",auth , commentCtrl.updateComment)
router.delete("/:id", auth, commentCtrl.deleteComment)


module.exports = router