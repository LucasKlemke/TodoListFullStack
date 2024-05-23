import pool from "../config/pg.js";
import {
  getAllTasks,
  getOneTask,
  deleteTask,
  takeMaxID,
  checkTaskExistance,
  addNewTask,
} from "./taskQueries.js";
//importando conexao

//get tasks
const getTasks = (req, res) => {
  pool.query(getAllTasks, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getTaskByID = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(getOneTask, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const deleteTaskByID = (req, res) => {
  pool.query(deleteTask, [id], (error, results) => {
    if (error) throw error;
    res.status(201).send("Task Deleted");
  });
};

const addTask = async (req, res) => {
  let { taskname } = req.body;
  console.log(taskname);

  let id;

//   let newId = await pool.query(takeMaxID)
//   console.log(newId.rows[0].max)

//   if (newId.rows.length) {
//           id = 1;
//         } else {
//           id = results.rows[0].max + 1;
//         }
//         console.log(taskname)
//     let result = await pool.query(addNewTask,[newId, taskname, false])
//     console.log(result)

  pool.query(takeMaxID, (error, results) => {
    if (error) throw error;

    if (!results.rows.length) {
      id = 1;
    } else {
      id = results.rows[0].max + 1;
    }
    console.log(taskname);

    pool.query(checkTaskExistance, [id], (error, results) => {
      if (results.rows.length) {
        res.send("ID already exists");
      } else {
        console.log(taskname);

        let ischecked = false;
        pool.query(addNewTask, [id, taskname, ischecked], (error, results) => {
          if (error) throw error;
          res.status(201).send({id, taskname, ischecked});
        });
      }
    });
  });
};

export { getTasks, getTaskByID, deleteTaskByID, addTask };

//CRUD

//getall
//getbyid
//update
//insert
//delete
