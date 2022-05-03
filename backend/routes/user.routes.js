const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controllers");
const auth = require("../middleware/auth")


//  CRUD
router.post("/signup",  userCtrl.signup);
router.post("/login" , userCtrl.signin)
router.get ("/logout", userCtrl.logout)
router.get("/", userCtrl.getAllUsers)
router.get("/:id", userCtrl.getOneUser)
router.put("/:id" ,/* auth, */userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser)


module.exports = router;