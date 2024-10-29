const express = require("express");
const cors = require("cors");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cookieParser = require("cookie-parser");
const uuidv4 = require("uuid").v4;
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Users",
  password: "akmik",
  port: 5432,
});

const app = express();

// MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })); // cors
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    key: "user_id",
    secret: "secret test",
    saveUninitialized: false,
    resave: false,
    store: new pgSession({
      pool: pool, // Connection pool
      tableName: "userssession", // Use another table-name than the default "session" one
      pruneSessionInterval: false, // Disable automatic pruning
      pruneSessionInterval: 60 * 60 * 24, // Prune expired sessions every day
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // still week
      secure: false, // Set to true if using HTTPS
      sameSite: "lax",
      httpOnly: true,
    },
  })
);

// Handle session store errors
app.use((err, req, res, next) => {
  if (err) {
    console.error("Session store error:", err);
    res.status(500).send("Internal Server Error");
  } else {
    next();
  }
});

app.get("/session", (req, res) => {
  if (req.cookies.user_id === undefined)
    return res
      .status(401)
      .json({ message: "you are not log in !!", isAuth: false });

  const cookies = req.cookies.user_id.split(".")[0].split(":")[1];
  const query = `SELECT * FROM userssession WHERE sid = $1 `;

  pool.query(query, [cookies], (err, result) => {
    if (err) {
      return res.status(400).json({ message: err.message, isAuth: false });
    }
    if (result.rows.length > 0) {
      res.json({
        message: "Session Active",
        sessionData: result.rows[0].sess.user,
        isAuth: true,
      });
    }
  });
});

const universitiesRoutes = require("./src/universities/routes");
const usersRoutes = require("./src/users/routes");

app.use("/universities", universitiesRoutes);
app.use("/user", usersRoutes);

app.listen(PORT, () => {
  console.log("the server is on port " + 4000);
});
