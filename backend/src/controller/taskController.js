import pool from "../config/pg.js";
import {
  getAllTasks,
  getOneTask,
  deleteTask,
  takeMaxID,
  checkTaskExistance,
  addNewTask,
  updateTask,
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
  const { id } = req.params;

  pool.query(deleteTask, [id], (error, results) => {
    if (error) throw error;
    res.status(201).send("Task Deleted");
  });
};

const addTask = async (req, res) => {
  let { taskname } = req.body;
  if (
    taskname == null ||
    taskname == undefined ||
    taskname == " " ||
    taskname.length < 5 ||
    req.body == null ||
    req.body == undefined ||
    req.body == [""]
  ) {
    res.send("Invalid taskName");
  } else {
    let id;

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
          pool.query(
            addNewTask,
            [id, taskname, ischecked],
            (error, results) => {
              if (error) throw error;
              res.status(201).send({ id, taskname, ischecked });
            }
          );
        }
      });
    });
  }
};

const updateTaskFunction = (req, res) => {
  const { taskname, ischecked } = req.body;
  const { id } = req.params;

  if (
    taskname == null ||
    taskname == undefined ||
    taskname == " " ||
    taskname.length < 5 ||
    req.body == null ||
    req.body == undefined ||
    req.body == [""]
  ) {
    res.send("Invalid data");
  } else {
    pool.query(updateTask, [taskname, ischecked, id], (error, results) => {
      if (error) throw error;
      res.status(201).send({ id, taskname, ischecked });
    });
  }
};

export { getTasks, getTaskByID, deleteTaskByID, addTask, updateTaskFunction };

//CRUD

//getall
//getbyid
//update
//insert
//delete
