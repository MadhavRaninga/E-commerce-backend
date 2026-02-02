const express = require("express")
const { registration, login, getUserProfile, forgotPassword, verifyOtp, resetPassword, resendOtp } = require("../controllers/userController")
const { isAuth } = require("../middleware/isAuth")
const router = express.Router()

router.post("/registration", registration)
router.post("/login", login)
router.get("/profile", isAuth, getUserProfile)
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(0),
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});
router.post("/sendOtp", forgotPassword)
router.post("/verify", verifyOtp)
router.post("/resetpassword", resetPassword)
router.post("/resendotp", resendOtp)
module.exports = router