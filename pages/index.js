import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import styles from "../styles/components/Home.module.scss";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
    }
    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });

    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setEditTodoId(id);
    setEditText(todo.text);
  };

  const updateTodo = async (id, newText) => {
    const updatedTodo = todos.find((todo) => todo.id === id);
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updatedTodo, text: newText }),
    });

    if (response.ok) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      );
      setEditTodoId(null);
      setEditText("");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Todo</h1>
        <TodoForm
          addTodo={addTodo}
          updateTodo={updateTodo}
          editTodoId={editTodoId}
          editText={editText}
        />
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      </div>
    </>
  );
};

export default Home;
