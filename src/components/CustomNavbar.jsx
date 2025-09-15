import aalto_it from "../assets/aalto_it.png";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function CustomNavbar() {
  return (
    <Navbar
      expand="lg"
      className="px-3 align-items-center sticky-top justify-content-center"
      style={{ backgroundColor: "#5A3A76" }}
    >
      <Container>
        <Navbar.Brand>
          <img src={aalto_it} alt="aalto_it" height="40" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
