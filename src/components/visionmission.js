import React from 'react';
import { Card, CardBody, CardHeader, CardText, Row, Col } from 'reactstrap';

const VisionMission = () => {
  return (
    <Row className="my-4 px-3">
      <Col md="6" className="d-flex justify-content-center mb-4">
        <Card color="info" inverse style={{ width: '100%', padding: '1rem', margin: '0 auto' }}>
          <CardHeader className="text-center">Vision</CardHeader>
          <CardBody>
            <CardText className="text-center" style={{ lineHeight: '1.6' }}>
              Our vision is to lead in innovation and sustainability, aiming to make a positive impact on society through our cutting-edge solutions and dedication to excellence.
            </CardText>
          </CardBody>
        </Card> 
      </Col>
      <Col md="6" className="d-flex justify-content-center mb-4">
        <Card color="info" inverse style={{ width: '100%', padding: '1rem', margin: '0 auto' }}>
          <CardHeader className="text-center">Mission</CardHeader>
          <CardBody>
            <CardText className="text-center" style={{ lineHeight: '1.6' }}>
              Our mission is to provide high-quality services and products that exceed customer expectations, fostering a culture of continuous improvement and dedication.
            </CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default VisionMission;
