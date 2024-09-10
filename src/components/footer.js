import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} AksharPaaul. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
