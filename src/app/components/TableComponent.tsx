import { useEffect, useState } from "react";

import ModalComponent from "./ModelComponent";
import { verifyBannerFunction } from "../services/banner/Banner";
const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}uploads/`;

type props = {
  data: any;
  handleUpdate: any;
  handleDelete: any;
};

const TableComponent: React.FC<props> = ({
  data,
  handleUpdate,
  handleDelete,
}) => {
  const [isModal, setIsModal] = useState<any>(false);
  const [currentData, setCurrentData] = useState<any>({});
  console.log(handleDelete);
  console.log("fsdjfhsdjkfh",data?.data);

  const [TableData, setTableData] = useState(data?.data);
  useEffect(() => {
    if (data?.data) {
      setTableData(data?.data);
    }
  }, [data]);

  console.log(TableData);

  const handleClick = async (id: any) => {
    const newData: any = TableData.map((item: any) => {
      console.log(item._id, id);

      if (item._id == id) {
        item.publish = !item.publish;
        return item;
      } else {
        return item;
      }
    });

    setTableData(newData);

    const res = await verifyBannerFunction(id);
    console.log(res);
  };

  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  const role = JSON.parse(localData).data;
  console.log("role", role);
  const roleArray = role?.role?.roleArray;
  console.log(roleArray);

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
              <div className="table-responsive">
                <table className="table table-hover p-0 m-0 table-rounded table-striped border gy-7 gs-7">
                  <thead>
                    <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                      <th>Sr. No.</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {TableData ? (
  TableData.length > 0 ? (
    TableData.map((item: any, index: any) => (
      <tr key={index}>
        {/* Serial Number */}
        <td>{index + 1}</td>

        {/* Name */}
        <td>{item?.name}</td>

        {/* Image */}
        <td>
          <img
            src={BASE_URL + item?.image}
            className="card-rounded"
            width={"50px"}
            height={"30px"}
            style={{ objectFit: "cover" }}
            alt="Category"
          />
        </td>
        <td className="text-end align-items-center">
                              {role?.type === "Admin" ||
                              roleArray?.some(
                                (item: { [x: string]: string | string[] }) =>
                                  "Banner" in item &&
                                  item["Banner"].includes("Edit")
                              ) ? (
                                <a
                                  href="javascript:void(0)"
                                  onClick={() => {
                                    setCurrentData({});
                                    setIsModal(true);
                                    setCurrentData(item);
                                  }}
                                >
                                  <i className="ki-duotone fs-1 ki-notepad-edit">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                  </i>
                                </a>
                              ) : null}

                              <a
                                href="javascript:void(0)"
                                onClick={() => handleDelete(item)}
                              >
                                <i className="ki-duotone fs-1 ki-trash">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                  <span className="path3"></span>
                                  <span className="path4"></span>
                                  <span className="path5"></span>
                                </i>
                              </a>
                            </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={3} className="text-center">
        No data found
      </td>
    </tr>
  )
) : (
  <tr>
    <td colSpan={3} className="text-center">
      <div
        className="d-flex justify-content-center mb-5 align-items-center"
        style={{ height: "10px" }}
      >
        <div className="loader-wrapper">
          <span className="loader"></span>
          <span className="loading-text px-5">Loading...</span>
        </div>
      </div>
    </td>
  </tr>
)}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalComponent
        show={isModal}
        onHide={() => setIsModal(false)}
        values={currentData}
        updateFunc={handleUpdate}
      />
    </div>
  );
};

export default TableComponent;
