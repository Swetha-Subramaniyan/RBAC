const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const router = express.Router();


//METHOD : POST
//INPUT  : Username, Password, Email, Role
//OUTPUT : Username, Password, Role

router.post("/register", register);


//METHOD : POST
//INPUT  : Username, Password
//OUTPUT : Token, Id, Username, Role

router.post("/login", login);

module.exports = router;