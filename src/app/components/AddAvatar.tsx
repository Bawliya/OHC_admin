// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";

// const AddAvatar = () => {
//   const [selectedImages, setSelectedImages] = useState<any>([]);

//   const onDrop = (acceptedFiles: any) => {
//     // Handle multiple image uploads
//     const newImages = acceptedFiles.map((file: any) =>
//       Object.assign(file, {
//         preview: URL.createObjectURL(file),
//       })
//     );
//     setSelectedImages([...selectedImages, ...newImages]);
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: "image/*",
//     onDrop,
//     multiple: true,
//   });

//   return (
//     <div className="p-md-10 p-5">
//       <h3>Add Avatar</h3>

//       <div
//         {...getRootProps({
//           className:
//             "d-flex justify-content-center align-items-center dropzone w-100",
//         })}
//         style={{
//           border: "2px dashed #007bff",
//           cursor: "pointer",
//           textAlign: "center",
//           width: "100%",
//           height: "300px",
//         }}
//       >
//         <input {...getInputProps()} />

//         <p className="mb-0">
//           Drag & drop images here, or click to select files
//         </p>
//       </div>
//       <div className="row mt-10">
//         {selectedImages.map((file: any, index: any) => (
//           <div className="col-md-2 " key={index}>
//             <div className="image-preview mb-3">
//               <img
//                 width={100}
//                 height={80}
//                 src={file.preview}
//                 alt={`image-${index}`}
//                 className="img-fluid w-100"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="d-flex justify-content-end mt-10">
//          <button className=" btn btn-primary px-5">Save</button>
//       </div>
//     </div>
//   );
// };

// export default AddAvatar;
import React, { useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { toast } from "react-toastify"; // Assuming you are using react-toastify for notifications
import AddAvaterFunction from "../services/Avater/AvaterAPIs";
import { useNavigate } from "react-router-dom";

const AddAvatar = () => {
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles: any) => {
    // Handle multiple image uploads
    const newImages = acceptedFiles.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setSelectedImages([...selectedImages, ...newImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] } as Accept,
    onDrop,
    multiple: true,
  });

  const handleSave = async () => {
    if (selectedImages.length === 0) {
      toast.error("Please select images to upload.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      // Append images to form data under the `avatars` parameter
      selectedImages.forEach((file: any) => {
        formData.append("avtars", file); // This adds each image to `avatars`
      });

      const response = await AddAvaterFunction(formData);

      toast.success("Images uploaded successfully!");
      console.log("Upload Response:", response);

      // Clear selected images after successful upload
      setSelectedImages([]);
      navigate("/avater/view");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while uploading images.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-md-10 p-5">
      <h3>Add Avatar</h3>

      <div
        {...getRootProps({
          className:
            "d-flex justify-content-center align-items-center dropzone w-100",
        })}
        style={{
          border: "2px dashed #007bff",
          cursor: "pointer",
          textAlign: "center",
          width: "100%",
          height: "300px",
        }}
      >
        <input {...getInputProps()} />
        <p className="mb-0">
          Drag & drop images here, or click to select files
        </p>
      </div>

      <div className="row mt-10">
        {selectedImages.map((file: any, index: any) => (
          <div className="col-md-2" key={index}>
            <div className="image-preview mb-3">
              <img
                width={100}
                height={80}
                src={file.preview}
                alt={`image-${index}`}
                className="img-fluid w-100"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-end mt-10">
        <button
          className="py-3 px-5 border-0 custom_btn fw-semibold  fs-5 rounded-2"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default AddAvatar;
