const router = require("express").Router();
const { loadUsers, saveUsers } = require("../utils/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

router.post("/register", (req, res) => {
  const users = loadUsers();
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const token = jwt.sign({ username, email }, keys.jwtSecret);
  users.push({ username, email, password: hashedPassword, token });
  saveUsers(users);
  res.setHeader("auth-token", token);
  res.status(201).send({ status: "Account is created!", error: null });
});

router.post("/login", (req, res) => {
  const users = loadUsers();
  const token = req.header("auth-token");
  if (token) {
    try {
      jwt.verify(token, keys.jwtSecret);
      return res
        .status(200)
        .send({ status: "Success: Logged in", error: null });
    } catch (err) {
      return res.status(400).send({ status: "Failure", error: err.message });
    }
  }
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return req
      .status(404)
      .send({ status: "Failure", error: "Username does not exist!" });
  }
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (passwordMatch) {
    res.status(200).send({ status: "Success: Logged in!", error: null });
  } else {
    res.status(400).send({ status: "Failure", error: "Invalid credentials!" });
  }
});

module.exports = router;
