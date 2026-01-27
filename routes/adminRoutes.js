const express = require("express");
const { isAdminAuth } = require("../middleware/isAuth");
const { isAdmin } = require("../middleware/isAdmin");
const {
  adminLogin,
  getAdminStats,
  getAllUsers,
  updateUserByAdmin,
  getAllOrdersAdmin,
} = require("../controllers/adminController");

const router = express.Router();

// Auth
router.post("/login", adminLogin);

// Protected admin APIs
router.get("/stats", isAdminAuth, isAdmin, getAdminStats);
router.get("/users", isAdminAuth, isAdmin, getAllUsers);
router.put("/users/:id", isAdminAuth, isAdmin, updateUserByAdmin);
router.get("/orders", isAdminAuth, isAdmin, getAllOrdersAdmin);

module.exports = router;

