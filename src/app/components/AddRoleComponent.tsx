import "../../../public/custom.css";

// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { ChangeEvent, useState } from "react";
import { AddRoleFunction } from "../services/Role/Role";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
type DataType = { [key: string]: string[] };

const AddRoleComponent: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [role, setRole] = useState<string>("");
  console.log(data);
  const notifySuccess = () => toast.success("Role Create Successfully");
  const notifyError = (errorMessage: any) => {
    toast.error(errorMessage, {
      className: "custom-toast-error",
      bodyClassName: "custom-toast-error-body",
      progressClassName: "custom-toast-error-progress",
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prevData) => {
      // Utility function to check if an object has a property
      const hasOwnProperty = (obj: object, prop: string) =>
        Object.prototype.hasOwnProperty.call(obj, prop);

      // Check if the key already exists
      const existingEntryIndex = prevData.findIndex((entry) =>
        hasOwnProperty(entry, name)
      );

      if (existingEntryIndex !== -1) {
        // Key exists, check if the value is already in the array
        const existingEntry = prevData[existingEntryIndex];
        const values = existingEntry[name];

        if (values.includes(value)) {
          // Value exists, remove it from the array
          const updatedValues = values.filter((v) => v !== value);

          if (updatedValues.length > 0) {
            // Update the entry with the filtered values
            return [
              ...prevData.slice(0, existingEntryIndex),
              { [name]: updatedValues },
              ...prevData.slice(existingEntryIndex + 1),
            ];
          } else {
            // Remove the entry if the array is empty
            return [
              ...prevData.slice(0, existingEntryIndex),
              ...prevData.slice(existingEntryIndex + 1),
            ];
          }
        } else {
          // Value does not exist, add it to the array
          return [
            ...prevData.slice(0, existingEntryIndex),
            { [name]: [...values, value] },
            ...prevData.slice(existingEntryIndex + 1),
          ];
        }
      } else {
        // Key does not exist, add new key-value pair
        return [...prevData, { [name]: [value] }];
      }
    });

    // For debugging purposes
    // alert(JSON.stringify(data));
  };

  const handleInputChangee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  async function addRole(e: any) {
    e.preventDefault();
    setLoading(true);
    if (role === "") {
      notifyError("First Enter Your Role");
      setLoading(false);
      return;
    }
    if (data.length === 0) {
      notifyError("First Select Permission");
      setLoading(false);
      return;
    }
    const obj = {
      name: role,
      roleArray: data,
    };
    const res = await AddRoleFunction(obj);
    console.log(res?.status);
    if (res?.status === 200) {
      notifySuccess();
      setTimeout(() => {
        navigate("/role/view");
        setLoading(false);
      }, 1000);
      setData([]);
    } else {
      notifyError("Role Not Added Successfully");
      setLoading(false);
    }
  }

  return (
    <form className="form w-100" noValidate id="AddBannerFrom">
      <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="kt_ecommerce_add_product_general"
            role="tab-panel"
          >
            <div className="d-flex flex-column gap-7 gap-lg-10">
              <div className="card card-flush py-2">
                <div className="card-header">
                  <div className="card-title">
                    <h2>Admin Details</h2>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6">
                      <label className="form-label">Role Name</label>
                      <div className="form-floating mb-7">
                        <input
                          type="text"
                          className="form-control bg-transparent"
                          name="role"
                          id="Role"
                          placeholder="Name"
                          value={role} // Bind the state to the input value
                          onChange={handleInputChangee}
                        />
                        <label htmlFor="floatingInput" className="text-muted">
                          Enter Role Name
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* <div className="card card-custom mb-5 card-flush">
                    <div className="card-body py-5">
                      <div className="row">
                        <div className="col-lg-4">All Permission</div>
                        <div className="col-lg-8 d-flex">
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="List"
                              id="flexCheckDefault"
                              name="All"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Allow</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="card card-custom mb-5 card-flush">
                    <div className="card-body py-5">
                      <div className="row">
                        <div className="col-lg-4">Dashboard</div>
                        <div className="col-lg-8 d-flex">
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="List"
                              id="flexCheckDefault"
                              name="Dashboard"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Allow</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card-footer">Footer</div> */}
                  </div>

                  <div className="card card-custom mb-5 card-flush">
                    <div className="card-body py-5">
                      <div className="row">
                        <div className="col-lg-4">Customers</div>
                        <div className="col-lg-8 d-flex">
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="List"
                              id="flexCheckDefault"
                              name="Customers"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Allow</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card-footer">Footer</div> */}
                  </div>

                  <div className="card card-custom mb-5 card-flush">
                    <div className="card-body py-5">
                      <div className="row">
                        <div className="col-lg-4">Order</div>
                        <div className="col-lg-8 d-flex">
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="List"
                              id="flexCheckDefault"
                              name="Order"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Allow</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card-footer">Footer</div> */}
                  </div>

                  <div className="card card-custom mb-5 card-flush">
                    <div className="card-body py-5">
                      <div className="row">
                        <div className="col-lg-4">Banner</div>
                        <div className="col-lg-8 d-flex">
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="List"
                              id="flexCheckDefault"
                              name="Banner"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">List</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create"
                              id="flexCheckDefault"
                              name="Banner"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Create</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Edit"
                              id="flexCheckDefault"
                              name="Banner"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Edit</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Public"
                              id="flexCheckDefault"
                              name="Banner"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Public</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card-footer">Footer</div> */}
                  </div>

                  <div className="card card-custom mb-5 card-flush">
                    <div className="card-body py-5">
                      <div className="row">
                        <div className="col-lg-4">Category</div>
                        <div className="col-lg-8 d-flex">
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="List"
                              id="flexCheckDefault"
                              name="Category"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">List</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create"
                              id="flexCheckDefault"
                              name="Category"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Create</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Edit"
                              id="flexCheckDefault"
                              name="Category"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Edit</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Public"
                              id="flexCheckDefault"
                              name="Category"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Public</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card-footer">Footer</div> */}
                  </div>

                  <div className="card card-custom mb-5 card-flush">
                    <div className="card-body py-5">
                      <div className="row">
                        <div className="col-lg-4">Business Category</div>
                        <div className="col-lg-8 d-flex">
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="List"
                              id="flexCheckDefault"
                              name="BusinessCategory"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">List</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create"
                              id="flexCheckDefault"
                              name="BusinessCategory"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Create</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Edit"
                              id="flexCheckDefault"
                              name="BusinessCategory"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Edit</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Public"
                              id="flexCheckDefault"
                              name="BusinessCategory"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Public</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card-footer">Footer</div> */}
                  </div>

                  <div className="card card-custom mb-5 card-flush">
                    <div className="card-body py-5">
                      <div className="row">
                        <div className="col-lg-4">Business</div>
                        <div className="col-lg-8 d-flex">
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="List"
                              id="flexCheckDefault"
                              name="Business"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">List</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create"
                              id="flexCheckDefault"
                              name="Business"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Create</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Edit"
                              id="flexCheckDefault"
                              name="Business"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Edit</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Public"
                              id="flexCheckDefault"
                              name="Business"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Public</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card-footer">Footer</div> */}
                  </div>

                  <div className="card card-custom mb-5 card-flush">
                    <div className="card-body py-5">
                      <div className="row">
                        <div className="col-lg-4">Delivery Boy</div>
                        <div className="col-lg-8 d-flex">
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="List"
                              id="flexCheckDefault"
                              name="DeliveryBoy"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">List</label>
                          </div>

                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Public"
                              id="flexCheckDefault"
                              name="DeliveryBoy"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Public</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card-footer">Footer</div> */}
                  </div>

                  <div className="card card-custom mb-5 card-flush">
                    <div className="card-body py-5">
                      <div className="row">
                        <div className="col-lg-4">Coupons</div>
                        <div className="col-lg-8 d-flex">
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="List"
                              id="flexCheckDefault"
                              name="Coupons"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">List</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create"
                              id="flexCheckDefault"
                              name="Coupons"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Create</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Edit"
                              id="flexCheckDefault"
                              name="Coupons"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Edit</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Public"
                              id="flexCheckDefault"
                              name="Coupons"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Public</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card-footer">Footer</div> */}
                  </div>

                  <div className="card card-custom mb-5 card-flush">
                    <div className="card-body py-5">
                      <div className="row">
                        <div className="col-lg-4">Notification</div>
                        <div className="col-lg-8 d-flex">
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="List"
                              id="flexCheckDefault"
                              name="Notification"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">List</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create"
                              id="flexCheckDefault"
                              name="Notification"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Create</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Edit"
                              id="flexCheckDefault"
                              name="Notification"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Edit</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Public"
                              id="flexCheckDefault"
                              name="Notification"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Public</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card-footer">Footer</div> */}
                  </div>

                  <div className="card card-custom mb-5 card-flush">
                    <div className="card-body py-5">
                      <div className="row">
                        <div className="col-lg-4">Reports</div>
                        <div className="col-lg-8 d-flex">
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="List"
                              id="flexCheckDefault"
                              name="Reports"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">List</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Create"
                              id="flexCheckDefault"
                              name="Reports"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Create</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Edit"
                              id="flexCheckDefault"
                              name="Reports"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Edit</label>
                          </div>
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Public"
                              id="flexCheckDefault"
                              name="Reports"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Public</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card-footer">Footer</div> */}
                  </div>

                  <div className="card card-custom mb-5 card-flush">
                    <div className="card-body py-5">
                      <div className="row">
                        <div className="col-lg-4">Setting</div>
                        <div className="col-lg-8 d-flex">
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="List"
                              id="flexCheckDefault"
                              name="Setting"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Allow</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card-footer">Footer</div> */}
                  </div>

                  <div className="card card-custom mb-5 card-flush">
                    <div className="card-body py-5">
                      <div className="row">
                        <div className="col-lg-4">Access Control</div>
                        <div className="col-lg-8 d-flex">
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="List"
                              id="flexCheckDefault"
                              name="AccessControl"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Allow</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card-footer">Footer</div> */}
                  </div>

                  <div className="card card-custom mb-5 card-flush">
                    <div className="card-body py-5">
                      <div className="row">
                        <div className="col-lg-4">Support Chat</div>
                        <div className="col-lg-8 d-flex">
                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Customer"
                              id="flexCheckDefault"
                              name="SupportChat"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Customer</label>
                          </div>

                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="DeliveryBoy"
                              id="flexCheckDefault"
                              name="SupportChat"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">
                              Delivery Boy
                            </label>
                          </div>

                          <div className="form-check mx-2 form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="Partner"
                              id="flexCheckDefault"
                              name="SupportChat"
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label">Partner</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card-footer">Footer</div> */}
                  </div>

                  <div className="form-floating text-end">
                    <button
                      type="submit"
                      id="kt_sign_in_submit"
                      className="btn btnRed"
                      onClick={addRole}
                      // style={{backgroundColor:"#f90505", color:"white"}}
                      disabled={loading}
                    >
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
  );
};

export default AddRoleComponent;
