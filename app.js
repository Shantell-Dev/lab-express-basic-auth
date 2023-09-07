require("dotenv/config");

require("./db");

const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const session = require("express-session");
const connectMongo = require("connect-mongo")(session);

const app = express();

require("./config")(app);

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
  })
);

// default value for title local
const projectName = "lab-express-basic-auth";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRouter = require("./routes/auth.routes"); // <== has to be added
app.use("/", authRouter);
require("./error-handling")(app);

module.exports = app;
