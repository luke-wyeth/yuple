import mongoose from 'mongoose'  // Import mongoose using ESM syntax
import * as models from '../models.js'  // Import all exported models from 'models.js' using ESM syntax

async function fetchLastName(userName) {
  let user = await models.SomeModel.findOne({ name: userName }, 'last_name')
  console.log(user)
  return user.last_name
}

export { fetchLastName }  // Export the function using ESM syntax
