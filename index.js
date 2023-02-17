const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000;
const dbConn = require('./app/config/db');
dbConn();
const cors = require('cors');

app.use(express.static('public'));
app.use(express.json());
app.use(fileUpload());
app.use(cors());

const userRoutes = require('./app/routes/route.user');
const bannerRoutes = require('./app/routes/route.banner');
const authRoutes = require('./app/routes/route.auth');
const authorRoutes = require('./app/routes/route.author');
const categoryRoutes= require('./app/routes/route.category');
const bookRoutes = require('./app/routes/route.book');
const couponRoutes = require('./app/routes/route.coupon')
const cartRoutes = require('./app/routes/route.cart')

app.use('/api/v1', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/banner', bannerRoutes);
app.use('/api/v1/author', authorRoutes);
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/book',bookRoutes)
app.use('/api/v1/coupon',couponRoutes)
app.use('/api/v1/cart',cartRoutes)


const verifyJWT = require('./app/middlewares/verifyJWT');
// app.use(verifyJWT);

app.get('/api/v1/test', (req, res) => {
    res.send('Hello World!' + req.user);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
