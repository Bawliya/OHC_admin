import React from "react";
import { Container } from "react-bootstrap";

const AboutUs = () => {
  return (
    <div>
      <div> 
        <div>
          {/* About Us Section
          // <div
          //   style={{
          //     backgroundColor: "#1a6896",
          //   }}
          //   className="p-5"
          // >
          //   <Container>
          //     <h1 className=" fs-2hx text-center  mb-0 text-white">About Us</h1>
          //   </Container>
          // </div> */}
          <Container
            style={{ maxWidth: "1000px" }}
            className="py-5 space_grotesk"
          >
            <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-2 fw-bold">
              Who We Are
            </h3>
            <p className="fs-4">
              Pet Nation is a community of passionate pet owners, driven by a
              love for animals and a commitment to providing the best care for
              pets everywhere. We understand that pets are more than just
              animals—they are part of your family, and they deserve the very
              best. That's why we’ve created a one-stop platform to meet all
              your pet-related needs, from food and accessories to grooming and
              healthcare services.
            </p>

            <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
              Our Mission
            </h3>
            <p className="fs-4">
              At Pet Nation, our mission is simple: to improve the quality of
              life for pets and their owners. We strive to provide pet lovers
              with the best products, resources, and services, ensuring that
              every pet receives the love, care, and attention they deserve. We
              aim to make pet care more accessible, reliable, and enjoyable for
              everyone.
            </p>

            <h3 style={{ color: "#1a6896" }} className=" fs-1  pt-5 fw-bold">
              Why Choose Us
            </h3>
            <p className="fs-4">
              Choosing Pet Nation means choosing a trusted partner for all your
              pet care needs. Our team of experts carefully selects every
              product and service to ensure it meets our high standards of
              quality, safety, and reliability. Whether you are a first-time pet
              owner or a seasoned pro, we offer personalized guidance and
              support to make sure you and your pet have the best experience
              possible. Our commitment to customer satisfaction is at the heart
              of everything we do.
            </p>
          </Container>

          {/* Privacy and Policy Section */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
