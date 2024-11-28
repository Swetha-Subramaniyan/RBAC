const express = require("express");
const { welcomeMessage } = require("../controllers/admin.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authenticate);

router.use(authorize);

//METHOD : GET
//INPUT  : JWT Token 
//OUTPUT : Welcome Message
router.get("/dashboard", welcomeMessage);

module.exports = router;
