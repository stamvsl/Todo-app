import styles from "../styles/components/TodoList.module.scss";

const TodoList = ({ todos, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <ul className={styles.todoList}>
      {todos
        .slice()
        .reverse()
        .map((todo) => (
          <li
            key={todo.id}
            className={`${styles.todoItem} ${
              todo.completed ? "completed" : ""
            }`}
          >
            <span
              onClick={() => toggleComplete(todo.id)}
              className={todo.completed ? styles.completed : ""}
            >
              {todo.text}
            </span>
            <button
              className={styles["button--edit"]}
              onClick={() => editTodo(todo.id)}
            >
              Edit
            </button>
            <button
              className={`${styles.button} ${styles["button--delete"]}`}
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
};

export default TodoList;
