import UserModel from '../models/user.js'

async function fetchUserData(id) {
  let user = await UserModel.findById(id).select('-password')
  return user
}

export { fetchUserData }  // Export the function using ESM syntax
