import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

// Define the schema for a user
const userSchema = new Schema(
  {
    // Name of the user, required field
    name: { type: String, required: true },

    // Title of the user, required field
    title: { type: String, required: true },

    // Role of the user, required field
    role: { type: String, required: true },

    // Email of the user, required field and must be unique
    email: { type: String, required: true, unique: true },

    // Password of the user, required field
    password: { type: String, required: true },

    // Admin status of the user, default is false
    isAdmin: { type: Boolean, required: true, default: false },

    // Array of task references associated with the user
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],

    // Active status of the user, default is true
    isActive: { type: Boolean, required: true, default: true },
  },
  { 
    // Automatically add `createdAt` and `updatedAt` timestamps
    timestamps: true 
  }
);

// Middleware to hash the password before saving the user document
userSchema.pre('save', async function(next) {
  // If the password is not modified, move to the next middleware
  if (!this.isModified('password')) {
    next();
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create a model for the User schema
const User = mongoose.model('User', userSchema);

export default User;
