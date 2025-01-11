import React, { useEffect, useState } from "react";

// import ModalCategoryComponent from "./ModelCategoryComponent";
// import { verifyCategoryFunction } from "../services/category/Category";
import ModalCouponsComponent from "./ViewCouponsModel";
import { verifyCouponFunction } from "../services/Coupons/coupons";
import ModalCouponEditComponent from "./CouponsEditModel";
// import ModalCategoryComponent from "./ModelCategoryComponent";
const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/category/`;

type props = {
  data: any;
  handleUpdate: any;
  handleDelete: any;
};

const TableCouponsComponent: React.FC<props> = ({
  data,
  handleUpdate,
  handleDelete,
}) => {
  const [isModal, setIsModal] = useState<any>(false);
  const [isModal2, setIsModal2] = useState<any>(false);
  const [currentData, setCurrentData] = useState<any>({});
  const [currentData2, setCurrentData2] = useState<any>({});
  console.log(handleDelete);


  const localData: string | null = localStorage.getItem("kt-auth-react-v");
  if (!localData) {
    // Handle case where localData is null
    throw new Error("Local data not found");
  }
  const role = JSON.parse(localData).data
  console.log("role", role);
  const roleArray = role?.role?.roleArray
  console.log(roleArray);

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

    const res = await verifyCouponFunction(id);
    console.log(res);
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
              <table className="table table-hover p-0 m-0 table-rounded table-striped border gy-7 gs-7">
                <thead>
                  <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                    <th>Sr. No.</th>
                    <th>Code</th>
                    <th>Discount</th>
                    <th>Discount Type</th>
                    <th className="w-150px">Expires Date</th>
                    <th className="w-50px">Publish</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {TableData ? (
                      TableData.length > 0 ? (
                        TableData.map((
                          item: any,
                          index: any // Remove "return" here
                        ) => (
                      <tr key={index}>
                        <td>{(data?.currentPage - 1) * 10 + index + 1}</td>
                        <td>{item?.code}</td>
                        <td>{item?.discount}</td>
                        <td>{item?.discountType}</td>
                        <td>
                          {item?.expiresAt
                            ? `${new Date(item.expiresAt)
                                .getDate()
                                .toString()
                                .padStart(2, "0")}-${(
                                new Date(item.expiresAt).getMonth() + 1
                              )
                                .toString()
                                .padStart(2, "0")}-${new Date(
                                item.expiresAt
                              ).getFullYear()}`
                            : null}
                        </td>
                        <td>
                        {role?.type === 'Admin' || roleArray?.some((item: { [x: string]: string | string[]; }) => 'Coupons' in item && item['Coupons'].includes('Public')) ? (
                          <a href="javascript:void(0)">
                            <span
                              className={`badge ${
                                item?.publish
                                  ? "badge-light-success"
                                  : "badge-light-danger"
                              } ${item.verify === false ? "disabled" : ""}`}
                              style={
                                item.verify === false
                                  ? { display: "disabled", fontSize: "14px" }
                                  : { fontSize: "14px" }
                              }
                              onClick={() => handleClick(item._id)}
                            >
                              {item?.publish ? "Active" : "Inactive"}
                            </span>
                          </a>
                          ) : null}
                        </td>

                        <td className="text-end align-items-center">
                        <a
                            href="javascript:void(0)"
                            onClick={() => {
                              setCurrentData2({});
                              setIsModal2(true);
                              setCurrentData2(item);
                            }}
                          >
                            <i className="ki-duotone fs-1 text-primary ki-eye">
                              <span className="path1"></span>
                              <span className="path2"></span>
                              <span className="path3"></span>
                            </i>
                          </a>
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

                          {/* <a
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
                          </a> */}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        {" "}
                        {/* Change colSpan to 6 */}
                        No data found
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center">
                      {" "}
                      {/* Change colSpan to 6 */}
                      {/* Show loader if Data is null */}
                      <div
                        className="d-flex justify-content-center mb-5 align-items-center"
                        style={{ height: "10px" }}
                      >
                        <div className="loader-wrapper">
                          <span className="loader"></span>
                          <span className="loading-text px-5">
                            Loading...
                          </span>
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
      <ModalCouponEditComponent
        show={isModal}
        onHide={() => setIsModal(false)}
        values={currentData}
        updateFunc={handleUpdate}
      />
      <ModalCouponsComponent
        show={isModal2}
        onHide={() => setIsModal2(false)}
        values={currentData2}
        updateFunc={handleUpdate}
      />
    </div>
  );
};

export default TableCouponsComponent;
