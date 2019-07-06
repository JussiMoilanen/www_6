const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
  item: String
});

const Item = mongoose.model("item", ItemsSchema);

module.exports = Item;
