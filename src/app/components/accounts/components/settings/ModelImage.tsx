// import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const API_URL: string = import.meta.env.VITE_APP_API_URL as string;
export const BASE_URL: string = `${API_URL}/images/banner/`;

interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
  values: any;
}

const ModalImageComponent: React.FC<ModalComponentProps> = (props) => {
    // alert(props.values)

//   const handleClose = () => {
//     props.onHide();
//   };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          View Image
        </Modal.Title>
      </Modal.Header>
      <>
      <img src={props.values} alt="" className="m-5 " />
      </>
    </Modal>
  );
};

export default ModalImageComponent;
