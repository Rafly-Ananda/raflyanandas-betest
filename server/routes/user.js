const router = require("express").Router();
const {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/jwtAuth");

router.post("/", verifyToken, createUser);
router.get("/", verifyToken, getAllUser);
router.get("/:id", verifyToken, getSingleUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
