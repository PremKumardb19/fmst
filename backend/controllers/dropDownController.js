const db = require("../config/db");

// Get all Salutations
const getSalutations = async (req, res, db) => {
  try {
    const [result] = await db.execute("SELECT * FROM salutation ORDER BY id");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Genders
const getGenders = async (req, res, db) => {
  try {
    const [result] = await db.execute("SELECT * FROM gender ORDER BY id");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Marital Statuses
const getMaritalStatuses = async (req, res, db) => {
  try {
    const [result] = await db.execute("SELECT * FROM maritalstatus ORDER BY id");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Religions
const getReligion = async (req, res, db) => {
  try {
    const [result] = await db.execute("SELECT * FROM religion ORDER BY id");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Blood Groups
const getBloodGroup = async (req, res, db) => {
  try {
    const [result] = await db.execute("SELECT * FROM bloodgroup ORDER BY id");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Designations
const getDesignation = async (req, res, db) => {
  try {
    const [result] = await db.execute("SELECT * FROM designation ORDER BY id");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all States
const getStates = async (req, res, db) => {
  try {
    const [result] = await db.execute("SELECT id,name FROM State ORDER BY name");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDistricts = async (req, res, db) => {
  const { stateId } = req.params; 
  console.log(stateId);
  try {
    const [result] = await db.execute("SELECT id, name FROM District WHERE state_id = ? ORDER BY name", [stateId]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get Taluks by District
const getTaluks = async (req, res, db) => {
  const { districtId } = req.params;  // Use district_id instead of name
  try {
    const [result] = await db.execute("SELECT id, name FROM Taluk WHERE district_id = ? ORDER BY name", [districtId]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCommunity = async (req, res, db) => {
  try {
    const [result] = await db.execute("SELECT * FROM community ORDER BY id");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { 
  getSalutations, 
  getGenders, 
  getMaritalStatuses, 
  getReligion, 
  getBloodGroup, 
  getDesignation, 
  getStates, 
  getDistricts, 
  getTaluks,
 getCommunity 
};
