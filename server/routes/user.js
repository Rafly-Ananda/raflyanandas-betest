const router = require("express").Router();
const {
  createUser,
  getAllUser,
  getUserByAccountNumber,
  getUserByIdentityNumber,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/jwtAuth");

router.post("/", verifyToken, createUser);
router.get("/", verifyToken, getAllUser);
router.get("/:id", verifyToken, getSingleUser);
router.get("/accountNumber/:id", verifyToken, getUserByAccountNumber);
router.get("/identityNumber/:id", verifyToken, getUserByIdentityNumber);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
