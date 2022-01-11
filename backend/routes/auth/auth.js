const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

//Register User
router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);

  const hashedPass = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPass,
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error._message });
  }
});

//Login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET,
          { expiresIn: "3d" }
        );

        const { password, ...otherInfo } = user._doc;

        res.status(200).json({
          message: "Login Successful",
          user: {
            ...otherInfo,
            accessToken,
          },
        });
      } else {
        res.status(400).json({ error: "Password provided is invalid" });
      }
    } else {
      res.status(401).json({ error: "The requested user does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
