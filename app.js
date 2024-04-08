const express = require("express");
const open = require("open");
const app = express();
app.use(express.static("./public"));
app.listen(5000, async () => {
  console.log("running");
  await open("http://localhost:5000");
});
