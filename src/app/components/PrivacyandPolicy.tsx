import React from "react";
import { Container } from "react-bootstrap";

const PrivacyandPolicy = () => {
  return (
    <div>
      <div>
        {/* <div
          style={{
            backgroundColor: "#1a6896",
          }}
          className="p-5"
        >
          <Container>
            <h1 className=" fs-2hx text-center  mb-0 text-white">
              Privacy And Policy
            </h1>
          </Container>
        </div> */}
        <Container
          style={{ maxWidth: "1000px" }}
          className="py-5 space_grotesk"
        >
          <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-2 fw-bold">
            Introduction
          </h3>
          <p className="fs-4">
            At Pet Nation , we are committed to protecting your privacy. This
            Privacy Policy outlines how we collect, use, and safeguard your
            personal information. By using our website and services, you agree
            to the terms of this policy.
          </p>

          <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
            Information We Collect
          </h3>
          <p className="fs-4">
            We may collect personal information such as your name, email
            address, phone number, and other relevant details when you sign up
            for our services, request a quote, or contact us for inquiries
            related to our Pet Nation products.
          </p>

          <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
            How We Use Your Information
          </h3>
          <p className="fs-4">
            Your information is used to provide and improve our services,
            process orders, communicate with you, and send updates about our Pet
            Nation products and services. We may also use your information to
            comply with legal obligations.
          </p>

          <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
            Data Security
          </h3>
          <p className="fs-4">
            We implement a variety of security measures to maintain the safety
            of your personal information. However, no method of transmission
            over the Internet is 100% secure, and we cannot guarantee its
            absolute security.
          </p>

          <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
            Third-Party Disclosure
          </h3>
          <p className="fs-4">
            We do not sell, trade, or otherwise transfer your personal
            information to outside parties, except for trusted third parties who
            assist us in operating our website and conducting our business, as
            long as those parties agree to keep this information confidential.
          </p>

          <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
            Your Consent
          </h3>
          <p className="fs-4">
            By using our site, you consent to our Privacy Policy. If we decide
            to change our policy, we will post those changes on this page.
          </p>

          <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
            Contact Us
          </h3>
          <p className="fs-4">
            If you have any questions about our Privacy Policy, you can contact
            us at [Contact Information].
          </p>
        </Container>
      </div>
    </div>
  );
};

export default PrivacyandPolicy;
