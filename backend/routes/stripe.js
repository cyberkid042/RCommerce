const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post("/", async (req, res) => {
  await stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "cad",
    },
    (stripeError, stripeResponse) => {
      if (stripeError) {
        res.status(500).json(stripeError);
      } else {
        res.status(200).json(stripeResponse);
      }
    }
  );
});
module.exports = router;
