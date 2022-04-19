import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Alert, Card, CardBody, Col, Container, Row, Label } from "reactstrap";
import OTPInput, { ResendOTP } from "otp-input-react";
// import { AvForm, AvField } from "availity-reactstrap-validation"
// Redux
import { connect } from "react-redux";
import { Link, useHistory} from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
// actions
import { loginUser,clearErrors,verifyOTP, resendOTP} from "../../store/actions";
import ClipLoader from "react-spinners/ClipLoader";
import logoDark from "../../assets/images/oneport-logo.png";

const Login  =  (props)=> {
 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [tokenStep, setTokenStep] = useState(1);
  const [OTP, setOTP] = useState("");
  const [OTPostData, setOTPostData] = useState([]);
  const { loginUser,loading, error,clearErrors, verifyOTP,resendOTP} = props;
    
  const history = useHistory();

  useEffect(() => {
    clearErrors();
  }, [tokenStep]);
  
  const verifyLoginOTP = (values) =>{ 
    let  data = {
      email:OTPostData.email,
      verify_token:OTPostData.verify_token,
      otp_code:values.OTP,
    };
      verifyOTP(data)

  }
  const resendOTPPost = () =>{
     let  data = {
      email:OTPostData.email,
      verify_token:OTPostData.verify_token
    };
    resendOTP(data);
      clearErrors();
  }
  const renderButton = (buttonProps) => {
    return (
      <button {...buttonProps} className="btn">
        {"Resend"}
      </button>
    );
  };
    
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
				<div className="row">
					<div className="col-md-2"></div>
					<div className="col-8 mb-3">
						<img 
							className="img-fluid"
							src={logoDark} 
							alt="logo"  
							width='100%' 
							height='100%'
							style={{justifyContent: 'center'}}
						/>
					</div>
					<div className="col-md-2"></div>
				</div>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      	<Col className="col-7">
							{ tokenStep ==1 ?
								<div className="text-primary p-4">
									<h5 className="text-primary">Welcome Back !</h5>
									<p>Sign in to continue to Oneport 365</p>
								</div>
							:
								<div className="text-primary p-4">
									<h5 className="text-primary">OTP Verification</h5>
									<p>Enter the OTP that was sent to your email.  </p>
								</div>
							}
                      	</Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div className="auth-logo">
                      <Link to="/" className="auth-logo-light">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logoDark}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                      
                    </div>
                    <div className="p-2">
                    {error &&  (
                      <Alert color="danger">{error}</Alert>
                    )}
                    {
                      tokenStep ==1 ? 
                      <Formik
                        enableReinitialize={true}
                        initialValues={{
                          email:
                            (email),
                          password:
                            (password),
                        }}
                        validationSchema={Yup.object().shape({
                          email: Yup.string().required(
                            "Please Enter Your Email"
                          ),
                          password: Yup.string().required(
                            "Please Enter Valid Password"
                          ),
                        })}
                        onSubmit={values => {
                          loginUser(values, setTokenStep,setOTPostData);
                        }}
                      >
                        {({ errors, status, touched }) => (
                         
                          <Form className="form-horizontal">
                            <div className="mb-3">
                              <Label for="email" className="form-label">
                                Email
                              </Label>
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
                            <div className="mb-3">
                              <Label for="password" className="form-label">
                                Password
                              </Label>
                              <div className="input-group auth-pass-inputgroup">
                                <Field
                                  name="password"
                                  type="password"
                                  autoComplete="true"
                                  className={
                                    "form-control" +
                                    (errors.password && touched.password
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <button
                                  className="btn btn-light "
                                  type="button"
                                  id="password-addon"
                                >
                                  <i className="mdi mdi-eye-outline"></i>
                                </button>
                              </div>
                              <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback"
                            />
                            </div>
                            
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customControlInline"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customControlInline"
                              >
                                Remember me
                              </label>
                            </div>

                            <div className="mt-3 d-grid">
                              {
                                loading ? 
                              <div className="justify-content-center text-center">
                            <ClipLoader color={"#3AB44A"} loading={true} size={50} />
                            
                                </div>
                                  :
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                              >
                                Log In 
                              </button>
                           }
                            </div>

                            <div className="mt-4 text-center">
                            </div>
                          </Form>
                        )}
                      </Formik>
                        :
                        <>
                          <Formik
                        enableReinitialize={true}
                        initialValues={{
                          OTP:
                            (OTP)
                        }}
                        validationSchema={Yup.object().shape({
                          OTP: Yup.string().required(
                            "Please Enter OTP"
                          )
                        })}
                        onSubmit={values => {
                          verifyLoginOTP(values);
                        }}>
                        {({ errors, status, touched }) => (
                         
                          <Form className="form-horizontal">
                            <div className="mb-3">
                              <Label for="otpValue" className="form-label">
                              
                              </Label>
                      <div className="align-center">
                      <OTPInput value={OTP}  onChange={setOTP} autoFocus OTPLength={6} otpType="number"  disabled={false} secure />
                      <ResendOTP renderButton={renderButton} onResendClick={() => {resendOTPPost()}} />
                      
                      </div>
                     
                            </div>
                           
                       
                            <div className="mt-3 d-grid">
                            
                              {
                                loading ? 
                              <div className="justify-content-center text-center">
                            <ClipLoader color={"#3AB44A"} loading={true} size={50} />

                                </div>
                                  :
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                              >
                              Continue
                                  </button>
                              }
                            </div>

                            <div className="mt-4 text-center">
                             </div>

                     
                          </Form>
                        )}
                      </Formik>
                    
                        </>
                  
                      }
                 </div>
                  </CardBody>
                </Card>
                
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
 
} 
 
const mapStateToProps = (state) => {
  const { error,loading } = state.Login;
  return { error,loading };
};

export default connect(mapStateToProps, { loginUser ,clearErrors,verifyOTP,resendOTP})(Login);
