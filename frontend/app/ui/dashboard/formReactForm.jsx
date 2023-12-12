"use client";

import { uploadFileWithReactForm } from "@/app/lib/action";
import styles from "./dashboard.module.css";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";

const FormReactFormHook = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (e) => {
    // Update state with the selected file
    setSelectedFile(e.target.files[0]);
  };

  // file size convert function
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("file", data.file[0]);
      formData.append("age", data.age);

      await uploadFileWithReactForm(formData);

      toast.success("Data sent successfully");

      console.log(formData);
    } catch (error) {
      console.error("Error sending data:", error);

      toast.error("Error sending data");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        className={styles.textInput}
        {...register("firstName", { required: true })}
        placeholder="First Name"
      />
      {errors.firstName && <span>This field is required</span>}
      <input
        className={styles.textInput}
        {...register("lastName", { required: true })}
        placeholder="LastName"
      />
      {errors.lastName && <span>This field is required</span>}
      <input
        className={styles.textInput}
        {...register("email", { required: true })}
        placeholder="Email"
      />
      {errors.email && <span>This field is required</span>}

      {/* <input type="file" name="file" /> */}

      <input
        {...register("file")}
        type="file"
        onChange={onFileChange}
        accept=".png, .jpg, jpeg"
      />

      {selectedFile && (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>File Size: {formatBytes(selectedFile.size)}</p>
          <p>
            Last Modified: {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="File Preview"
            className={styles.filePreview}
          />
        </div>
      )}

      <input
        className={styles.textInput}
        {...register("age", { min: 18, max: 40 })}
        placeholder="Age"
      />
      {errors.age && <span>The maximum age will be 40</span>}
      <button type="submit">Send Data</button>
    </form>
  );
};

export default FormReactFormHook;
