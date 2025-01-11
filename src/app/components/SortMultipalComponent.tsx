// import "react-toastify/dist/ReactToastify.css";
// import { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import {
//   AddImageFunction,
//   AddSortVideoFunction, // Adjust the import according to your project structure
// } from "../services/Restaurant/Restaurant";
// import { useNavigate } from "react-router-dom";
// import { FaUpload } from "react-icons/fa"; // Example using react-icons

// const SortMultipalComponent: React.FC = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [imageFile, setImageFile] = useState<File | null>(null); // Image file state
//   const [description, setDescription] = useState(""); // Description state

//   const handleImageUploadClick = () => {
//     document.getElementById("imageFileInput")?.click();
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setImageFile(event.target.files[0]);
//     }
//   };

//   const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const notifySuccess = () => toast.success("Image uploaded successfully");
//     const notifyError = (errorMessage: string) => toast.error(errorMessage);
//     setLoading(true);

//     if (!imageFile) {
//       notifyError("Image file is required.");
//       setLoading(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("video", imageFile as Blob); // Add image file
//     formData.append("description", description); // Add description

//     const res = await AddSortVideoFunction(formData);
//     if (res?.data?.status === true) {
//       notifySuccess();
//       navigate("/sort/video/view");
//     } else {
//       notifyError("Failed to upload.");
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//       <form
//         className="form w-100"
//         noValidate
//         id="AddCouponsFrom"
//         onSubmit={handleSubmitForm}
//       >
//         <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
//           <div className="tab-content">
//             <div className="tab-pane fade show active">
//               <div className="d-flex flex-column gap-7 gap-lg-10">
//                 <div className="card card-flush py-2">
//                   <div className="card-header">
//                     <div className="card-title">
//                       <h2>Add Sort Video</h2>
//                     </div>
//                   </div>
//                   <div className="card-body pt-0">
//                     <div className="row justify-content-between mb-5">
//                       {/* Image Upload Field */}
//                       <div className="px-4 col-md-5 mt-8">
//                         {" "}
//                         <div
//                           style={{ height: "200px" }}
//                           onClick={handleImageUploadClick}
//                           className="col-md-12 border-dashed border-primary  rounded-10 border-3  d-flex justify-content-center cursor-pointer gap-8  align-items-center w-100 col-12"
//                         >
//                           <label className="form-label">Upload Video</label>
//                           {/* Hidden input file field */}
//                           <input
//                             className="w-100"
//                             type="file"
//                             id="imageFileInput"
//                             accept="image/*"
//                             style={{ display: "none" }}
//                             onChange={handleFileChange}
//                           />
//                           {/* Custom button with an icon or image */}

//                           {/* Or use an icon from react-icons */}
//                           <FaUpload size={50} color="blue" />
//                         </div>
//                       </div>
//                       <div className="col-md-7 col-12 mt-8 mt-md-0">
//                         <label className="form-label">Description</label>
//                         <textarea
//                           value={description}
//                           onChange={(e) => setDescription(e.target.value)}
//                           className="form-control bg-transparent"
//                           placeholder="Description"
//                           style={{ height: "200px" }}
//                         ></textarea>
//                       </div>
//                     </div>

//                     <div className="form-floating text-end">
//                        <button type="submit" className="btn btnRed">
//                         {!loading ? (
//                           <span className="indicator-label">Submit</span>
//                         ) : (
//                           <span className="indicator-label">Submit</span>
//                         )}
//                         {loading && (
//                           <span
//                             className="indicator-progress"
//                             style={{ display: "block" }}
//                           >
//                             Please wait...
//                             <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
//                           </span>
//                         )}
//                       </button>
//                       <ToastContainer />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default SortMultipalComponent;
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  AddImageFunction,
  AddSortVideoFunction, // Adjust the import according to your project structure
} from "../services/Restaurant/Restaurant";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa"; // Example using react-icons

const SortMultipalComponent: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null); // Image file state
  const [description, setDescription] = useState(""); // Description state
  const [fileName, setFileName] = useState<string | null>(null); // State to store selected file name

  const MAX_FILE_SIZE_MB = 50; // Maximum file size limit in MB

  // Handle file input click
  const handleImageUploadClick = () => {
    document.getElementById("imageFileInput")?.click();
  };

  // Handle file change with validation
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];

      // Validate file type (only video)
      const validFileTypes = ["video/mp4", "video/webm", "video/ogg"];
      if (!validFileTypes.includes(file.type)) {
        toast.error("Please select a valid video file (MP4, WEBM, OGG).");
        return;
      }

      // Validate file size
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        toast.error(`File size exceeds ${MAX_FILE_SIZE_MB} MB limit.`);
        return;
      }

      setImageFile(file);
      setFileName(file.name); // Set the file name
    }
  };

  // Handle form submission
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const notifySuccess = () => toast.success("Video uploaded successfully");
    const notifyError = (errorMessage: string) => toast.error(errorMessage);
    setLoading(true);

    if (!imageFile) {
      notifyError("Video file is required.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("video", imageFile as Blob); // Add video file
    formData.append("description", description); // Add description

    const res = await AddSortVideoFunction(formData);
    if (res?.data?.status === true) {
      notifySuccess();
      navigate("/sort/video/view");
    } else {
      notifyError("Failed to upload.");
    }
    setLoading(false);
  };

  return (
    <>
      <form
        className="form w-100"
        noValidate
        id="AddCouponsFrom"
        onSubmit={handleSubmitForm}
      >
        <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
          <div className="tab-content">
            <div className="tab-pane fade show active">
              <div className="d-flex flex-column gap-7 gap-lg-10">
                <div className="card card-flush py-2">
                  <div className="card-header">
                    <div className="card-title">
                      <h2>Add New Reels</h2>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="row justify-content-between mb-5">
                      {/* Image Upload Field */}
                      <div className="px-4 col-md-5 mt-8">
                        <div
                          style={{ height: "200px" }}
                          onClick={handleImageUploadClick}
                          className="col-md-12 border-dashed border-primary  rounded-10 border-3  d-flex justify-content-center cursor-pointer gap-8  align-items-center w-100 col-12"
                        >
                          <label className="form-label">Upload Video</label>
                          {/* Hidden input file field */}
                          <input
                            className="w-100"
                            type="file"
                            id="imageFileInput"
                            accept="video/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                          <FaUpload size={50} color="blue" />
                        </div>
                        {/* Show selected file name if available */}
                        {fileName && (
                          <p className="mt-2 text-success">
                            Selected video: {fileName}
                          </p>
                        )}
                      </div>
                      <div className="col-md-7 col-12 mt-8 mt-md-0">
                        <label className="form-label">Description</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="form-control bg-transparent"
                          placeholder="Description"
                          style={{ height: "200px" }}
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-floating text-end">
                      <button type="submit" className="btn btnRed">
                        {!loading && (
                          <span className="indicator-label">Submit</span>
                        )}
                        {loading && (
                          <span
                            className="indicator-progress"
                            style={{ display: "block" }}
                          >
                            Please wait...
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        )}
                      </button>
                      <ToastContainer />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SortMultipalComponent;
