import React from "react";
import { Container } from "react-bootstrap";

function TermsConditions() {
  return (
    <div>
      <div>
        <div>
          {/* Terms and Conditions Section */}
          {/* <div
            style={{
              backgroundColor: "#1a6896",
            }}
            className="p-5"
          >
            <Container>
              <h1 className=" fs-2hx text-center  mb-0 text-white">
                Terms & Conditions
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
              Welcome to Pet Nation! These terms and conditions outline the
              rules and regulations for the use of our website and services. By
              accessing this website, we assume you accept these terms and
              conditions. Do not continue to use Pet Nation if you do not agree
              to all the terms and conditions stated on this page.
            </p>

            <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
              Use of Website
            </h3>
            <p className="fs-4">
              By using our website, you confirm that you are at least 18 years
              old or have parental consent to use our services. You agree not to
              misuse our services, engage in any illegal activities, or attempt
              to disrupt the website's operations. Any unauthorized use of this
              website may result in legal consequences.
            </p>

            <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
              Intellectual Property
            </h3>
            <p className="fs-4">
              All content on Pet Nation, including text, graphics, logos,
              images, and software, is the property of Pet Nation or its content
              suppliers and is protected by international copyright laws. You
              may not use, reproduce, or distribute any content without prior
              written permission from us.
            </p>

            <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
              Limitation of Liability
            </h3>
            <p className="fs-4">
              Pet Nation will not be liable for any damages that arise from the
              use of, or inability to use, our website. This includes, but is
              not limited to, direct, indirect, incidental, punitive, and
              consequential damages. We do not guarantee the accuracy,
              completeness, or reliability of any content available on the
              website.
            </p>

            <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
              Third-Party Links
            </h3>
            <p className="fs-4">
              Our website may contain links to third-party websites or services
              that are not owned or controlled by Pet Nation. We have no control
              over, and assume no responsibility for, the content, privacy
              policies, or practices of any third-party websites. You
              acknowledge and agree that Pet Nation is not responsible for any
              damage or loss caused by your use of any third-party websites or
              services.
            </p>

            <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
              Termination
            </h3>
            <p className="fs-4">
              We reserve the right to terminate your access to our website at
              any time, without notice, for any reason, including but not
              limited to a breach of these terms and conditions. Upon
              termination, all provisions of this agreement that should survive
              termination will remain in effect, including, but not limited to,
              ownership provisions, warranty disclaimers, and limitations of
              liability.
            </p>

            <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
              Governing Law
            </h3>
            <p className="fs-4">
              These terms and conditions are governed by and construed in
              accordance with the laws of [Your Jurisdiction]. You agree to
              submit to the exclusive jurisdiction of the courts in that
              location for any disputes or legal matters arising out of the use
              of our services.
            </p>

            <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
              Changes to Terms
            </h3>
            <p className="fs-4">
              Pet Nation reserves the right to modify these terms and conditions
              at any time. Changes will be posted on this page, and your
              continued use of the website signifies your acceptance of any
              updates. It is your responsibility to review these terms
              periodically for any changes.
            </p>

            <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
              Contact Us
            </h3>
            <p className="fs-4">
              If you have any questions about these terms and conditions, please
              contact us at [Contact Information].
            </p>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;
