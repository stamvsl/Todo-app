import { useState, useEffect } from "react";
import styles from "../styles/components/TodoForm.module.scss";

const TodoForm = ({ addTodo, updateTodo, editTodoId, editText }) => {
  const [task, setTask] = useState("");

  useEffect(() => {
    if (editTodoId) {
      setTask(editText);
    }
  }, [editTodoId, editText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;

    if (editTodoId) {
      updateTodo(editTodoId, task);
    } else {
      addTodo({
        id: Date.now(),
        text: task,
        completed: false,
      });
    }

    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
        className={styles.inputField}
      />
      <button type="submit" className={styles.button}>
        {editTodoId ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TodoForm;
