import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const DispatchOverview = (datas: any) => {
  // console.log("datas",datas?.datas?.outOfDeliveryOrder?.length);

  const inActive = datas?.datas?.totalDeliveryBoy?.length - datas?.datas?.activeDeliveryMan?.length

  return (
    <Container>
      <h2 className="my-4">Dispatch Overview</h2>
      <p>Monitor your Dispatch Management Statistics by zone</p>
      <Row>
        <Col md={4}>
          <Card className="text-center mb-4">
            <Card.Body className="d-flex flex-column justify-content-start">
              <div className="d-flex gap-3">
                <i className="ki-duotone ki-courier text-primary fs-2tx">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                </i>
                <Card.Title className="fs-1 mb-1 align-self-end">{datas?.datas?.activeDeliveryMan?.length}</Card.Title>
              </div>
              <div className="text-start">
                <Card.Text>Active Delivery Man</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center mb-4">
            <Card.Body className="d-flex flex-column justify-content-start">
              <div className="d-flex gap-3">
                <i className="ki-duotone ki-user text-danger fs-2qx">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                </i>
                <Card.Title className="fs-1 mb-1 align-self-end">{inActive}</Card.Title>
              </div>
              <div className="text-start">
                <Card.Text>Inactive Delivery Man</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center mb-4">
            <Card.Body className="d-flex flex-column justify-content-start">
              <div className="d-flex gap-3">
                <i className="ki-duotone ki-profile-user text-success fs-2qx">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                </i>
                <Card.Title className="fs-1 mb-1 align-self-end">{datas?.datas?.totalDeliveryBoy?.length}</Card.Title>
              </div>
              <div className="text-start">
                <Card.Text>Total Delivery Man</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <Row>
            <Col md={4}>
              <Card className="text-center mb-4">
                <Card.Body className="d-flex flex-column justify-content-start">
                  <div className="d-flex gap-3">
                    <i className="bi bi-person-check-fill text-primary" style={{ fontSize: '2.5rem' }}></i>
                    <Card.Title className="fs-1 mb-1 align-self-end">0</Card.Title>
                  </div>
                  <div className="text-start">
                    <Card.Text>Fully Booked Delivery Man</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center mb-4">
                <Card.Body className="d-flex flex-column justify-content-start">
                  <div className="d-flex gap-3">
                    <i className="bi bi-person-plus-fill text-primary" style={{ fontSize: '2.5rem' }}></i>
                    <Card.Title className="fs-1 mb-1 align-self-end">5</Card.Title>
                  </div>
                  <div className="text-start">
                    <Card.Text>Available To Assign More Order</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row> */}
      <Row>
        <Col md={4}>
          <Card className="text-center mb-4">
            <Card.Body className="d-flex flex-column justify-content-start">
              <div className="d-flex gap-3">
                <i className="ki-duotone ki-abstract-14 text-danger fs-2qx">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <Card.Title className="fs-1 mb-1 align-self-end">{datas?.datas?.unassignedOrder?.length}</Card.Title>
              </div>
              <div className="text-start">
                <Card.Text>Unassigned Orders</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center mb-4">
            <Card.Body className="d-flex flex-column justify-content-start">
              <div className="d-flex gap-3">
              <i className="ki-duotone ki-abstract-26 text-primary fs-2qx">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
                <Card.Title className="fs-1 mb-1 align-self-end">{datas?.datas?.assignedOrder?.length}</Card.Title>
              </div>
              <div className="text-start">
                <Card.Text>Accepted By Delivery Man</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center mb-4">
            <Card.Body className="d-flex flex-column justify-content-start">
              <div className="d-flex gap-3">
                <i className="ki-duotone ki-delivery-time text-danger fs-2qx">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                  <span className="path5"></span>
                </i>
                <Card.Title className="fs-1 mb-1 align-self-end">{datas?.datas?.outOfDeliveryOrder?.length}</Card.Title>
              </div>
              <div className="text-start">
                <Card.Text>Out For Delivery</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DispatchOverview;
