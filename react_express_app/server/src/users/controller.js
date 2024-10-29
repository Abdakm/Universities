const queries = require("./queries");
const pool = require("../../db/dbUsers");
const bcrypt = require("bcrypt");

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
  });
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const regex = /^\d+$/;
  if (regex.test(id)) {
    pool.query(queries.getUserById, [id], (err, result) => {
      if (err)
        return res.status(400).json({ message: "Please Try Again Later" });

      const noUserExists = !result.rows.length;
      if (noUserExists)
        return res.status(400).json({ message: "this user not exists !!!" });
      res.status(200).json(result.rows);
    });
  } else {
    res.status(400).json({ message: `Please Don't Touch The RUL !!!` });
  }
};

const addUser = (req, res) => {
  const { firstname, lastname, password, email, phone, university_name } =
    req.body;
  pool.query(queries.getUserByEmail, [email], async (err, result) => {
    // check if the email is exists
    const UserExists = result.rows.length;
    if (UserExists)
      return res.status(400).json({ message: "This email allrady exsits" });
    // check the information
    if (firstname && lastname && email && password) {
      // hash the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      //store in Database
      pool.query(
        queries.addUser,
        [firstname, lastname, hashPassword, email, phone, university_name],
        (err, result) => {
          if (err) throw err;
          res.status(201).json({ message: "your sign in successfully" });
        }
      );
    } else {
      return res
        .status(400)
        .json({ message: "ensure to enter your information" });
    }
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, password, email, phone, university_name } =
    req.body;
  pool.query(queries.getUserById, [id], (err, result) => {
    if (err) throw err;
    const noUserExists = !result.rows.length;
    if (noUserExists) {
      res.status(400).json({ message: "check your information" });
    } else if (firstname && lastname && email && password) {
      pool.query(
        queries.updateUser,
        [firstname, lastname, password, email, phone, university_name, id],
        (err, result) => {
          if (err) throw err;
          return res
            .status(201)
            .json({ message: "your information has been updated succussfuly" });
        }
      );
    } else {
      return res.status(400).json({ message: "your information is bad" });
    }
  });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserById, [id], (err, result) => {
    if (err) throw err;
    const noUserExists = !result.rows.length;
    if (noUserExists) {
      return res.status(400).json({ message: "check your information" });
    } else {
      pool.query(queries.deleteUser, [id], (err, result) => {
        if (err) throw err;
        return res
          .status(200)
          .json({ message: "the user has been deleted succussfuly" });
      });
    }
  });
};

const checkUser = (req, res) => {
  const { email, password } = req.body;
  pool.query(queries.getUserByEmail, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });
    // check if the email is exists
    const UserExists = result.rows.length;
    if (!UserExists)
      return res
        .status(400)
        .json({ message: "enter your right email and password please" });
    // check if that is the right user
    const hassingPassword = result.rows[0].password;
    bcrypt.compare(password, hassingPassword, (error, done) => {
      // check if there is no errors
      if (error)
        return res.status(500).json({ message: "Internal Server Error" });
      if (done !== true)
        return res.status(400).json({ message: "Check Your Information !!!" });
      if (req.session.isAuth)
        return res.status(400).json({ message: `you allready loged in` });

      // seccess log set some varibles in session
      req.session.isAuth = true;
      req.session.user = result.rows[0];
      req.session.sid = req.sessionID;
      // req.session.save();
      // send data to the front end
      res.status(200).json({
        message: "Success Login",
        user: req.session.user,
        isAuth: req.session.isAuth,
        // sid: req.sessionID,
      });
    });
  });
};

const logout = (req, res) => {
  res.send("logout");
  // req.session.destroy((err) => {
  //   if (err) {
  //     return res.status(500).json({ message: "Failed to destroy session" });
  //   }

  //   res.clearCookie("user_id", { path: "/" });

  //   res.status(200).json({ message: "Logout successful" });
  // });
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  checkUser,
  logout,
};
