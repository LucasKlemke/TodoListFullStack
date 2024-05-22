import express from 'express';

const { Router } = express;

const router = Router();

router.get('/ping', (req, res) => res.json({ pong: true }));

export default router;

//5chamadas
//(USAR ENDPOINTS)

//CRUD
//getbyid
//getall
//update
//insert
//delete