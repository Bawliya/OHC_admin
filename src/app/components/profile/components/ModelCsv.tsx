import { AddCsvFileFunction } from "../../../services/Restaurant/Restaurant";
import { ChangeEvent, useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
// import Dropzone from 'dropzone';

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/banner/`;

interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
}

const ModalCsv: React.FC<ModalComponentProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  //   const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
  //   const dropzoneRef = useRef(null);
  //   const [showAlert, setShowAlert] = useState<boolean>(false);

  // useEffect(() => {
  //     if (dropzoneRef.current) {
  //         console.log("hello");

  //       // dropzoneRef.current.style.setProperty('width', '678px', 'important');
  //       const myDropzones = new Dropzone(dropzoneRef.current, {
  //         url: "https://keenthemes.com/scripts/void.php",
  //         paramName: "file",
  //         maxFiles: 10,
  //         maxFilesize: 0.5,
  //         autoProcessQueue: false, // MB
  //         addRemoveLinks: true,
  //         accept: function(file: any) {
  //           if (file.name === "wow.jpg") {
  //             console.log("false");
  //           } else {
  //             console.log("file", file);
  //             console.log("true");
  //             setMultipleFiles((prevFiles) => [...prevFiles, file]);
  //           }
  //         },
  //       });
  //       // Cleanup Dropzone instance when component unmounts
  //       return () => {
  //         myDropzones.destroy();
  //       };
  //     }
  //   }, [dropzoneRef.current]);

  //   console.log("multipleFiles",multipleFiles);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  // const filePath = "https://daeemadminapi.testenvapp.com/images/csvfile/ProductDemoFileDaeem.xlsx"
  // const fileName = "ProductDemoFileDaeem.xlsx"

  console.log("selectedFile", selectedFile); //

  async function handleSubmitForm(event: any) {
    event.preventDefault();
    const notifySuccess = () => toast.success("File added successfully");
    const notifyError = (errorMessage: any) => toast.error(errorMessage);
    setLoading(true);
    console.log(selectedFile);
    try {
      if (selectedFile === null) {
        notifyError("File is required.");
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("csvfile", selectedFile);

      const response = await AddCsvFileFunction(formData);
      // console.log("res res",res);
      // if(res?.data?.status === true){
      notifySuccess();
      props.onHide();
      setSelectedFile(null);
      setLoading(false);
      console.log(response);
      // }else{
      //     notifyError("File is not upload");
      //     setLoading(false);
      // }
    } catch (error) {
      // Handle errors
      console.error("Error:", error);

      // if (error.response) {
      //   notifyError(error.response.data.message);
      // } else {
      //   notifyError("An unexpected error occurred. Please try again later.");
      // }
    } finally {
      // Make sure to set loading state to false regardless of success or failure
      setLoading(false);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update File
        </Modal.Title>
      </Modal.Header>
      <>
        <div className="app-content flex-column-fluid" id="kt_app_content">
          <div
            className="app-container container-xxl"
            id="kt_app_content_container"
          >
            <div
              id="kt_ecommerce_add_product_form"
              className="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework"
            >
              <form
                className="form w-100"
                //   onSubmit={formik.handleSubmit}
                noValidate
                id="AddBannerFrom"
              >
                <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
                  <div className="tab-content">
                    <div
                      className="tab-pane fade show active"
                      id="kt_ecommerce_add_product_general"
                      role="tab-panel"
                    >
                      {/* <div
                          className="row w-100 mb-5"
                          style={{ width: "678px" }}
                        >
                          <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                            <div className="fv-row">
                              <div
                                className=" dropzone dropzoness bg-primary-light w-100"
                                id="kt_dropzonejs_example_1"
                                ref={dropzoneRef}
                              >
                                <div className="dz-message needsclick">
                                  <i className="ki-duotone ki-file-up fs-3x text-primary">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                  </i>
                                  <div className="ms-4">
                                    <h3 className="fs-5 fw-bold text-gray-900 mb-1">
                                      Drop files here or click to upload.
                                    </h3>
                                    <span className="fs-7 fw-semibold text-gray-500">
                                      Upload up to 10 files
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      <a
                        href="https://daeemadminapi.testenvapp.com/images/csvfile/ProductDemoFileDaeem.xlsx"
                        className="btn mb-5 btnRed"
                      >
                        Download CSV File
                      </a>
                      <div>
                        <input
                          className="form-control "
                          type="file"
                          onChange={handleFileChange}
                        />
                        {selectedFile && (
                          <div className="mt-2">
                            <p> Selected file: {selectedFile.name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
      <Modal.Footer>
        {/*  <button onClick={handleUpdate}>Update</button> */}
        <button
          type="submit"
          id="kt_sig_in_submit"
          className="btn btnRed"
          //   onClick={handleUpdate}
          //   disabled={}
        >
          {!loading && (
            <span className="indicator-label" onClick={handleSubmitForm}>
              Submit
            </span>
          )}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCsv;
