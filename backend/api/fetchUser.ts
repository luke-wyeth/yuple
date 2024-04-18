const mongoose = require("mongoose");

const models = require('./models.ts')

async function findUser(userName) {
  let user = await models.SomeModel.findOne({ name: userName }, 'last_name');
  console.log(user)
  return user.last_name
}


module.exports = { findUser }