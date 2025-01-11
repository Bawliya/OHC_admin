// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import AddNotificationFunction from "../services/notification/notification";

// const Notification = () => {
//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (!title || !message) {
//       toast.error("Please fill out all fields.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const payload = {
//         title,
//         message,
//       };

//       const response = await AddNotificationFunction(payload);

//       if (response?.status === true) {
//         toast.success("Notification sent successfully!");
//         // Clear form fields after successful submission
//         setTitle("");
//         setMessage("");
//       } else {
//         toast.error("Failed to send notification.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("An error occurred while sending the notification.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-10">
//       <ToastContainer />
//       <h3>Notifications</h3>
//       <form onSubmit={handleSubmit} className="card mt-10 p-8">
//         <label className="form-label">Title</label>
//         <div className="form-floating mb-7">
//           <input
//             type="text"
//             className="form-control"
//             name="nameEn"
//             id="nameEn"
//             placeholder="Name"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <label htmlFor="nameEn" className="text-muted">
//             Title
//           </label>
//         </div>

//         <div className="col-12 mt-3">
//           <label className="form-label">Message</label>
//           <div className="form-floating mb-7">
//             <textarea
//               className="form-control bg-transparent"
//               placeholder="Message"
//               style={{ height: "200px" }}
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             ></textarea>
//             <label htmlFor="message" className="text-muted">
//               Message
//             </label>
//           </div>
//         </div>

//         <div className="form-floating text-end">
//            <button type="submit" className="btn btnRed" disabled={loading}>
//             <span className="indicator-label">
//               {loading ? "Sending..." : "Send"}
//             </span>
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Notification;

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AddNotificationFunction from "../services/notification/notification";
import { data } from "jquery";
import { useNavigate } from "react-router-dom";

interface ApiResponse {
  status: boolean; // Expected response structure
}

const Notification = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !message) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title,
        message,
      };

      const response: any = await AddNotificationFunction(payload);
      console.log(response);
      // Use the boolean comparison here
      if (response?.data?.status === true) {
        toast.success("Notification sent successfully!");
        // Clear form fields after successful submission
        setTitle("");
        setMessage("");
        setTimeout(() => {
          navigate("/order");
        }, 1000);
      } else {
        toast.error("Failed to send notification.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while sending the notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <ToastContainer />
      <h3>Notifications</h3>
      <form onSubmit={handleSubmit} className="card mt-10 p-8">
        <label className="form-label">Title</label>
        <div className="form-floating mb-7">
          <input
            type="text"
            className="form-control"
            name="nameEn"
            id="nameEn"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="nameEn" className="text-muted">
            Title
          </label>
        </div>

        <div className="col-12 mt-3">
          <label className="form-label">Message</label>
          <div className="form-floating mb-7">
            <textarea
              className="form-control bg-transparent"
              placeholder="Message"
              style={{ height: "200px" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <label htmlFor="message" className="text-muted">
              Message
            </label>
          </div>
        </div>

        <div className="form-floating text-end">
          <button type="submit" className="btn btnRed" disabled={loading}>
            <span className="indicator-label">
              {loading ? "Sending..." : "Send"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Notification;
