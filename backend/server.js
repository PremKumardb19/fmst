const express = require("express");
const cors = require("cors");
const initializeDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dropdownRoutes = require("./routes/dropDownRoutes");
const app = express();
app.use(cors());
app.use(express.json());

initializeDB().then((db) => {
  app.use("/auth", authRoutes(db));
  app.use("/api", dropdownRoutes(db));
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});