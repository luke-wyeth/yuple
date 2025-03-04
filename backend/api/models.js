import mongoose from 'mongoose'  // Import mongoose using ESM syntax

// Define SomeModel schema
const SomeModelSchema = new mongoose.Schema({
  name: String,
  last_name: String
})
const SomeModel = mongoose.model('SomeModel', SomeModelSchema)

// Define User schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

// Function to create an instance (as an example)
async function createInstance() {
  // await SomeModel.create({ name: "also_awesome" });
}

// Export the model and function
export { createInstance, SomeModel }  // Use named export for ESM
