const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

exports.isAuth = async (req, res, next) => {
  try {
    // 1) Try cookie-based auth (works when browser allows third-party cookies)
    let token = req.cookies?.token;

    // 2) Fallback: Authorization: Bearer <token> (works even if cookies are blocked)
    if (!token) {
      const auth = req.headers?.authorization || "";
      if (auth.startsWith("Bearer ")) token = auth.slice("Bearer ".length).trim();
    }

    if (!token) {
      return res.status(401).json({ message: "User not Authenticated !" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decode.id);

    if (!user) {
      return res.status(401).json({ message: "User not Found !" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Error while Authentication !", error });
  }
};

exports.isAdminAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.adminToken;
    if (!token) {
      const auth = req.headers?.authorization || "";
      if (auth.startsWith("Bearer ")) token = auth.slice("Bearer ".length).trim();
    }

    if (!token) {
      return res.status(401).json({ message: "User not Authenticated !" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decode.id);

    if (!user) {
      return res.status(401).json({ message: "User not Found !" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Error while Authentication !", error });
  }
};
