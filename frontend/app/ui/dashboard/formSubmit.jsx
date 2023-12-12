"use client";

import { uploadFile } from "@/app/lib/action";
import styles from "./dashboard.module.css";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

const FormSubmit = () => {
  const [state, formAction] = useFormState(uploadFile, undefined);
  const { pending } = useFormStatus(uploadFile);

  return (
    <form action={formAction} className={styles.form}>
      <input
        className={styles.textInput}
        type="text"
        name="title"
        id=""
        placeholder="Title"
      />
      {state}
      <input type="file" name="file" />
      <button type="submit">
        {pending ? "Uploading data" : "Upload File"}
      </button>
    </form>
  );
};

export default FormSubmit;
