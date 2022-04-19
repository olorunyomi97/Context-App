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
  Button
} from "reactstrap" 
  
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"

const Customers   = () => {
  
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Dashboard | Oneport 365 </title> 
          </MetaTags>
          <Container fluid>

          <Row>
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">Customers </CardTitle>
                  

                    <div className="table-rep-plugin">
                      <div
                        className="table-responsive mb-0"
                        data-pattern="priority-columns"
                      >
                    <Button color="primary" onClick={()=>{window.location="/customer/create"}}  type="button">Add Customer <i class="fas fa-plus"></i></Button>

                         <Table className="table mb-0 table-striped table-hover ">
                        <thead>
                        <tr>
                            <th scope="row">ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Company</th>
                            <th>Email (Official Email address)</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>John</td>
                            <td>Doe</td>
                            <td>John Doe Limited</td>
                            <td>john.doe@gmail.com</td>
                            <td>+234810945848</td>
                            <td>
                            <Button color="default" type="button"><i class="fas fa-pencil-alt"></i></Button>
                            <Button color="default" type="button"><i class="fas fa-eye"></i></Button>
                            <Button color="default" type="button"><i class="fas fa-trash"></i></Button>

                            </td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Mary</td>
                            <td>Jane</td>
                            <td>Marycare Stores</td>
                            <td>mary.lay@gmail.com</td>
                            <td>+23481094529292</td>
                            <td>
                            <Button color="default" type="button"><i class="fas fa-pencil-alt"></i></Button>
                            <Button color="default" type="button"><i class="fas fa-eye"></i></Button>
                            <Button color="default" type="button"><i class="fas fa-trash"></i></Button>
                            </td>
                          </tr>
                          
                          
                          <tr>
                            <th scope="row">3</th>
                            <td>John</td>
                            <td>Doe</td>
                            <td>John Doe Limited</td>
                            <td>john.doe@gmail.com</td>
                            <td>+234810945848</td>
                            <td>
                            <Button color="default" type="button"><i class="fas fa-pencil-alt"></i></Button>
                            <Button color="default" type="button"><i class="fas fa-eye"></i></Button>
                            <Button color="default" type="button"><i class="fas fa-trash"></i></Button>

                            </td>
                          </tr>
                          
                          
                          <tr>
                            <th scope="row">4</th>
                            <td>Mary</td>
                            <td>Jane</td>
                            <td>Marycare Stores</td>
                            <td>mary.lay@gmail.com</td>
                            <td>+23481094529292</td>
                            <td>
                            <Button color="default" type="button"><i class="fas fa-pencil-alt"></i></Button>
                            <Button color="default" type="button"><i class="fas fa-eye"></i></Button>
                            <Button color="default" type="button"><i class="fas fa-trash"></i></Button>
                            </td>
                          </tr>
                          

                        </tbody>
                      </Table>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
         

           </Container>
        </div>

      
       </React.Fragment>
    )
 
}

export default Customers;

 

