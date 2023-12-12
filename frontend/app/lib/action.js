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
export const uploadFile = async (prevState, formData) => {
  try {
    // const { file, title } = Object.fromEntries(formData);

    // const title = parse(Schema, { ...formData }, { abortEarly: true });

    // formData.append("title", title);
    // formData.append("file", file);

    // const result = await axios.post(`${backendUrl}/api/image`, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    console.log(formData);
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const uploadFileWithReactForm = async (formData) => {
  try {
    const data = Object.fromEntries(formData.entries());

    console.log(data);
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
 