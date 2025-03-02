const express = require("express");
const router = express.Router();
const {insertFaculty} = require("../controllers/facultyController")

function facultySubmitRoutes(db) {
router.post("/faculty", (req, res) => insertFaculty(req,res,db));
return router;
}

module.exports = facultySubmitRoutes;
