import { toast } from "react-toastify";
import { logoutUser } from "store/actions";

export function errorHandler(error, showToast = true) {
  console.log("handled>>>", error);

  if (error?.["response"]?.["status"] == 401) {
    localStorage.setItem("token", "");
    localStorage.setItem("user_data", "");
    window.location.reload();
  }

  const message = error?.["response"]?.["data"]?.["message"] || error?.message || "network error";

  showToast && toast.error(message);

  if (message.toLowerCase() === "jwt expired") {
    localStorage.setItem("token", "");
    localStorage.setItem("user_data", "");

    window.location.reload();

    return "jwt expired";
  } else {
    return message;
  }
}
