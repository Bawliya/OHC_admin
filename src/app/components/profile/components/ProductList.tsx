// import React, { useState } from "react";
// import CardStack from "../components/CardStackComponenet"
// import ModalCategoryComponent from "../../ModelCategoryComponent";
import { useEffect, useState } from "react";
import CardStack from "../../CardStackComponenet";
import ModalProductComponent from "./ModelProduct";
import { verifProductFunction } from "../../../services/Product/Product";
import EditProductComponent from "./ModelEdit";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/products/`;

type props = {
  data: any;
  handleUpdate: any;
  handleDelete: any;
};

const ProductTableComponent: React.FC<props> = ({
  data,
  // handleUpdate,
  // handleDelete,
}) => {
  const [isModal, setIsModal] = useState<any>(false);
  const [isModal2, setIsModal2] = useState<any>(false);
  const [currentData, setCurrentData] = useState<any>({});
  const [Data, setData] = useState<any>([]);
console.log(data)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const image = data?.data?.map((item: any) => {
    return item?.images;
  });

  useEffect(() => {
    setData(data?.data);
  },[data]);
  // console.log(Data);

  const handleClick = async (id: any) => {
    const newData: any = Data.map((item: any) => {
      if (item._id == id) {
        item.publish = !item.publish;
        return item;
      } else {
        return item;
      }
    });

    setData(newData);

    await verifProductFunction(id);
  };

  return (
    <div className="d-flex flex-column flex-row-fluid ">
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
                    <th>Price</th>
                    <th>Index</th>
                    <th className="w-100px">Image</th>
                    <th className="text-center">Publish</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Data ? (
                    Data.length > 0 ? (
                      Data.map((item: any, index: any) => (
                        <tr key={index}>
                          <td>{(data.currentPage - 1) * 10 + index + 1}</td>
                          <td>{item?.nameEn}</td>
                          <td>{item?.price}</td>
                          <td>{item?.position}</td>
                          <td>
                            <CardStack cards={item.images} />
                          </td>
                          <td className="text-center">
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
                          </td>
                          <td className="text-end align-items-center">
                            <a
                              href="javascript:void(0)"
                              rel="noopener noreferrer"
                              data-bs-toggle="modal"
                              data-bs-target="#kt_modal_product"
                              onClick={() => {
                                setCurrentData({});
                                setIsModal(true);
                                setCurrentData(item);
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
                                setIsModal2(true);
                                setCurrentData(item);
                              }}
                            >
                              <i className="ki-duotone text-success fs-1 ki-notepad-edit">
                                <span className="path1"></span>
                                <span className="path2"></span>
                              </i>
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center">
                          No data found
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center">
                        {/* Show loader if Data is null */}
                        <div
                          className="d-flex justify-content-center mb-5 align-items-center"
                          style={{ height: "20px" }}
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
      <EditProductComponent
        show={isModal2}
        onHide={() => setIsModal2(false)}
        values={currentData}
        setData={setData} 
        datas={Data}
        // updateFunc={handleUpdate}
      />
      <ModalProductComponent
        show={isModal}
        onHide={() => setIsModal(false)}
        values={currentData}
        // updateFunc={handleUpdate}
      />
    </div>
  );
};

export default ProductTableComponent;
