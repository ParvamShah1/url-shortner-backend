const { getUser } = require("../service/auth"); // Changed from frontend to backend service

async function isAuth(req, res, next) {
  try {
    const token = req.cookies?.token;

    console.log("Auth middleware - Token:", token ? "exists" : "missing");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      });
    }

    const user = getUser(token);

    console.log("Auth middleware - User:", user ? user.email : "invalid");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please login again.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
}

module.exports = { isAuth };