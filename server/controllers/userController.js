const User = require("../models/User");
const { redisClient, cacheGetterSetter } = require("../lib/redis");

// Create
const createUser = async (req, res) => {
  const userPayload = req.body;
  const newUser = new User({
    userName: userPayload.userName,
    emailAddress: userPayload.emailAddress,
    accountNumber: userPayload.accountNumber,
    identityNumber: userPayload.identityNumber,
  });

  try {
    const savedUser = await newUser.save();
    redisClient.flushAll("ASYNC");
    res.status(201).json({
      succes: true,
      message: "User Created",
      result: savedUser,
    });
  } catch (e) {
    if (e.message.split()[0].includes("duplicate")) {
      const value = e.keyValue;
      res.status(500).json({
        success: false,
        message: `${Object.keys(value)} ${Object.values(
          value
        )} already used, try another.`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: `${e.message}.`,
      });
    }
  }
};

// Read All
const getAllUser = async (req, res) => {
  const uniqueCacheKey = `allUsers:accountNumber-${req.query.accountNumber}_identityNumber-${req.query.identityNumber}`;
  const cacheExpiry = 1800; // 30 min

  try {
    const users = await cacheGetterSetter(
      uniqueCacheKey,
      async () => {
        let result;

        if (req.query.accountNumber) {
          result = await User.findOne({
            accountNumber: req.query.accountNumber,
          });
        } else if (req.query.identityNumber) {
          result = await User.findOne({
            identityNumber: req.query.identityNumber,
          });
        } else {
          result = await User.find();
        }

        return result;
      },
      cacheExpiry
    );

    res.status(200).json({
      success: true,
      result: users,
    });
  } catch (e) {
    res.status(500).json({
      succes: false,
      message: `${e.message}.`,
    });
  }
};

// Read Single
const getSingleUser = async (req, res) => {
  const uniqueCacheKey = `user:id-${req.params.id}`;
  try {
    const users = await cacheGetterSetter(uniqueCacheKey, async () => {
      const result = await User.findById(req.params.id);
      return result;
    });

    res.status(200).json({
      succes: true,
      result: users,
    });
  } catch (e) {
    res.status(500).json({
      succes: false,
      message: `${e.message}.`,
    });
  }
};

// Update
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: false }
    );
    redisClient.flushAll("ASYNC");
    res.status(201).json({
      success: true,
      message: "User Updated",
      user: updatedUser,
    });
  } catch (e) {
    if (e.codeName === "DuplicateKey") {
      const value = e.keyValue;
      return res.status(500).json({
        succes: false,
        message: `${Object.keys(value)} ${Object.values(
          value
        )} already used, try another.`,
      });
    } else {
      res.status(500).json({
        succes: false,
        message: `${e.message}.`,
      });
    }
  }
};

// Delete
const deleteUser = async (req, res) => {
  try {
    const response = await User.findByIdAndDelete(req.params.id);
    redisClient.flushAll("ASYNC");
    res.status(200).json({
      succes: true,
      message: `User Deleted`,
      user: response,
    });
  } catch (e) {
    res.status(500).json({
      succes: false,
      message: `${e.message}.`,
    });
  }
};

module.exports = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
