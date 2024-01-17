const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

const connectDb = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
connectDb();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json("Hello express");
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`);
});
