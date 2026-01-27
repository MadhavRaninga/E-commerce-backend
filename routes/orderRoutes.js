const express = require("express")
const { isAuth, isAdminAuth } = require("../middleware/isAuth")
const { order, getMyorders, updateOrderStatus, getOrderById } = require("../controllers/orderController")
const { isAdmin } = require("../middleware/isAdmin")
const router = express.Router()

router.post("/orderPlace", isAuth, order)
router.get("/getAllOrders", isAuth, getMyorders)
router.get("/getbyId/:id", isAuth, getOrderById)
router.put("/updateStatus/:id", isAdminAuth, isAdmin, updateOrderStatus)

module.exports = router