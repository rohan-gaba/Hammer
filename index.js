const express = require('express');
const app = express();
const multer = require('multer');
const port = 3000;
app.use(express.static("uploads"));
app.use(express.static("static"));
app.use(express.urlencoded({ "extended": true }));
app.use(express.json());
const upload = multer({ dest: 'uploads' });
const session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//initializing the routes
app.set('view engine', 'ejs');
var middlewares = require("./middlewares");
app.get('/', middlewares.homepage);
app.route("/login").get(middlewares.login_get).post(middlewares.login_post)
app.route('/signup').get(middlewares.signup_get).post(middlewares.signup_post);
app.get("/logout",middlewares.logout);
app.get("/admin",middlewares.admin);
app.post("/getproductinfo",middlewares.product_info);
app.post("/saveproductdetails", upload.single("path"),middlewares.save_products);
app.post("/getproducts",middlewares.get_product_post);
app.route("/changepass").get(middlewares.change_password_get).post(middlewares.change_password_post);
app.route("/forgot_password").get(middlewares.forgot_password_get).post(middlewares.forgot_password_post);
app.route("/forgot_password1").get( middlewares.forgot_password1_get);
app.post("/forgot_password1",middlewares.forgot_password1_post);
app.get("/verify_account/:token",middlewares.verify_account);
app.post("/addtocart",middlewares.addtocart);
app.get("/showcart",middlewares.showcart);
app.post("/change_quantity",middlewares.change_quantity)
app.get("/islog_in",middlewares.is_log_in);
app.post("/deletefromcart",middlewares.deletefromcart);
app.post("/remove_cart",middlewares.remove_cart);
app.get("/verify_mail",middlewares.verify_mail);
app.post("/edit_product",upload.single("path"),middlewares.edit_product);
app.post("/delete_product",middlewares.delete_product);
app.post("/save_address",middlewares.save_address);
app.get("/get_user_details",middlewares.get_user_details);
app.get("/orders",middlewares.orders);

app.listen(port,upload.single(""),function(){
    console.log("server is running at port no"+port);
})