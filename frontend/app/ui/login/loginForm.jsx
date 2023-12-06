"use client";

import { authenticate } from "@/app/lib/action";
import styles from "./login.module.css";
import { useFormState, useFormStatus } from "react-dom";

const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  return (
    <form action={dispatch} className={styles.container}>
      <lebel>Username</lebel>
      <input type="text" name="username" />

      <lebel>Password</lebel>
      <input type="password" name="password" />

      <button disabled={pending}>{pending ? "Loading..." : "Login"}</button>

      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default LoginForm;
