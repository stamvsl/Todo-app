import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/components/SignIn.module.scss";

const SignIn = () => {
  const [email, setEmail] = useState("guest@user.com");
  const [password, setPassword] = useState("guest1!");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.ok) {
      setSuccess("Signed in successfully!");
      setError("");
      router.push("/");
    } else {
      setSuccess("");
      setError(result.error || "Something went wrong, please try again.");
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
          Sign In
        </button>
      </form>
      <div className={styles.signUpPrompt}>
        <p>Don&apos;t have an account?</p>
        <button
          className={styles.signUpButton}
          onClick={() => router.push("/auth/register")}
        >
          Sign Up
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default SignIn;
