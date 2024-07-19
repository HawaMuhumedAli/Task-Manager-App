import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './user.js'; 

// Adjust the path relative to createAdmin.js
async function createAdminUser() {
  try {
      const MONGODB_URI = 'mongodb+srv://teamcoders138:6bYnnCzpbq5aKtfV@cluster0.v8og5u3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

      await mongoose.connect(MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });

      const adminUser = await User.findOne({ email: 'admin@gmail.com' });

      if (adminUser) {
          console.log('Admin user already exists.');
          mongoose.connection.close();
          return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('adminuser', salt);

      const newAdminUser = new User({
          name: 'Admin',
          email: 'admin@gmail.com',
          password: hashedPassword,
          isAdmin: true,
          role: 'Admin',
          title: 'Admin',
          tasks: [], // Initialize with an empty array
      });

      await newAdminUser.save();

      console.log('Admin user created successfully.');

      // Generate JWT token
      const token = jwt.sign(
          { userId: newAdminUser._id, email: newAdminUser.email, isAdmin: newAdminUser.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: '1h' } // Adjust token expiration as needed
      );

      console.log('JWT Token:', token);

      mongoose.connection.close();
  } catch (error) {
      console.error('Error creating admin user:', error.message);
  }
}

createAdminUser();
