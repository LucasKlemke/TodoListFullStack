import styles from "../styles/Tasks.module.css";

export default function Editform({setEdit, handleEditSubmit, tasktitle, setTasktitle}) {
  return (
    <>
      <div className={styles.flex}>
        <h1 className={styles.title}>Edit Task</h1>
        <button className={styles.buttonclose} onClick={() => setEdit(false)}>
          X
        </button>
      </div>

      <form className={styles.form} onSubmit={handleEditSubmit}>
        <div className={styles.inputdiv}>
          <input
            type="text"
            name="taskname"
            id="taskname"
            value={tasktitle}
            className={styles.input}
            required
            onChange={(ev) => {
              setTasktitle(ev.target.value);
            }}
          />
          <button type="submit" className={styles.button}>
            Edit
          </button>
          <br />
        </div>
      </form>
    </>
  );
}
