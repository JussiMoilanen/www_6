const express = require("express");
const router = express.Router();
const Item = require("../modules/item");
const { check, validationResult } = require("express-validator");

router.get("/items", function(req, res, next) {
  Item.find({}).exec(function(err, list_items) {
    if (err) {
      return next(err);
    }
    // Successful, so render
    res.render("items", { title: "Groceries", item_list: list_items });
  });
});

router.post(
  "/items",
  [
    // Post text validations
    check("item")
      .isLength({ min: 3, max: 12 })
      .withMessage("must be at least 3 chars long")
      .isAlphanumeric()
  ],
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    Item.create(req.body)
      .then(function(item) {
        res.send(item);
      })
      .catch();
    res.redirect("/api/items");
  }
);

router.delete("/items/:id", function(req, res, next) {
  console.log(req.body);
  Item.findByIdAndRemove({ _id: req.params.id }).then(function(item) {
    res.send(item);
  });
  res.redirect("/api/items");
});

module.exports = router;
