"use server";

import { signIn } from "@/auth";
import axios from "axios";
import { AuthError } from "next-auth";
import { maxLength, minLength, object, parse, string } from "valibot";

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

const Schema = object({
  title: string("title must be a string", [
    [
      minLength(1, "Please enter your email."),
      maxLength(50, "Title must be less than 50 characters."),
    ],
  ]),
});

// upload file
export const uploadFile = async (formData) => {
  console.log("Client: formData", formData);
  try {
    const response = await axios.post(`${backendUrl}/upload`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      console.log("File uploaded successfully");
    } else {
      console.log("Client: Failed to upload file", response.status);
    }
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
 