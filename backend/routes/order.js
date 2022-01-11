const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./auth/verifyToken");

const router = require("express").Router();

//Get order stats

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const twoMonthsAgo = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: twoMonthsAgo } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

//create order
router.post("/create", verifyToken, async (req, res) => {
  const order = new Order(req.body);

  try {
    const storeOrder = await order.save();

    res.status(201).json(storeOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update Order
router.put("/:orederId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.orederId,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete Order
router.delete("/:orderId", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderId);

    res.status(200).json("Order has been successfully deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get User Orders
router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.params.userId });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all orders - admin access
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const allOrders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
