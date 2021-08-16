const express = require("express");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send({ status: "successful", error: null });
});

app.use(express.static("public"));

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
