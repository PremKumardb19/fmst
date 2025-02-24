const express = require("express");
const router = express.Router();
const { getSalutations, getGenders, getMaritalStatuses,getReligion,getBloodGroup,getDesignation,getStates,getDistricts,getTaluks,getCommunity} = require("../controllers/dropDownController");

function dropDownRoutes(db) {
  router.get("/salutations", (req, res) => getSalutations(req,res,db));
  router.get("/genders",(req, res) => getGenders(req,res,db));
  router.get("/marital-statuses", (req, res) =>getMaritalStatuses(req,res,db));
  router.get("/religion", (req, res) =>getReligion(req,res,db));
  router.get("/community", (req, res) =>getCommunity(req,res,db));
  router.get("/blood-groups", (req, res) =>getBloodGroup(req,res,db));
  router.get("/designation", (req, res) =>getDesignation(req,res,db));
  router.get("/states",(req, res) =>getStates(req,res,db));
router.get("/districts/:stateId", (req, res) =>getDistricts(req,res,db));
router.get("/taluks/:districtId",(req, res) =>getTaluks(req,res,db));
  return router;
}

module.exports = dropDownRoutes;
