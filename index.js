const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/user", (req, res) => {
  res.render("userSearch");
});

app.get("/userDetails/:id", async (req, res) => {
  try {
    const username = req.params.id;
    const userUrl = `https://api.github.com/users/${username}`;
    const repoUrl = `https://api.github.com/users/${username}/repos`;

    console.log("user response ke pajhle");
    const userResponse = await axios.get(userUrl);
    console.log("user response ke pajhle 2");
    const repoResponse = await axios.get(repoUrl);
    console.log("repo response ke baad");

    if (!userResponse) {
      res.send("no user response");
    } else if (!repoResponse) {
      res.send("no repo response");
    }
    const user = userResponse.data;
    const repo = repoResponse.data;
    res.render("userDetails", { user, repo });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`listening at PORT ${PORT}`);
});
