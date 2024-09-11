import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/components/SignIn.module.scss"; // Adjust the path as needed

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else if (result?.ok) {
      router.push("/");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="email"
        />
        <input
          type="password"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className={styles.button}>
          Sign In
        </button>
      </form>
      <div className={styles.registrationPrompt}>
        <p>Don&apos;t have an account?</p>
        <button
          className={styles.registrationButton}
          onClick={() => router.push("/auth/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default SignIn;
