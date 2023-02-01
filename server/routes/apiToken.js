const router = require("express").Router();
const { generateToken } = require("../controllers/apiTokenController");

router.get("/", generateToken);

module.exports = router;
