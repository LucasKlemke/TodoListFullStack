import { useState } from "react";
import styles from "./styles/Tasks.module.css";
import Task from "./components/task";
import Editform from "./components/editform";
import Createform from "./components/createform";

export default function index() {

  const [tasktitle, setTasktitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [idtoedit, setIdtoedit] = useState("");


  const handleSubmit = (ev) => {
    ev.preventDefault();

    const newTask = {
      taskid: tasks.length + 1,
      tasktitle: tasktitle,
      isChecked: false,
    };

    setTasks((state) => [...state, newTask]);
    setTasktitle("");
  };

  const removeTask = (taskid) => {
    setTasks((state) => state.filter((tasks) => tasks.taskid !== taskid));
  };

  const checkTask = (taskid) => {
    setTasks((state) =>
      state.map((task) =>
        task.taskid == taskid ? { ...task, isChecked: !task.isChecked } : task
      )
    );
    console.log(tasks);
  };

  const editTask = (taskid) => {
    setTasktitle("");
    setEdit(true);
    setIdtoedit(taskid);
  };

  const handleEditSubmit = (ev) => {
    ev.preventDefault();
    setTasks((state) =>
      state.map((task) =>
        task.taskid == idtoedit ? { ...task, tasktitle: tasktitle } : task
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
                    tasktitle={task.tasktitle}
                    onRemove={() => removeTask(task.taskid)}
                    onCheck={() => checkTask(task.taskid)}
                    onEdit={() => editTask(task.taskid)}
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
