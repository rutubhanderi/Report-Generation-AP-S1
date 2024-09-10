import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardText, Row, Col } from 'reactstrap';

const DashboardCards = () => {
  return (
    <Row className="my-4">
      <Col md="3" className="d-flex justify-content-center mb-4">
        <Card color="primary" inverse style={{ width: '18rem' }}>
          <CardHeader className="text-center">Students</CardHeader>
          <CardBody className="text-center">
            <CardTitle tag="h5">Total number of students</CardTitle>
            <CardText>12000+</CardText>
          </CardBody>
        </Card>
      </Col>
      <Col md="3" className="d-flex justify-content-center mb-4">
        <Card color="secondary" inverse style={{ width: '18rem' }}>
          <CardHeader className="text-center">Volunteers</CardHeader>
          <CardBody className="text-center">
            <CardTitle tag="h5">Total number of volunteers</CardTitle>
            <CardText>500+</CardText>
          </CardBody>
        </Card>
      </Col>
      <Col md="3" className="d-flex justify-content-center mb-4">
        <Card color="success" inverse style={{ width: '18rem' }}>
          <CardHeader className="text-center">Teachers</CardHeader>
          <CardBody className="text-center">
            <CardTitle tag="h5">Total number of teachers</CardTitle>
            <CardText>100+</CardText>
          </CardBody>
        </Card>
      </Col>
      <Col md="3" className="d-flex justify-content-center mb-4">
        <Card color="danger" inverse style={{ width: '18rem' }}>
          <CardHeader className="text-center">Cities</CardHeader>
          <CardBody className="text-center">
            <CardTitle tag="h5">Number of active cities</CardTitle>
            <CardText>5</CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardCards;
