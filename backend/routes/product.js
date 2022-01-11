const { verifyTokenAndAdmin } = require("./auth/verifyToken");
const Product = require("../models/Product");

const router = require("express").Router();

//Admin route to view all products
//Get all products
router.get("/products", verifyTokenAndAdmin, async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

//create products
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
  const product = new Product(req.body);

  try {
    const saveProduct = await product.save();

    res.status(200).json(saveProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update product
router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete Product
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json("Product deleted successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//guest and all access routes
router.get("/shopallproducts", async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;

  try {
    let products;

    if (queryNew) {
      products = await Product.find().limit(5);
    } else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/shop/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
