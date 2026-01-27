const express = require("express")
const { addProduct, getall, getbyId, updateProduct, deleteProduct } = require("../controllers/productController")
const { isAuth, isAdminAuth } = require("../middleware/isAuth")
const { isAdmin } = require("../middleware/isAdmin")
const upload = require("../middleware/cloudinary")
const router = express.Router()

router.post("/addProduct", isAdminAuth, isAdmin, upload.single("image"),  addProduct)

router.get("/getallProduct", getall)
router.get("/getbyId/:id", getbyId)

router.put("/updateProduct/:id", isAdminAuth, upload.single("image"), isAdmin, updateProduct)
router.delete("/deleteProduct/:id", isAdminAuth, isAdmin, deleteProduct)

module.exports = router