require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");

//Middleware
const { checkForSession } = require("./middlewares/checkForSession");

//Controllers
const swag_controller = require("./controllers/swag_controller");
const auth_controller = require("./controllers/auth_controller");
const cart_controller = require("./controllers/cart_controller");
const search_controller = require("./controllers/search_controller");

const app = express();

app.use(json());
app.use(
  session({
    //below secret  is set up in the .env file
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

//Testing connection
// app.get("/api/test", (req, res) => {
//   res.status(200).send("howdy partner!!");
// });

//Swag
app.get("/api/swag", swag_controller.read);

// Auth
app.post("/api/login", auth_controller.login);
app.post("/api/register", auth_controller.register);
app.post("/api/signout", auth_controller.signout);
app.get("/api/user", auth_controller.getUser);

// Cart
app.post("/api/cart", cart_controller.add);
app.post("/api/cart/checkout", cart_controller.checkout);
app.delete("/api/cart", cart_controller.delete);

const port = 3000;
app.listen(port, () => console.log(`Listening on the ${port}`));
