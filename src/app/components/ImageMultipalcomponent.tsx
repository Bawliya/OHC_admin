import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AddImageFunction } from "../services/Restaurant/Restaurant";
import { useNavigate } from "react-router-dom";
import { FaVideo } from "react-icons/fa";
import { FaImage } from "react-icons/fa";

const AddVideoCard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("youtube"); // Added state for type selection
  const [videoType, setVideoType] = useState("yoga"); // Video Type state
  const [youTubeUrl, setYouTubeUrl] = useState(""); // YouTube URL state
  const [videoFile, setVideoFile] = useState<File | null>(null); // Video file state
  const [imageFile, setImageFile] = useState<File | null>(null); // Image file state
  const [title, setTitle] = useState(""); // Title state
  const [description, setDescription] = useState("");
  const [videoMessage, setVideoMessage] = useState(""); // State to hold the video message
  const [imageMessage, setImageMessage] = useState(""); // State to hold the image message

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
    setVideoFile(null); // Reset video file when type changes
    setYouTubeUrl(""); // Reset YouTube URL when type changes
  };

  const handleVideoUploadClick = () => {
    document.getElementById("videoFileInput")?.click();
  };

  const handleImageUploadClick = () => {
    document.getElementById("imageFileInput")?.click();
  };

  const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
      setVideoMessage(`Selected video: ${event.target.files[0].name}`);
    }
  };

  const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      setImageMessage(`Selected image: ${event.target.files[0].name}`);
    }
  };

  const handleSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const notifySuccess = () => toast.success("Video added successfully");
    const notifyError = (errorMessage: any) => toast.error(errorMessage);
    setLoading(true);

    if (type === "youtube" && !youTubeUrl) {
      notifyError("YouTube URL is required.");
      setLoading(false);
      return;
    }

    if (type === "video" && !videoFile) {
      notifyError("Video file is required.");
      setLoading(false);
      return;
    }

    if (!imageFile) {
      notifyError("Thumbnail image is required.");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    // Append type, videoType, video file, and image file to formData
    formData.append("type", type);
    formData.append("video_type", videoType);
    if (type === "youtube") {
      formData.append("youTubeUrl", youTubeUrl);
    } else {
      formData.append("video", videoFile as Blob);
    }
    formData.append("image", imageFile as Blob);

    // Add other parameters like title and description
    formData.append("title", title);
    formData.append("description", description);

    try {
      const res = await AddImageFunction(formData);
      if (res?.data?.status === true) {
        notifySuccess();
        navigate("/image/view");
      } else {
        notifyError("Failed to upload.");
      }
    } catch (error) {
      notifyError("An error occurred during the upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="form w-100" noValidate id="AddVideoForm">
        <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
          <div className="tab-content">
            <div className="tab-pane fade show active">
              <div className="d-flex flex-column gap-7 gap-lg-10">
                <div className="card card-flush py-2">
                  <div className="card-header">
                    <div className="card-title">
                      <h2>Add New Video</h2>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row justify-between mb-5">
                      <div className="col-md-6 col-12">
                        <label className="form-label">Title</label>
                        <input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          type="text"
                          className="form-control bg-transparent"
                          placeholder="Title"
                        />
                      </div>
                      <div className="col-md-6">
                        {/* Video Type Dropdown */}
                        <label className="form-label">Video Type</label>
                        <select
                          className="form-control"
                          value={videoType}
                          onChange={(e) => setVideoType(e.target.value)}
                        >
                          <option value="yoga">Yoga</option>
                          <option value="service">Service</option>
                          <option value="testmonial">Testmonial</option>
                        </select>
                      </div>
                      <div className="col-md-12">
                        {/* Type Selection Dropdown */}
                        <label className="form-label">Select Video Type</label>
                        <select
                          className="form-control"
                          value={type}
                          onChange={handleTypeChange}
                        >
                          <option value="youtube">YouTube URL</option>
                          <option value="video">Upload Video</option>
                        </select>
                      </div>

                      <div className="col-md-6 col-12 mt-5">
                        <label className="form-label">Description</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="form-control bg-transparent"
                          placeholder="Description"
                          style={{ height: "200px" }}
                        ></textarea>
                      </div>

                      {/* Conditional YouTube URL or Video Upload */}
                      {type === "youtube" ? (
                        <div className="col-md-6 col-12 mt-5">
                          <label className="form-label">YouTube URL</label>
                          <input
                            type="text"
                            className="form-control"
                            value={youTubeUrl}
                            onChange={(e) => setYouTubeUrl(e.target.value)}
                            placeholder="Enter YouTube URL"
                          />
                        </div>
                      ) : (
                        <div className="col-md-6 col-12 mt-5">
                          <label className="form-label">Upload Video</label>
                          <div
                            className="video-upload-placeholder"
                            onClick={handleVideoUploadClick}
                            style={{
                              width: "100%",
                              height: "200px",
                              border: "2px dashed #ccc",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            <FaVideo size={50} />
                            <span className="upload-text mt-3 ms-4">
                              Click here to upload video
                            </span>
                          </div>
                          <input
                            type="file"
                            id="videoFileInput"
                            style={{ display: "none" }}
                            accept="video/*"
                            onChange={handleVideoFileChange}
                          />
                          {videoMessage && (
                            <p style={{ color: "green", marginTop: "10px" }}>
                              {videoMessage}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Thumbnail Upload */}
                      <div className="col-md-6 col-12 mt-5">
                        <label className="form-label">Upload Thumbnail</label>
                        <div
                          className="image-upload-placeholder"
                          onClick={handleImageUploadClick}
                          style={{
                            width: "100%",
                            height: "200px",
                            border: "2px dashed #ccc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <FaImage size={50} />
                          <span className="upload-text mt-3 ms-4">
                            Click here to upload thumbnail
                          </span>
                        </div>
                        <input
                          type="file"
                          id="imageFileInput"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleImageFileChange}
                        />
                        {imageMessage && (
                          <p style={{ color: "green", marginTop: "10px" }}>
                            {imageMessage}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-floating text-end">
                      <button
                        type="submit"
                        className="btn btnRed"
                        onClick={handleSubmitForm}
                      >
                        {!loading ? (
                          <span className="indicator-label">Submit</span>
                        ) : (
                          <span className="indicator-progress">
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

export default AddVideoCard;
