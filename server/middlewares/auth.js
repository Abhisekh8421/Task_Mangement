import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const UserAuthentication = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, "ABHISEKH");
      const userInfo = await User.findById(decoded.userId);
      if (userInfo) {
        return res.status(200).json({
          success: true,
          userInfo,
        });
      }
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "User is Not Authenticated",
      });
    }
  }
};
