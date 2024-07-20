import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Middleware to protect routes and verify the user is authenticated
const protectRoute = async (req, res, next) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.token;

    // If no token is found, return an unauthorized error
    if (!token) {
      return res.status(401).json({ status: false, message: "Not authorized, no token" });
    }

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the ID in the token payload and exclude the password field
    req.user = await User.findById(decoded.userId).select("-password");

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return an unauthorized error
    res.status(401).json({ status: false, message: "Not authorized, token failed" });
  }
};

// Middleware to check if the user is an admin
const isAdminRoute = (req, res, next) => {
  // Check if the user exists and has an admin role
  if (req.user && req.user.isAdmin) {
    // Proceed to the next middleware or route handler
    next();
  } else {
    // If the user is not an admin, return an unauthorized error
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try logging in as admin.",
    });
  }
};

export { protectRoute, isAdminRoute };
