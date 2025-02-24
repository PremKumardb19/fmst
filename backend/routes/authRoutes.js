const express = require("express");
const { registerUser, loginUser} =require('../controllers/AuthController')

function authRoutes(db) {
  const router = express.Router();
  router.post("/register", (req, res) => registerUser(req, res, db));
  router.post("/login", (req, res) => loginUser(req, res, db));
  return router;
}


module.exports = authRoutes;