const { Router } = require("express");
const controller = require("./controller");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Users",
  password: "akmik",
  port: 5432,
});

const router = Router();

const checkSession = (req, res, next) => {
  if (req.cookies.user_id === undefined)
    return res.json({ message: "Session not found" });
  const cookies = req.cookies.user_id.split(".")[0].split(":")[1];
  const query = `SELECT * FROM userssession WHERE sid = $1 `;

  pool.query(query, [cookies], (err, result) => {
    if (err)
      return res.status(400).json({ message: err.message, isAuth: false });

    if (result.rows.length > 0) {
      const Data = result.rows[0].sess.sid;
      req.session.sid = Data;
      next();
    } else {
      return res
        .status(401)
        .json({ message: "Session not found", isAuth: false });
    }
  });
  next();
};

router.get("/", controller.getUsers);
router.get("/logout", checkSession, controller.logout);
router.get("/:id", controller.getUserById);
router.put("/:id", controller.updateUser);
router.post("/add", controller.addUser);
router.delete("/:id", controller.deleteUser);
router.post("/login", controller.checkUser);

module.exports = router;
