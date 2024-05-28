const getAllTasks = 'SELECT * FROM tasks ORDER BY taskid'

const getOneTask = 'SELECT * FROM tasks WHERE taskid = $1'

const deleteTask = 'DELETE FROM tasks WHERE taskid = $1'

const takeMaxID = 'SELECT MAX(taskID) from tasks'

const checkTaskExistance = 'SELECT s FROM tasks s WHERE s.taskID = $1'
const addNewTask = 'INSERT INTO tasks (taskid, taskname, ischecked) VALUES ($1, $2, $3)'

const updateTask = 'UPDATE tasks SET taskname = $1, isChecked = $2 where taskid = $3'

export {getAllTasks, getOneTask, deleteTask,checkTaskExistance, addNewTask, takeMaxID, updateTask}

