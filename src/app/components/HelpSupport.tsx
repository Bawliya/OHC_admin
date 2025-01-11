import React from "react";
import { Accordion, Container } from "react-bootstrap";
import email_icon from "../../../public/media/icons/email_icon.png";
import phone_icon from "../../../public/media/icons/phone_icon.png";

const HelpSupport = () => {
  const handleTelClick = (event: any) => {
    event.preventDefault();
    window.location.href = "tel:02234567890";
  };

  const handleMailClick = (event: any) => {
    event.preventDefault();
    window.location.href = "mailto:Support.Petnation@gmail.com";
  };

  return (
    <div
      style={{ backgroundColor: "#f7f9f9" }}
      className="pb-5 pt-4  min-vh-100"
    >
      {" "}
      <Container
        style={{ maxWidth: "1000px" }}
        className="pb-5 pt-0 space_grotesk"
      >
        <div className="row">
          <div className="col-md-6">
            <div className="card px-4 py-3">
              <a href="tel:02234567890" onClick={handleTelClick}>
                <div className="d-flex align-items-center gap-4">
                  <img src={phone_icon} alt="phone_icon" />
                  <div>
                    <p className="mb-0 fs-5 fw-bold ff text-black">
                      Our 24x7 customer Service
                    </p>
                    <p
                      style={{ color: "#1a6896" }}
                      className="mb-0 mt-1 fs-5 fw-bold ff"
                    >
                      02234567890
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="col-md-6 mt-5 mt-md-0">
            <div className="card px-4 py-3">
              <a
                href="mailto:Support.Petnation@gmail.com"
                onClick={handleMailClick}
              >
                <div className="d-flex align-items-center gap-4">
                  <img src={email_icon} alt="email_icon" />
                  <div>
                    <p className="mb-0 fs-5 fw-bold ff text-black">
                      Write us at
                    </p>
                    <p
                      style={{ color: "#1a6896" }}
                      className="mb-0 mt-1 fs-5 fw-bold ff"
                    >
                      Support.Petnation@gmail.com
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="px-3 mt-5">
            <div className="card rounded-3 py-5">
              <h3 className="px-5 ">Frequently Asked Questions</h3>
              <div className="border mt-3"></div>
              <div className="px-md-5 px-0">
                <Accordion defaultActiveKey="0" className="mt-5">
                  <Accordion.Item className="mt-4 border-0 " eventKey="0">
                    <Accordion.Header>
                      <h4 className="mb-0">
                        What is the most popular online shopping store?
                      </h4>
                    </Accordion.Header>
                    <Accordion.Body className="pt-2 pb-2">
                      Morbi adipiscing gravida dolor dui tincidunt libero. Duis
                      malesuada massa libero nec accumsan nunc gravida.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item className="mt-4 border-0" eventKey="1">
                    <Accordion.Header>
                      <h4 className="mb-0">
                        Why online shopping is popular nowadays?
                      </h4>
                    </Accordion.Header>
                    <Accordion.Body className="pt-2 pb-2">
                      You can contact our 24x7 customer service by calling
                      02234567890 or by emailing us at
                      Support.Petnation@gmail.com.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item className="mt-4 border-0" eventKey="2">
                    <Accordion.Header>
                      <h4 className="mb-0">
                        Is one of the largest online shopping website in the
                        world?
                      </h4>
                    </Accordion.Header>
                    <Accordion.Body className="pt-2 pb-2">
                      You can contact our 24x7 customer service by calling
                      02234567890 or by emailing us at
                      Support.Petnation@gmail.com.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item className="mt-4 border-0" eventKey="3">
                    <Accordion.Header>
                      <h4 className="mb-0">
                        Which is the biggest online shopping in India?
                      </h4>
                    </Accordion.Header>
                    <Accordion.Body className="pt-2 pb-2">
                      You can contact our 24x7 customer service by calling
                      02234567890 or by emailing us at
                      Support.Petnation@gmail.com.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item className="mt-4 border-0" eventKey="4">
                    <Accordion.Header>
                      <h4 className="mb-0">
                        What are the benefits of a personal shopper?
                      </h4>
                    </Accordion.Header>
                    <Accordion.Body className="pt-2 pb-2">
                      You can contact our 24x7 customer service by calling
                      02234567890 or by emailing us at
                      Support.Petnation@gmail.com.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item className="mt-4 border-0" eventKey="5">
                    <Accordion.Header>
                      <h4 className="mb-0">
                        Is one of the largest online shopping website in the
                        world?
                      </h4>
                    </Accordion.Header>
                    <Accordion.Body className="pt-2 pb-2">
                      You can contact our 24x7 customer service by calling
                      02234567890 or by emailing us at
                      Support.Petnation@gmail.com.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item className="mt-4 border-0" eventKey="6">
                    <Accordion.Header>
                      <h4 className="mb-0">
                        Which is the biggest online shopping in India?
                      </h4>
                    </Accordion.Header>
                    <Accordion.Body className="pt-2 pb-2">
                      You can contact our 24x7 customer service by calling
                      02234567890 or by emailing us at
                      Support.Petnation@gmail.com.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HelpSupport;
