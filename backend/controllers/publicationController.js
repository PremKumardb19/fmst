

const createPublication = (req, res,db) => {
  const data = req.body;
  const query = 'INSERT INTO publications SET ?';
  db.query(query, data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ id: result.insertId, ...data });
  });
};

const getAllPublications = (req, res,db) => {
  db.query('SELECT * FROM publications', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};

const getPublicationById = (req, res,db) => {
  db.query('SELECT * FROM publications WHERE publication_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Not Found');
    res.send(result[0]);
  });
};

const updatePublication = (req, res,db) => {
  const data = req.body;
  db.query('UPDATE publications SET ? WHERE publication_id = ?', [data, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ id: req.params.id, ...data });
  });
};

const deletePublication = (req, res,db) => {
  db.query('DELETE FROM publications WHERE publication_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Deleted', id: req.params.id });
  });
};

module.exports = {
  createPublication,
  getAllPublications,
  getPublicationById,
  updatePublication,
  deletePublication
};
