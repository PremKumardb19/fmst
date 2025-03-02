const db = require("../config/db");

// Get all Faculty Records
const getAllFaculty = async (req, res) => {
  try {
    const [result] = await db.execute("SELECT * FROM facultydetails ORDER BY id DESC");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Faculty by ID
const getFacultyById = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("SELECT * FROM facultydetails WHERE id = ?", [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Insert New Faculty Record
const insertFaculty = async (req, res,db) => {
  const {
    id,user_id, salutation_id, name, gender_id, marital_status_id, date_of_birth, age, father_name, mother_name,
    religion_id, community_id, caste, current_address, country_id, p_country_id, state_id, district_id,
    taluk_id, p_state_id, p_district_id, p_taluk_id, permanent_address, blood_group_id, designation_id,
    employment_type_id, employee_number, date_of_joining, date_of_retirement, anniversary_date, personal_email,
    official_email, personal_mobile, official_mobile, emergency_email, emergency_mobile, aadhar_no, pan_no,
    passport_no, account_no, account_type_id, bank_name, bank_address, ifsc, branch_code, micr
  } = req.body;


  try {
    const sql = `
INSERT INTO facultydetails 
(user_id, salutation_id, name, gender_id, marital_status_id, date_of_birth, age, father_name, mother_name,
 religion_id, community_id, caste, current_address, country_id, p_country_id, state_id, district_id, taluk_id,
 p_state_id, p_district_id, p_taluk_id, permanent_address, blood_group_id, designation_id, employment_type_id,
 employee_number, date_of_joining, date_of_retirement, anniversary_date, personal_email, official_email,
 personal_mobile, official_mobile, emergency_email, emergency_mobile, aadhar_no, pan_no, passport_no,
 account_no, account_type_id, bank_name, bank_address, ifsc, branch_code, micr)
VALUES 
(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

    `;
    
    const values = [
      user_id, salutation_id, name, gender_id, marital_status_id, date_of_birth, age, father_name, mother_name,
      religion_id, community_id, caste, current_address, country_id, p_country_id, state_id, district_id,
      taluk_id, p_state_id, p_district_id, p_taluk_id, permanent_address, blood_group_id, designation_id,
      employment_type_id, employee_number, date_of_joining, date_of_retirement, anniversary_date, personal_email,
      official_email, personal_mobile, official_mobile, emergency_email, emergency_mobile, aadhar_no, pan_no,
      passport_no, account_no, account_type_id, bank_name, bank_address, ifsc, branch_code, micr
    ];

    const [result] = await db.execute(sql, values);
    res.status(201).json({ message: "Faculty record added successfully", id: result.insertId });
  } catch (err) {
    console.error("Error inserting faculty record:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update Faculty Record
const updateFaculty = async (req, res) => {
  const { id } = req.params;
  const {
    salutation_id, name, gender_id, marital_status_id, date_of_birth, age, father_name, mother_name,
    religion_id, community_id, caste, current_address, country_id, p_country_id, state_id, district_id,
    taluk_id, p_state_id, p_district_id, p_taluk_id, permanent_address, blood_group_id, designation_id,
    employment_type_id, employee_number, date_of_joining, date_of_retirement, anniversary_date, personal_email,
    official_email, personal_mobile, official_mobile, emergency_email, emergency_mobile, aadhar_no, pan_no,
    passport_no, account_no, account_type_id, bank_name, bank_address, ifsc, branch_code, micr
  } = req.body;

  try {
    const sql = `
      UPDATE facultydetails SET
      salutation_id = ?, name = ?, gender_id = ?, marital_status_id = ?, date_of_birth = ?, age = ?, father_name = ?, mother_name = ?, 
      religion_id = ?, community_id = ?, caste = ?, current_address = ?, country_id = ?, p_country_id = ?, state_id = ?, district_id = ?, 
      taluk_id = ?, p_state_id = ?, p_district_id = ?, p_taluk_id = ?, permanent_address = ?, blood_group_id = ?, designation_id = ?, 
      employment_type_id = ?, employee_number = ?, date_of_joining = ?, date_of_retirement = ?, anniversary_date = ?, personal_email = ?, 
      official_email = ?, personal_mobile = ?, official_mobile = ?, emergency_email = ?, emergency_mobile = ?, aadhar_no = ?, pan_no = ?, 
      passport_no = ?, account_no = ?, account_type_id = ?, bank_name = ?, bank_address = ?, ifsc = ?, branch_code = ?, micr = ?
      WHERE id = ?
    `;

    const values = [
      salutation_id, name, gender_id, marital_status_id, date_of_birth, age, father_name, mother_name,
      religion_id, community_id, caste, current_address, country_id, p_country_id, state_id, district_id,
      taluk_id, p_state_id, p_district_id, p_taluk_id, permanent_address, blood_group_id, designation_id,
      employment_type_id, employee_number, date_of_joining, date_of_retirement, anniversary_date, personal_email,
      official_email, personal_mobile, official_mobile, emergency_email, emergency_mobile, aadhar_no, pan_no,
      passport_no, account_no, account_type_id, bank_name, bank_address, ifsc, branch_code, micr, id
    ];

    const [result] = await db.execute(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.json({ message: "Faculty details updated successfully" });
  } catch (err) {
    console.error("Error inserting faculty record:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete Faculty Record
const deleteFaculty = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM facultydetails WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.json({ message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllFaculty,
  getFacultyById,
  insertFaculty,
  updateFaculty,
  deleteFaculty
};
