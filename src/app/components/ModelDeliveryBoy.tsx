// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";

import { useEffect, useState } from "react";

const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/browse/`;

interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
  values: any;
  id: any;
  //   updateFunc: any;
}

const DeliveryBoyComponent: React.FC<ModalComponentProps> = (props) => {
  // console.log(props);

  const [data, setData] = useState<any>({
    Name: props?.values?.name,
    email: props?.values?.email,
    phone: props?.values?.phone,
    country_code: props?.values?.country_code,
    dob: props?.values?.dob,
    id_type: props?.values?.id_type,
    id_no: props?.values?.id_no,
    vehicle_type: props?.values?.vehicle_type,
    make: props?.values?.make,
    model: props?.values?.model,
    color: props?.values?.color,
    car_type_id: props?.values?.car_type_id,
    car_number: props?.values?.car_number,
    vehicle_sequence_no: props?.values?.vehicle_sequence_no,
    region_id: props?.values?.region_id,
    city_id: props?.values?.city_id,

    driving_licence: props?.values?.driving_licence,
    nation_id: props?.values?.nation_id,
    driver_photo: props?.values?.driver_photo,
    vehicle_rc: props?.values?.vehicle_rc,
  });
  useEffect(() => {
    if (props.values) {
      setData({
        Name: props?.values?.name,
        email: props?.values?.email,
        phone: props?.values?.phone,
        country_code: props?.values?.country_code,
        dob: props?.values?.dob,
        id_type: props?.values?.id_type,
        id_no: props?.values?.id_no,
        vehicle_type: props?.values?.vehicle_type,
        make: props?.values?.make,
        model: props?.values?.model,
        color: props?.values?.color,
        car_type_id: props?.values?.car_type_id,
        car_number: props?.values?.car_number,
        vehicle_sequence_no: props?.values?.vehicle_sequence_no,
        region_id: props?.values?.region_id,
        city_id: props?.values?.city_id,

        driving_licence: props?.values?.driving_licence,
        nation_id: props?.values?.nation_id,
        driver_photo: props?.values?.driver_photo,
        vehicle_rc: props?.values?.vehicle_rc,
      });
    }
  }, [props.values]);

  return (
    <div className="modal bg-white fade" tabIndex={-1} id="kt_modal_2">
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content shadow-none">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <div
              className="btn btn-icon btn-sm btn-active-light-primary ms-2"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></div>
          </div>
          <div className="modal-body">
            <div className="row g-9 mb-7">
              <div className="col-4">
                <div className="row">
                  <div className="col-6">
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.Name}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.email}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.phone}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.country_code}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.dob}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.id_type}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.id_no}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.vehicle_type}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.make}
                      </span>
                    </p>
                  </div>

                  <div className="col-6">
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.model}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.color}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.car_type_id}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.car_number}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.vehicle_sequence_no}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.region_id}
                      </span>
                    </p>
                    <p>
                      <span>
                        <b>Name:</b>
                        {data.city_id}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-6">
                        {data.driving_licence ? (
                          <img
                            src={`https://daeemapi.testenvapp.com/images/${data.driving_licence}`}
                            alt="Driving Licence"
                            className="img-fluid rounded shadow"
                          />
                        ) : (
                          <p>Data not found</p>
                        )}
                      </div>
                      <div className="col-6">
                        {data.driver_photo ? (
                          <img
                            src={`https://daeemapi.testenvapp.com/images/${data.driver_photo}`}
                            alt="Driver Photo"
                            className="img-fluid rounded shadow"
                          />
                        ) : (
                          <p>Data not found</p>
                        )}
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-6">
                        {data.nation_id ? (
                          <img
                            src={`https://daeemapi.testenvapp.com/images/${data.nation_id}`}
                            alt="National ID"
                            className="img-fluid rounded shadow"
                          />
                        ) : (
                          <p>Data not found</p>
                        )}
                      </div>
                      <div className="col-6">
                        {data.vehicle_rc ? (
                          <img
                            src={`https://daeemapi.testenvapp.com/images/${data.vehicle_rc}`}
                            alt="Vehicle RC"
                            className="img-fluid rounded shadow"
                          />
                        ) : (
                          <p>Data not found</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoyComponent;
