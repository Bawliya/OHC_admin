import React, { useEffect, useState } from "react";

// import ModalCategoryComponent from "./ModelCategoryComponent";
// import { verifyCategoryFunction } from "../services/category/Category";
const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/category/`;

type props = {
  data: any;
};

const TableRoleComponent: React.FC<props> = ({ data }) => {
  //   const [isModal, setIsModal] = useState<any>(false);
  //   const [currentData, setCurrentData] = useState<any>({});

  const [TableData, setTableData] = useState(data?.data);
  useEffect(() => {
    if (data?.data) {
      setTableData(data?.data);
    }
  }, [data]);

  console.log(
    TableData?.map((d: any) => {
      console.log(
        d.roleArray.map((a: any) => {
          console.log(a);
          console.log(Object.keys(a));
          Object.keys(a).forEach((key) => {
            console.log(`Key: ${key}, Value: ${a[key]}`);
          });
        })
      );
    })
  );

  //   const handleClick = async (id: any) => {
  //     const newData: any = TableData.map((item: any) => {
  //       console.log(item._id, id);

  //       if (item._id == id) {
  //         item.publish = !item.publish;
  //         return item;
  //       } else {
  //         return item;
  //       }
  //     });

  //     setTableData(newData);

  //     const res = await verifyCategoryFunction(id);
  //     console.log(res);
  //   };

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
                    <th>Name</th>
                    <th>Permission</th>
                    {/* <th>Index</th>
                    <th className="w-50px">Publish</th> */}
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
                          <td>{item?.name}</td>
                          <td>
                            {item?.roleArray?.map((role: any, i: any) => (
                              <div className="" key={i}>
                                {role &&
                                  Object.keys(role).map((key) => (
                                    <div className="row mb-2" key={key}>
                                      <div className="col-4">{key}</div><div className="col-6"><div className="badge badge-light-success">{role[key].join(" - ")}</div></div>
                                    </div>
                                  ))}
                              </div>
                            ))}
                          </td>

                          {/* <td>{item?.position}</td> */}
                          {/* <td>
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
                                {item?.publish}
                              </span>
                            </a>
                          </td> */}
                          <td className="text-end align-items-center">
                            <a
                              href="javascript:void(0)"
                              //   onClick={() => {
                              //     setCurrentData({});
                              //     setIsModal(true);
                              //     setCurrentData(item);
                              //   }}
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
      {/* <ModalCategoryComponent
        show={isModal}
        onHide={() => setIsModal(false)}
        values={currentData}
        // updateFunc={handleUpdate}
      /> */}
    </div>
  );
};

export default TableRoleComponent;
