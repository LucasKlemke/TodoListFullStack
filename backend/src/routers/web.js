import express from 'express';
import {getTasks, getTaskByID,deleteTaskByID, addTask, updateTaskFunction} from '../controller/taskController.js';

const { Router } = express;

const router = Router();

// router.get('/', (req, res) => res.send("teste"));
router.get('/',getTasks)
router.get('/:id', getTaskByID)

router.post('/',await addTask)

router.put('/:id', updateTaskFunction)

router.delete('/:id', deleteTaskByID)

export default router;

//5chamadas
//(USAR ENDPOINTS)

//CRUD
//getbyid
//getall
//update
//insert
//delete