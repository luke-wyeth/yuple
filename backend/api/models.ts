const mongoose = require("mongoose");

const SomeModelSchema = new mongoose.Schema({
    name: String,
    last_name: String
  });
const SomeModel = mongoose.model("SomeModel", SomeModelSchema);


async function createInstance() {

    // await SomeModel.create({ name: "also_awesome" });
}


module.exports = { createInstance, SomeModel }