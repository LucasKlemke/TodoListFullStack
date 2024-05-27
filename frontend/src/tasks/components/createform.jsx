import styles from "../styles/Tasks.module.css";

export default function Createform({handleSubmit, tasktitle, setTasktitle,}) {
  return (
    <>
      <h1 className={styles.title}>Create New Task</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
            ADD
          </button>
        </div>
      </form>
    </>
  );
}
