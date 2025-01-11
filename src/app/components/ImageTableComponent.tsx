import React, { useState } from "react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure Toastify CSS is included

type props = {
  data: any;
  handleUpdate: any;
  handleDelete: any;
};

const IamgeTableComponent: React.FC<props> = ({
  data,
  handleUpdate,
  handleDelete,
}) => {
  const API_BASE_URL = import.meta.env.VITE_APP_API_URL; // Fetching the base URL from the .env file
  console.log("Testing image ------->", data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleVideoClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null); // Reset when modal is closed
  };

  const getYouTubeID = (url: string) => {
    const regExp = /^.*(youtu\.be\/|v\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="kt_ecommerce_add_product_general"
          role="tab-panel"
        >
          <div className="d-flex flex-column gap-7 gap-lg-10">
            <div className="card">
              <div className="table-responsive overflow-auto w-100">
                <table className="table table-hover p-0 m-0 table-rounded table-striped border gy-7 gs-7">
                  <thead>
                    <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                      <th className="text-nowrap">Sr. No.</th>
                      <th className="text-nowrap">Title</th>
                      <th className="text-nowrap">Description</th>
                      <th className="text-nowrap">Type</th>
                      <th className="text-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.length > 0 ? (
                      data.map((item: any, index: any) => (
                        <tr key={index}>
                          <td className="text-nowrap">{index + 1}</td>
                          <td className="text-nowrap">
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-${index}`}>
                                  {item?.title}
                                </Tooltip>
                              }
                            >
                              <div
                                style={{
                                  maxWidth: "100px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  cursor: "pointer",
                                }}
                              >
                                {item?.title}
                              </div>
                            </OverlayTrigger>
                          </td>
                          <td className="text-nowrap">
                            <OverlayTrigger
                              placement="right"
                              container={document.body}
                              overlay={
                                <Tooltip id={`tooltip-${index}`}>
                                  {item?.description}
                                </Tooltip>
                              }
                            >
                              <div
                                style={{
                                  maxWidth: "100px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  cursor: "pointer",
                                }}
                              >
                                {item?.description}
                              </div>
                            </OverlayTrigger>
                          </td>
                          <td className="text-nowrap">{item?.type}</td>
                          <td className="text-nowrap">
                            {item?.type === "youtube" && item.youTubeUrl ? (
                              <a
                                href={item.youTubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  className="cursor-pointer"
                                  width={30}
                                  src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                                  alt="YouTube Icon"
                                />
                              </a>
                            ) : item?.type === "video" && item.videoPath ? (
                              <img
                                className="cursor-pointer"
                                onClick={() => handleVideoClick(item)}
                                width={50}
                                height={50}
                                src={`${API_BASE_URL}uploads/${item.image}`}
                                alt="Thumbnail"
                                style={{ objectFit: "cover" }}
                              />
                            ) : item?.type === "image" && item.image ? (
                              <img
                                width={50}
                                height={50}
                                src={`${API_BASE_URL}${item.image}`}
                                alt="Image"
                                style={{ objectFit: "cover" }}
                              />
                            ) : (
                              "No Action Available"
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center">
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Modal
        className="pb-0"
        size="lg"
        show={isModalOpen}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Body className="p-0 shadow-slate-500">
          {selectedItem ? (
            <div className="video-container pb-0">
              <video
                controls
                width="100%"
                className="rounded-2"
                src={`${API_BASE_URL}uploads/${selectedItem.videoPath}`}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <p className="pb-0">No video available</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default IamgeTableComponent;
