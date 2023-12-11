"use server";

import { signIn } from "@/auth";
import axios from "axios";
import { AuthError } from "next-auth";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// authintication
export const authenticate = async (formData) => {
  const { username, password } = Object.fromEntries(formData);

  // submit the data as a promise to the signIn authentication
  try {
    await signIn("credentials", { username, password });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
};

// upload file
export const uploadFile = async (previousState, formData) => {
  try {
    const result = await axios.post(
      "http://localhost:5001/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // console.log(result);
  } catch (error) {
    console.error("Error while uploading", error.message);
  }
};
