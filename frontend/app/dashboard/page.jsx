import { signOut } from "@/auth";
import styles from "../ui/dashboard/dashboard.module.css";
import UploadForm from "../ui/dashboard/uploadForm.jsx";

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

          <UploadForm />
        </div>
      </div>
    </div>
  );
};

export default dashboardPage;
