import React from 'react';
import { Button, Container, Row, Col, Navbar, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Buttonstyle.css';

function Dashoption() {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Container>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/followups">Followups</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/addenq">Add Enquiry</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/allenq">All Enquiry</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/studlist">Student List</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/placerecord">Placement</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/batch">Batch</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/allstaff">Staff</Link>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Dashoption;




// <Container fluid>
// <Row>
//   <Col sm="12">
//     <div className="button-container">
//       <Button color="primary" size="sm" tag={Link} to="/followups">Followups</Button>
//       <Button color="primary" size="sm" tag={Link} to="/addenq">Add Enquiry</Button>
//       <Button color="primary" size="sm" tag={Link} to="/allenq">All Enquiry</Button>
//     </div>
//   </Col>
// </Row>
// </Container>
