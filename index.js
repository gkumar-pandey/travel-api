const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes");

const connectDb = require("./config/db");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(helmet());
connectDb();

const PORT = process.env.PORT || 3000;

app.use("/", routes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`);
});
