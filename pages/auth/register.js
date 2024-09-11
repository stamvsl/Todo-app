import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/components/Register.module.scss"; // Adjust the path as needed

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setSuccess("User registered successfully!");
      setError("");
      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
    } else {
      const data = await response.json();
      setSuccess("");
      setError(data.error || "Something went wrong, please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        <input
          type="password"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
      <div className={styles.signInPrompt}>
        <p>Already have an account?</p>
        <button
          className={styles.signInButton}
          onClick={() => router.push("/auth/signin")}
        >
          Sign In
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Register;
