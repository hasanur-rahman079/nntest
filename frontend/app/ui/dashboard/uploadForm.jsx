"use client";

import { uploadFile } from "@/app/lib/action";
import styles from "./dashboard.module.css";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const status = useFormStatus();
  return (
    <button type="submit" disabled={status.pending}>
      {status.pending ? "Uploading image..." : "Upload Image"}
    </button>
  );
}

const UploadForm = () => {
  const [state, formAction] = useFormState(uploadFile, undefined);

  return (
    <>
      <form action={formAction} className={styles.form}>
        <input
          className={styles.textInput}
          type="text"
          name="title"
          id=""
          placeholder="Title"
        />
        <input type="file" name="image" />
        <SubmitButton />
      </form>
    </>
  );
};

export default UploadForm;
