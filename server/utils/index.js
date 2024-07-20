import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Function to establish a connection to the MongoDB database
export const dbConnection = async () => {
  try {
    // Connect to the MongoDB database using the connection URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB connection established");
  } catch (error) {
    console.error("DB Error:", error.message); // Log any errors that occur during connection
  }
};

// Function to create a JWT token and set it in a cookie
export const createJWT = (res, userId) => {
  // Create a JWT token with the user ID and secret from environment variables
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

  // Set the JWT token in a cookie with specific options
  res.cookie("token", token, {
    httpOnly: true, // Make the cookie HTTP-only for security
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Set the SameSite attribute to strict
    maxAge: 1 * 24 * 60 * 60 * 1000, // Set the cookie to expire in 1 day
  });
};
