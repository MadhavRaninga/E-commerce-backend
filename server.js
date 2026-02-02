const express = require("express")
const { connectDB } = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")
const adminRoutes = require("./routes/adminRoutes")
const bootstrapRoutes = require("./routes/bootstrapRoutes")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://e-commerce-frontend-3cj.pages.dev",
        "e-commerce-admin-85v.pages.dev"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use("/api/user", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/bootstrap", bootstrapRoutes)

connectDB()
app.listen(process.env.PORT, () => {
    console.log(`Server is Working on : ${process.env.PORT}`);
})
