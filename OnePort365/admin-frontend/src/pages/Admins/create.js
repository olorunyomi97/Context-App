import React, { Component,useEffect,useState } from "react"
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
  Alert,
  Button,
  Input,
  InputGroup,
} from "reactstrap";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createAdminUser} from "../../store/actions";
import ClipLoader from "react-spinners/ClipLoader";

const AdminCreate   = (props) => {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState(); 

  const {createAdminUser,loading,error,success,message} = props;
   
  useEffect(()=>{
      setFirstname("");
      setLastname("");
      setPhone("");
      setEmail("");
  },[success])
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
                  {error &&  (
                      <Alert color="danger">{error}</Alert>
                    )}
                    {success &&  (
                      <Alert color="danger">Admin User Created Successfully</Alert>
                    )}
                    <CardTitle className="mb-4">Create Admin</CardTitle>

                      
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                          firstname:
                            (firstname),
                          lastname:
                            (lastname),
                          email:
                             (email),
                          phone:
                             (phone),                           
                        }}
                        validationSchema={Yup.object().shape({
                          firstname: Yup.string().required(
                            "Please Enter First name"
                          ),
                          lastname: Yup.string().required(
                            "Please Enter Last name"
                          ),
                          email: Yup.string().required(
                            "Please Enter Email Address"
                          ),
                          phone: Yup.string().required(
                            "Please Enter Phone number"
                          ),
                            
                        })}
                        onSubmit={(values, { resetForm }) => {
                          createAdminUser(values)
                  
                        }}>
                         {({ errors, status, touched }) => (
                    <Form>
                    <Row>
                    <Col md={6}>
                      <div className="mb-3">
                       
                           <Label for="firstname" className="form-label">
                           First name
                              </Label>
                              <Field
                                name="firstname"
                                type="text"
                                className={
                                  "form-control" +
                                  (errors.firstname && touched.firstname
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="firstname"
                                component="div"
                                className="invalid-feedback"
                              />
                      </div>
                      
                    </Col>
                    <Col md={6}>
                    <div className="mb-3">
                      
                    <Label for="lastname" className="form-label">Last name</Label>
                    <Field
                      name="lastname"
                      type="text"
                      className={
                      "form-control" +
                      (errors.lastname && touched.lastname
                      ? " is-invalid"
                      : "")
                      }
                      />
                      <ErrorMessage
                       name="lastname"
                       component="div"
                       className="invalid-feedback"
                        />

                      </div>
                    </Col>
                    </Row>

                      <Row>
                        <Col md={6}>
                          <div className="mb-3">
                  
                    
                    <Label for="email" className="form-label">Email</Label>
                    <Field
                      name="email"
                      type="text"
                      className={
                      "form-control" +
                      (errors.email && touched.email
                      ? " is-invalid"
                      : "")
                      }
                      />
                      <ErrorMessage
                       name="email"
                       component="div"
                       className="invalid-feedback"
                        />

                          </div>
                        </Col>
                        <Col md={6}>
                    <div className="mb-3">
                    <Label for="phone" className="form-label">Phone</Label>
                    <Field
                      name="phone"
                      type="text"
                      className={
                      "form-control" +
                      (errors.phone && touched.phone
                      ? " is-invalid"
                      : "")
                      }
                      />
                      <ErrorMessage
                       name="phone"
                       component="div"
                       className="invalid-feedback"
                        />
                      </div>
                        </Col>
                      </Row>

                      <div>
                    
                        <Row>
                        <Col lg={5}></Col>
                        <Col lg={7}>
                        {
                                loading ? 
                              <div className="justify-content-center text-centerx">
                              <ClipLoader color={"#3AB44A"} loading={true} size={50} />
                            
                                </div>
                                  :
                                  <button type="submit" className="btn btn-primary w-md">
                                  Submit
                                  </button>
                           }
                        
                        
                        </Col>
                        </Row>
               
                      
                 
                      </div>
                      </Form>
                         )}
                    </Formik>
                  </CardBody>
                </Card>
              </Col>

             </Row>

           </Container>
        </div>

      
       </React.Fragment>
    )
 
}

const mapStateToProps = (state) => {
  const { error,loading, success,message } = state.Admin;
  return { error,loading,success,message };
};

export default connect(mapStateToProps, { createAdminUser })(AdminCreate);

 

