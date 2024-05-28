import { useEffect, useRef, useState } from "react";
import styles from "./styles/Tasks.module.css";
import Task from "./components/task";
import Editform from "./components/editform";
import Createform from "./components/createform";
import axios from "axios";

async function connect() {
  try {
    let res = await axios.get("http://localhost:3000/tasks");

    const resposta = res.data;
    // console.log(resposta); // This will log once when the data is fetched

    return resposta;
  } catch (error) {
    console.log("erro", error);
    throw error;
  }
}

export default function index() {
  const [tasktitle, setTasktitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [idtoedit, setIdtoedit] = useState("");
  const jaFoi = useRef(false);

  useEffect(() => {
    if (!jaFoi.current) {
      jaFoi.current = true;
      connect().then((resposta) => {
        resposta.forEach((element) => {
          setTasks((state) => [...state, element]);
        });
      });
    }
  }, []);

  const handleSubmit =  async(ev) => {
    ev.preventDefault();
  
    if (tasktitle.length < 5 || tasktitle.length > 20) {
      alert('Task name is invalid');
    } else {
        let retorno = await axios.post("http://localhost:3000/tasks", { taskname: tasktitle });
        let objeto = await retorno.data
        console.log(objeto)
        setTasks((state) => [...state, objeto]);
        setTasktitle(""); 
    }
  };

  const removeTask = (taskid) => {
    axios.delete(`http://localhost:3000/tasks/${taskid}`);
    setTasks((state) => state.filter((tasks) => tasks.taskid !== taskid));
  };

  const checkTask = async (taskid) => {
    setTasks(async (state) =>
       state.map(async (task) => {
        if (task.taskid === taskid) {
          await axios.put(`http://localhost:3000/tasks/${taskid}`, {
            taskname: task.taskname,
            ischecked: !task.ischecked,
          });
          setTasks(tasks.map(task => task.taskid === taskid ? {...task, ischecked: !task.ischecked} : task));
          setTasktitle("");
        }
      })
    );
  };

  const editTask = (taskid,ev) => {
    setTasktitle(ev.target.id);
    setEdit(true);
    setIdtoedit(taskid);
  };


  const handleEditSubmit = (ev) => {
    ev.preventDefault();
    setTasks((state) =>
      state.map(async (task) =>
        {
          if(task.taskid == idtoedit){
            let retorno = await axios.put(`http://localhost:3000/tasks/${task.taskid}`, {taskname:tasktitle, ischecked:task.ischecked})
            let objeto = retorno.data
            console.log(objeto)
            setTasks(tasks.map(task => task.taskid === parseInt(objeto.id) ? {...task, taskname:tasktitle} : task)); // Update tasks with latest data
            setTasktitle(""); // Reset task title
          }
        }
      )
    );
    setEdit(false);
    setTasktitle("");
  };

  return (
    <>
      <h1 className={styles.todo}>to-do-list</h1>
      <div className={styles.divcontainer}>
        {edit === true ? (
          <Editform
            handleEditSubmit={handleEditSubmit}
            setTasktitle={setTasktitle}
            tasktitle={tasktitle}
            setEdit={setEdit}
          />
        ) : (
          <>
            <Createform
              handleSubmit={handleSubmit}
              tasktitle={tasktitle}
              setTasktitle={setTasktitle}
            />
            <h1 className={styles.title}>Tasks:</h1>
            <div className={styles.taskscontainer}>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <Task
                    key={task.taskid}
                    task={task}
                    tasktitle={task.taskname}
                    onRemove={() => removeTask(task.taskid)}
                    onCheck={() => checkTask(task.taskid)}
                    onEdit={(ev) => editTask(task.taskid,ev)}
                    setTasktitle={setTasktitle}
                  />
                ))
              ) : (
                <p className={styles.todo}>Try adding a new task...</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
