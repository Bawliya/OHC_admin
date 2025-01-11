// import React, { useState } from "react";
// import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap"; // Ensure Tooltip is imported correctly
// import { ToastContainer } from "react-toastify";

// type props = {
//   data: any;
//   handleUpdate: any;
//   handleDelete: any;
// };

// const SortVideoTableComponent: React.FC<props> = ({
//   data,
//   handleUpdate,
//   handleDelete,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedVideoUrl, setSelectedVideoUrl] = useState("");

//   const handleVideoClick = (url: string) => {
//     setSelectedVideoUrl(url);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedVideoUrl(""); // Reset video URL when modal is closed
//   };

//   return (
//     <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
//       <div className="tab-content">
//         <div
//           className="tab-pane fade show active"
//           id="kt_ecommerce_add_product_general"
//           role="tab-panel"
//         >
//           <div className="d-flex flex-column gap-7 gap-lg-10">
//             <div className="card">
//               <div className="table-responsive overflow-auto w-100">
//                 <table className="table table-hover p-0 m-0 table-rounded table-striped border gy-7 gs-7">
//                   <thead>
//                     <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
//                       <th className="text-nowrap">Sr. No.</th>
//                       {/* <th className="text-nowrap">Title</th> */}
//                       <th className="text-nowrap">Description</th>
//                       <th className="text-nowrap">Thumbnail</th>
//                       {/* <th className="text-nowrap">Type</th> */}
//                       {/* <th className="text-nowrap">Duration</th> */}
//                       {/* <th className="text-nowrap">Size</th> */}
//                       <th className="text-nowrap">Video</th>
//                       {/* <th className="text-nowrap">YouTubeUrl</th> */}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data && data.length > 0 ? (
//                       data.map((item: any, index: any) => (
//                         <tr key={index}>
//                           <td className="text-nowrap">{index + 1}</td>
//                           {/* <td className="text-nowrap">{item?.title}</td> */}

//                           {/* Description with tooltip on hover */}
//                           <td className="text-nowrap">
//                             <OverlayTrigger
//                               placement="top"
//                               overlay={
//                                 <Tooltip id={`tooltip-${index}`}>
//                                   {item?.description}
//                                 </Tooltip>
//                               }
//                             >
//                               <div
//                                 style={{
//                                   maxWidth: "100px",
//                                   whiteSpace: "nowrap",
//                                   overflow: "hidden",
//                                   textOverflow: "ellipsis",
//                                   cursor: "pointer",
//                                 }}
//                               >
//                                 {item?.description}
//                               </div>
//                             </OverlayTrigger>
//                           </td>

//                           <td className="text-nowrap">
//                             <img
//                               src={`https://pnapi.testenvapp.com/public/thumbnails/${item?.thumbnail}`}
//                               className="card-rounded"
//                               width={"50px"}
//                               height={"30px"}
//                               style={{ objectFit: "cover" }}
//                               alt="thumbnail"
//                             />
//                           </td>
//                           {/* <td className="text-nowrap">{item?.type}</td>
//                           <td className="text-nowrap">{item?.duration}</td>
//                           <td className="text-nowrap">{item?.size}</td> */}
//                           <td className="text-nowrap">
//                             {item?.url ? (
//                                <button
//                                 variant="primary"
//                                 onClick={() => handleVideoClick(item.url)}
//                               >
//                                 Play Video
//                               </button>
//                             ) : (
//                               "No Video Url"
//                             )}
//                           </td>
//                           {/* <td className="text-nowrap">
//                             {item?.youTubeUrl ? (
//                               <a
//                                 href={item.youTubeUrl}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                               >
//                                 View on YouTube
//                               </a>
//                             ) : (
//                               "No YouTubeUrl"
//                             )}
//                           </td> */}
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan={12} className="text-center">
//                           No data found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//               <ToastContainer />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Video Modal */}
//       <Modal size="lg" show={isModalOpen} onHide={handleCloseModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Play Video</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedVideoUrl ? (
//             <div className="video-container">
//               <video
//                 controls
//                 height={500}
//                 width="100%"
//                 className=" object-fit-cover"
//               >
//                 <source
//                   src={
//                     "https://pnapi.testenvapp.com/public/videos/" +
//                     selectedVideoUrl
//                   }
//                   type="video/mp4"
//                 />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           ) : (
//             <p>No video available</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//            <button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default SortVideoTableComponent;

import React, { useState } from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap"; // Ensure Tooltip is imported correctly
import { ToastContainer } from "react-toastify";

type props = {
  data: any;
  handleUpdate: any;
  handleDelete: any;
};

const SortVideoTableComponent: React.FC<props> = ({
  data,
  handleUpdate,
  handleDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);
  const [selectedThumbnailUrl, setSelectedThumbnailUrl] = useState("");

  const handleVideoClick = (url: string) => {
    setSelectedVideoUrl(url);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideoUrl(""); // Reset video URL when modal is closed
  };

  const handleThumbnailClick = (thumbnailUrl: string) => {
    setSelectedThumbnailUrl(thumbnailUrl);
    setIsThumbnailModalOpen(true);
  };

  const handleCloseThumbnailModal = () => {
    setIsThumbnailModalOpen(false);
    setSelectedThumbnailUrl(""); // Reset thumbnail URL when modal is closed
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
                      <th className="text-nowrap">Description</th>
                      <th className="text-nowrap">Thumbnail</th>
                      <th className="text-nowrap">Video</th>
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
                          <td className="text-nowrap">
                            {item?.thumbnail ? (
                              <img
                                src={`https://pnapi.testenvapp.com/public/thumbnails/${item?.thumbnail}`}
                                className="card-rounded"
                                width={"50px"}
                                height={"30px"}
                                style={{
                                  objectFit: "cover",
                                  cursor: "pointer",
                                }}
                                alt="thumbnail"
                                onClick={() =>
                                  handleThumbnailClick(item?.thumbnail)
                                }
                              />
                            ) : (
                              "NA"
                            )}
                          </td>
                          <td className="text-nowrap">
                            {item?.url ? (
                              <Button
                                variant="primary"
                                onClick={() => handleVideoClick(item.url)}
                              >
                                Play Video
                              </Button>
                            ) : (
                              "No Video Url"
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={12} className="text-center">
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
      <Modal size="lg" show={isModalOpen} onHide={handleCloseModal} centered>
        {/* <Modal.Header closeButton>
          <Modal.Title>Play Video</Modal.Title>
        </Modal.Header> */}
        <Modal.Body className="">
          {selectedVideoUrl ? (
            <div className="video-container">
              <video height="500px" controls className=" w-100 rounded-2">
                <source
                  src={
                    "https://pnapi.testenvapp.com/public/videos/" +
                    selectedVideoUrl
                  }
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <p>No video available</p>
          )}
        </Modal.Body>
        {/* <Modal.Footer>
           <button variant="secondary" onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer> */}
      </Modal>

      {/* Thumbnail Modal */}
      <Modal
        size="lg"
        show={isThumbnailModalOpen}
        onHide={handleCloseThumbnailModal}
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Thumbnail</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          {selectedThumbnailUrl ? (
            <img
              src={`https://pnapi.testenvapp.com/public/thumbnails/${selectedThumbnailUrl}`}
              alt="Thumbnail"
              className="img-fluid"
              style={{
                maxHeight: "500px",
                width: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <p>No thumbnail available</p>
          )}
        </Modal.Body>
        {/* <Modal.Footer>
           <button variant="secondary" onClick={handleCloseThumbnailModal}>
            Close
          </button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default SortVideoTableComponent;
