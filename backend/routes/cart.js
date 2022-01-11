const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./auth/verifyToken");
const Cart = require("../models/Cart");

const router = require("express").Router();

//create new cart
router.post("/create", verifyToken, async (req, res) => {
  // const newCart = new Cart(req.body)

  try {
    const cart = await new Cart(req.body).save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete cart
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json("Cart Item deleted successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get User Cart
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.params.userId });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all Cart - admin access
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const cartData = await Cart.find().sort({ createdAt: -1 });

    res.status(200).json(cartData);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
