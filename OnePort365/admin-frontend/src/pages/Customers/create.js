import React, { Component } from "react"
import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle, 
  Label,
  Button,
  Form,
  Input,
  InputGroup,
} from "reactstrap" 
  
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"

const CustomersCreate   = () => {
 
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Dashboard | Oneport 365 </title> 
          </MetaTags>
          <Container fluid>

          <Row>
        
              <Col lg={10}>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">Create Customer</CardTitle>

                    <Form>
                    
                    <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <Label>First name</Label>
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Enter First Name"
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Label>Last name</Label>
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Enter Last Name"
                        />
                      </div>
                    </Col>
                    </Row>

                      <Row>
                        <Col md={6}>
                          <div className="mb-3">
                            <Label htmlFor="formrow-email-Input">Company</Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter Your Company"
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                        <div className="mb-3">
                            <Label htmlFor="formrow-email-Input">Email (Official Email address)</Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter Email address"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label>Phone Number</Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter Phone Number"
                            />
                          </div>
                        </Col>
                      
                      </Row>
 
                      <div>
                    
                        <Row>
                        <Col lg={5}></Col>
                        <Col lg={7}>
                        
                            <button type="submit" className="btn btn-primary w-md">
                            Submit
                            </button>
                        </Col>
                        </Row>
               
                      
                 
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>

             </Row>

           </Container>
        </div>

      
       </React.Fragment>
    )
 
}

export default CustomersCreate;

 

