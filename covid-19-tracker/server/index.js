const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 6105;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "lab_18ocvw",
  host: "server2.bsthun.com",
  password: "JMEwRDqcN0mB6b56",
  database: "lab_blank01_183bypx",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  db.query(
    "INSERT INTO Register (username, password, confirm password) VALUES (?,?,?)",
    [username, password, confirmPassword],
    (err, result) => {
      console.log(err);
    }
  );
});

app.listen(port, () => {
  console.log("Running Server on Port ", port);
});
