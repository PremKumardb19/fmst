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

const getAccountTypes = async (req, res, db) => {
  try {
    const [result] = await db.execute("SELECT * FROM account_type ORDER BY id");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEmploymentType = async (req, res, db) => {
  try {
    const [result] = await db.execute("SELECT * FROM employment_type ORDER BY id");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getFacultyDetails = async (req, res, db) => {
  const userId = parseInt(req.params.userId);
  
  if (!userId) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  
  try {
    const [rows] = await db.execute(
      'SELECT * FROM facultydetails WHERE user_id = ?', 
      [userId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Faculty details not found' });
    }
    
    // Enrich the data with text values for foreign keys
    const enrichedData = await enrichFacultyData(rows[0],db);
    res.json(enrichedData);
    
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



// Helper function to enrich faculty data with text values
async function enrichFacultyData(facultyData,db) {
  const enrichedData = { ...facultyData };
  
  // Define foreign key relationships
  const foreignKeys = [
    { field: 'salutation_id', table: 'salutation', displayField: 'name' },
    { field: 'gender_id', table: 'gender', displayField: 'name' },
    { field: 'marital_status_id', table: 'maritalstatus', displayField: 'name' },
    { field: 'religion_id', table: 'religion', displayField: 'name' },
    { field: 'community_id', table: 'community', displayField: 'name' },
    { field: 'country_id', table: 'country', displayField: 'name' },
    { field: 'state_id', table: 'state', displayField: 'name' },
    { field: 'district_id', table: 'district', displayField: 'name' },
    { field: 'taluk_id', table: 'taluk', displayField: 'name' },
    { field: 'blood_group_id', table: 'bloodgroup', displayField: 'name' },
    { field: 'designation_id', table: 'designation', displayField: 'name' },
    { field: 'employment_type_id', table: 'employment_type', displayField: 'type_name' },
    { field: 'account_type_id', table: 'account_type', displayField: 'type_name' },
    // Add other foreign keys as needed
  ];
  
  // Process each foreign key
  for (const { field, table, displayField } of foreignKeys) {
    if (facultyData[field]) {
      try {
        const [rows] = await db.execute(
          `SELECT ${displayField} FROM ${table} WHERE id = ?`,
          [facultyData[field]]
        );
        
        if (rows.length > 0) {
          enrichedData[`${field}_text`] = rows[0][displayField];
        }
      } catch (error) {
        console.error(`Error enriching ${field}:`, error);
      }
    }
  }
  
  return enrichedData;
}


const createRelationship = async (req, res, db) => {
  const { user_id, name, relation, age, occupation, income } = req.body;
  console.log("Sending request:", JSON.stringify({ user_id, name, relation, age, occupation, income }));

  if (
    !user_id || 
    !name || 
    !relation || 
    age === undefined || 
    income === undefined || 
    !occupation
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  

  try {
    const [result] = await db.execute(
      'INSERT INTO relationship_details (user_id, name, relation, age, occupation, income) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, name, relation, age, occupation, income]
    );
    res.json({ message: 'Relationship added', id: result.insertId });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
};

const getRelationshipsByUserId = async (req, res, db) => {
  const user_id = parseInt(req.params.user_id);

  if (!user_id) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const [results] = await db.execute('SELECT * FROM relationship_details WHERE user_id = ?', [user_id]);
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateRelationship = async (req, res, db) => {
  const { id } = req.params;
  const { name, relation, age, occupation, income } = req.body;

  if (!id || !name || !relation || !age || !occupation || !income) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await db.execute(
      'UPDATE relationship_details SET name = ?, relation = ?, age = ?, occupation = ?, income = ? WHERE id = ?',
      [name, relation, age, occupation, income, id]
    );
    res.json({ message: 'Relationship updated' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteRelationship = async (req, res, db) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Invalid relationship ID' });
  }

  try {
    await db.execute('DELETE FROM relationship_details WHERE id = ?', [id]);
    res.json({ message: 'Relationship deleted' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
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
 getCommunity,
 getAccountTypes,
 getEmploymentType,
 getFacultyDetails,
 createRelationship,
 getRelationshipsByUserId,
 updateRelationship,
 deleteRelationship
};
