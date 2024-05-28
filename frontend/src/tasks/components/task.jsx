import { useState } from "react";
import styles from "../styles/Tasks.module.css";
import PropTypes from 'prop-types'

Task.propTypes = {
  tasktitle: PropTypes.string,
  onRemove: PropTypes.func,
  onCheck: PropTypes.func,
  onEdit: PropTypes.func,
}

export default function Task({tasktitle, onRemove, onCheck, onEdit, task,setTasktitle}){


    return(
        <div className={task.ischecked == true ? (styles.taskcompleted) : styles.task}>
        <p className={task.ischecked == true ? (styles.done) : ("")}>{tasktitle}</p>
        <div>
          <button className={styles.buttonTask} onClick={onCheck}>{task.ischecked == true ? ('DONE') : ('DO')}</button>
          <button className={styles.buttonTask} onClick={onRemove}>DELETE</button>
          <button className={styles.buttonTask} id={tasktitle} onClick={(ev) => {
           onEdit(ev)
          }}>EDIT</button>
        </div>
      </div>
    )
} 