const bcrypt = require("bcrypt");

async function registerUser(req, res, db) {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    await db.execute(query, [name, email, hashedPassword]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function loginUser(req, res, db) {
  const { email, password } = req.body;
  try {
    const query = "SELECT * FROM users WHERE email = ?";
    const [users] = await db.execute(query, [email]);
    if (users.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { registerUser, loginUser };