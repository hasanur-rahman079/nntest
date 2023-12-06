import { signOut } from "@/auth";
import styles from "../ui/dashboard/dashboard.module.css";
import { uploadFile } from "../lib/action";

const dashboardPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button>Logout</button>
        </form>
      </div>

      <div className={styles.body}>
        <h3>Welcome to NextjsTesting app page</h3>

        <div className={styles.container}>
          <h4>Upload your image</h4>

          <form action={uploadFile} className={styles.form}>
            <input
              className={styles.textInput}
              type="text"
              name="title"
              id=""
              placeholder="Title"
            />
            <input type="file" name="file" />
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default dashboardPage;
