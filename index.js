const session = require('express-session');
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const port = 5000

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );


const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    // Check if the origin is allowed
    const allowedOrigins = ["http://localhost:3000", "https://medcoclient.web.app"];
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Return an error if the origin is not allowed
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Server is running! ${port}`);
});
