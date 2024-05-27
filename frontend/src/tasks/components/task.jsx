import { useState } from "react";
import styles from "../styles/Tasks.module.css";
import PropTypes from 'prop-types'

Task.propTypes = {
  tasktitle: PropTypes.string,
  onRemove: PropTypes.func,
  onCheck: PropTypes.func,
  onEdit: PropTypes.func,
}

export default function Task({tasktitle, onRemove, onCheck, onEdit, task}){


    return(
        <div className={task.isChecked == true ? (styles.taskcompleted) : styles.task}>
        <p className={task.isChecked == true ? (styles.done) : ("")}>{tasktitle}</p>
        <div>
          <button className={styles.buttonTask} onClick={onCheck}>{task.isChecked == true ? ('DONE') : ('DO')}</button>
          <button className={styles.buttonTask} onClick={onRemove}>DELETE</button>
          <button className={styles.buttonTask} onClick={onEdit}>EDIT</button>
        </div>
      </div>
    )
} 