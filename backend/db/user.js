import UserModel from '../models/user.js'

async function fetchUserMeData() {
  let user = await UserModel.findOne({username: 'new+user'})
  console.log(user)
  return user
}

export { fetchUserMeData }  // Export the function using ESM syntax