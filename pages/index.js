import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useRouter } from "next/router";
import LogoutButton from "../components/LogoutButton";
import styles from "../styles/components/Home.module.scss";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loadingTodos, setLoadingTodos] = useState(true); // For handling loading state
  const [error, setError] = useState(null); // For handling errors

  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to sign-in page if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Fetch todos for the authenticated user
  useEffect(() => {
    async function fetchTodos() {
      if (session?.user?.email) {
        try {
          setLoadingTodos(true);
          const response = await fetch("/api/todos");
          if (!response.ok) throw new Error("Failed to fetch todos");
          const data = await response.json();
          setTodos(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoadingTodos(false);
        }
      }
    }
    fetchTodos();
  }, [session]);

  // Function to get CSRF token
  const getCsrfToken = async () => {
    const res = await fetch("/api/auth/csrf");
    const data = await res.json();
    return data.csrfToken;
  };

  const addTodo = async (todo) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are sent
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error(error.message);
      alert("Error adding todo: " + error.message);
    }
  };

  // Toggle completion status of a todo
  const toggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) throw new Error("Failed to update todo");

      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      alert("Error updating todo: " + error.message);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      alert("Error deleting todo: " + error.message);
    }
  };

  // Edit an existing todo
  const editTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setEditTodoId(id);
    setEditText(todo.text);
  };

  // Update a todo
  const updateTodo = async (id, newText) => {
    const updatedTodo = todos.find((todo) => todo.id === id);

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedTodo, text: newText }),
      });

      if (!response.ok) throw new Error("Failed to update todo");

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      );
      setEditTodoId(null);
      setEditText("");
    } catch (error) {
      alert("Error updating todo: " + error.message);
    }
  };

  // Display loading, error, or the todo list based on state
  if (status === "loading") {
    return <div>Loading session...</div>;
  }

  if (loadingTodos) {
    return <div>Loading todos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Todo</h1>
      {session ? (
        <>
          <p>Welcome, {session.user.name}</p>
          <LogoutButton />
        </>
      ) : (
        <p>Please log in to see your todos.</p>
      )}
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
  );
};

export default Home;
