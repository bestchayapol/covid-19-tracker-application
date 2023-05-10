const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const port = 6105;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  user: "lab_18ocvw",
  host: "server2.bsthun.com",
  password: "JMEwRDqcN0mB6b56",
  database: "lab_blank01_183bypx",
  port: "6105",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO Register (username, password, `confirm password`) VALUES (?,?,?)",
      [username, hash, hash],
      (err, result) => {
        console.log(err);
        console.log(result);
      }
    );

    db.query(
      "INSERT INTO `Sign-In` (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
        console.log(result);
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/account", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM `Sign-In` WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username or password combination" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      res.sendStatus(500); // Return a server error status code
    } else {
      res.clearCookie("userId"); // Clear the userId cookie
      res.sendStatus(200); // Return a success status code
    }
  });
});

app.post("/delete-account", (req, res) => {
  const username = req.session.user[0].username; // Assuming the username is stored in the session

  // Delete from Register table
  db.query("DELETE FROM Register WHERE username = ?", username, (err, result) => {
    if (err) {
      console.error("Error deleting account from Register table:", err);
      res.sendStatus(500); // Return a server error status code
      return;
    }
  });

  // Delete from Sign-In table
  db.query(
    "DELETE FROM `Sign-In` WHERE username = ?",
    username,
    (err, result) => {
      if (err) {
        console.error("Error deleting account from Sign-In table:", err);
        res.sendStatus(500); // Return a server error status code
        return;
      }
    }
  );

  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      res.sendStatus(500); // Return a server error status code
    } else {
      res.clearCookie("userId"); // Clear the userId cookie
      res.sendStatus(200); // Return a success status code
    }
  });
});

app.listen(port, () => {
  console.log("Running Server on Port ", port);
});
