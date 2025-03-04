const express = require('express');
const router = express.Router();
const {
  createPublication,
  getAllPublications,
  getPublicationById,
  updatePublication,
  deletePublication
} = require('../controllers/publicationController');

function publicationRoutes(db){
    router.post('/',(req,res)=> createPublication(req,res,db));
    router.get('/', (req, res) => {
        console.log('GET /publications hit');
        getAllPublications(req, res, db);
      });
    router.get('/:id',(req,res)=>  getPublicationById(req,res,db));
    router.put('/:id',(req,res)=>  updatePublication(req,res,db));
    router.delete('/:id', (req,res)=> deletePublication(req,res,db));
    return router;
}

module.exports=publicationRoutes



