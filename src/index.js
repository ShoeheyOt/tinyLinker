import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import loginRoute from "./routes/login.route.js";
import registerRoute from "./routes/register.route.js";
import urlsRoute from "./routes/urls.route.js";
import logoutRoute from "./routes/logout.route.js";
import initialRoute from "./routes/initial.route.js";

const app = express();

const rootDir = path.join(process.cwd());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET_SESSION_KEY,
    cookie: {},
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      dbName: process.env.MONGODB_DB_NAME,
    }),
  })
);
app.use(express.static(path.join(rootDir, "public")));

app.set("views", path.join(rootDir, "src/views"));
app.set("view engine", "ejs");

app.use("/", initialRoute);

app.use("/login", loginRoute);

app.use("/register", registerRoute);

app.use("/urls", urlsRoute);

app.use("/logout", logoutRoute);

//fallback
app.use((req, res) => {
  res
    .status(404)
    .render("error", { title: "Not found", message: "no page exist" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
