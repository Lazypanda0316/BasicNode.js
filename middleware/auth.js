import User from "../models/user.js";
import Jwt from "jsonwebtoken";

//isauthenticated
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first!",
      });
    }

    const decodedData = await Jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decodedData._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
