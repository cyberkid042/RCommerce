const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./auth/verifyToken");

const bcrypt = require("bcrypt");

const router = require("express").Router();

//Get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  // const { password, ...otherInfo } = user._doc;

  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find().sort({ _id: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get A User
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...otherInfo } = user._doc;

    res.status(200).json(otherInfo);
  } catch (error) {
    res.status(500).json("The requested user does not exist");
  }
});

//Get User stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update user info
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const salt = await bcrypt.genSalt(10);

  const hashedPass = await bcrypt.hash(req.body.password, salt);

  if (req.body.password) {
    req.body.password = hashedPass;
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    user
      ? res.status(200).json(user)
      : res
          .status(500)
          .json(
            "Something went wrong. Please check your credentials and try again!"
          );
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete User
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json("User deleted successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
