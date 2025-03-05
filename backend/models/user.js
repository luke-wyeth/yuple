import mongoose from 'mongoose'  // Import mongoose
import bcrypt from 'bcryptjs'  // Import bcryptjs using ESM syntax

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String }, // Add this line
})

// Hash password before saving
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next()
//   this.password = await bcrypt.hash(this.password, 12)  // 12 salt rounds
//   next()
// })

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User  // Use export default for ESM
