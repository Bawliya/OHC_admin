import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}uploads/`;

interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
  values: any;
  updateFunc: (data: FormData) => Promise<any>;
}

const ModalComponent: React.FC<ModalComponentProps> = (props) => {
  const [file, setFile] = useState<File | null>(null); // To manage new image upload
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({
    name: props?.values?.name,
    imageSrc: props?.values?.image,
    id: props.values._id,
  });

  // Handle name change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Handle update
  const handleUpdate = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("name", data.name);
    if (file) {
      formData.append("image", file); // Include new image if uploaded
    }

    try {
      const response = await props.updateFunc(formData);
      if (response.data.status) {
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating banner:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.values) {
      setData({
        name: props?.values?.name,
        imageSrc: props?.values?.image,
        id: props.values._id,
      });
      setFile(null); // Reset file state
    }
  }, [props.values]);

  const handleClose = () => {
    props.onHide();
    setLoading(false);
    setData({ name: "", id: "", imageSrc: "" });
    setFile(null);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Banner
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="app-content flex-column-fluid">
          <div className="app-container container-xxl">
            <form className="form w-100" noValidate id="UpdateBannerForm">
              <div className="d-flex flex-column gap-7">
                <div className="card card-flush py-2">
                  <div className="card-header">
                    <h2>Banner Details</h2>
                  </div>
                  <div className="card-body">
                    {/* Name */}
                    <label className="form-label">Name</label>
                    <div className="form-floating mb-7">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Banner Name"
                        value={data.name}
                        onChange={handleChange}
                      />
                      <label htmlFor="name" className="text-muted">
                        Enter Banner Name
                      </label>
                    </div>

                    {/* Image Upload */}
                    <label className="form-label">Banner Image</label>
                    <div className="form-floating mb-7">
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <small className="text-muted">
                        Upload a new image to replace the current one.
                      </small>
                      <div className="mt-3">
                        <label>Current Image:</label>
                        <div>
                          {data.imageSrc ? (
                            <img
                              src={BASE_URL + data.imageSrc}
                              alt="Current Banner"
                              style={{
                                width: "150px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                          ) : (
                            <p>No image available</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleUpdate}
          disabled={loading}
          className="py-2 px-4"
        >
          {!loading ? "Submit" : "Please Wait..."}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
