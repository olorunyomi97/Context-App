import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import DataTable from "react-data-table-component";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import ShipmentDropdown from "components/shipmentDropdown/shipmentDropdown";
import PrimaryButton from "components/buttons/PrimaryButton";
import PaymentStatusModal from './partials/paymentStatus';
import { getSingleLoanApplication } from "store/actions";

const LoanDetails = (props: any) => {
    const params = useParams();
    const { single_loan_application, loading } = props
	console.log(single_loan_application)
    const [isOpen, setIsOpen] = useState(false);
    const [openAside, SetOpenAside] = useState(false);

    useEffect(() => {
        props.getSingleLoanApplication(params.id)
    }, [])


    return (
         <>
            <div className="lg:flex">
                <Aside 
					activeTab="Loan Applications" 
					openAside={openAside}
					SetOpenAside={SetOpenAside}
				/>
                <div className="">
                    <TopBar title={"Loan Application"}  SetOpenAside={SetOpenAside}/>
					<div className="dashboard-content">
						<div className="lg:px-10 lg:pt-5 container mx-auto w-full">
                        {
                            loading ? 
                            (
                                <div className="text-center my-3">
                                    <Link to="#" className="text-success">
                                        {/* @ts-ignore */}
                                        <PrimaryButton title="Loading Loan Applications" loading={loading} />
                                    </Link>
                                </div> 
                            ) : (
                                <>
                                    <div>
                                        <div className="lg:pb-3 lg:pt-3 grid grid-cols-2 gap-4">
                                            <div className="mt-2">
                                                <p className='font-semibold text-lg pl-3'>Incoice ID: <span className="green-text">{single_loan_application[0].job_number} </span></p>
                                            </div>
                                            <div className="mt-2 ml-auto" style={{textAlign:'right'}}>
                                                <small>Loan Provider </small><small style={{color: 'grey'}}> : Exinversa</small>
                                            </div>
                                        </div>
                                    </div>
                                    <>
                                        <div className="grid grid-cols-3 items-center p-5 bg-green lg:rounded-lg">
                                            <div className="">
                                                <p className="white-text text-sm"> Loan Provider : Exinversa</p>
                                                <p className="white-text text-sm capitalize"> Loan Party Status : {single_loan_application[0].loan_status}</p>
                                            </div>

                                            <div className="text-center"></div>
                                            
                                            <div className="flex items-center"> </div>
                                        </div>

                                        <div className="mt-5 container mx-auto w-full mb-5">
                                            {
                                                single_loan_application[0].loan_status === 'accepted' ? (
                                                    <>
                                                        <div className="flex items-center mb-3">
                                                            <Link
                                                                to=""
                                                                className="bg-green py-3 px-3 rounded ml-auto text-sm white-text"
                                                                onClick={()=>{
                                                                    setIsOpen(true)
                                                                }}
                                                            >
                                                                Update Loan Payment Status
                                                            </Link>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex items-center mb-3">
                                                            <Link
                                                                to=""
                                                                className="not-allowed bg-green py-3 px-3 rounded ml-auto text-sm white-text"
                                                                style={{ opacity:'0.5'}}
                                                            >
                                                                Update Loan Payment Status
                                                            </Link>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            
                                            <div className="mt-5 top-divider left-divider right-divider rounded-t-lg">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Invoce Number</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_loan_application[0].invoice_id.job_number}</p>
                                                </div>
                                            </div>
                                            {/* <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Loan Number</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_loan_application[0].job_number}</p>
                                                </div>
                                            </div> */}
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Invoice Account Name</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_loan_application[0].invoice_id.invoice_account_details[0].account_name}</p>
                                                </div>
                                            </div>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Invoice Account Number</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_loan_application[0].invoice_id.invoice_account_details[0].account_no}</p>
                                                </div>
                                            </div>

                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Invoice Bank Name</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_loan_application[0].invoice_id.invoice_account_details[0].bank_name}</p>
                                                </div>
                                            </div>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Company Name</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_loan_application[0].user_id.company_name}</p>
                                                </div>
                                            </div>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Contact Person Email</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_loan_application[0].user_id.email}</p>
                                                </div>
                                            </div>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Contact Person Fullname</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_loan_application[0].user_id.firstname} {single_loan_application[0].user_id.lastname}</p>
                                                </div>
                                            </div>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Company Address</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_loan_application[0].user_id.company_address}</p>
                                                </div>
                                            </div>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Loan Date</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_loan_application[0].invoice_id.createdAt.slice(0,10)}</p>
                                                </div>
                                            </div>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Loan Amount</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_loan_application[0].loan_amount}</p>
                                                </div>
                                            </div>

                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Loan Status</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_loan_application[0].loan_status}</p>
                                                </div>
                                            </div>

                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Invoice Status</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_loan_application[0].invoice_id.invoice_status}</p>
                                                </div>
                                            </div>

                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Loan Tenure</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_loan_application[0].loan_tenure} Weeks</p>
                                                </div>
                                            </div>
                                            
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Loan Provider Selected</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize"></p>
                                                </div>
                                            </div>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5">Loan Payoff Days</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize"></p>
                                                </div>
                                            </div>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 capitalize">Extension Requested</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize"></p>
                                                </div>
                                            </div>
                                            <div className="solid-br ">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Loan status</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize"></p>
                                                </div>
                                            </div>
                                            
                                                    
                                        </div>
                                        
                                        <PaymentStatusModal 
                                            isOpen={isOpen} 
                                            setIsOpen={setIsOpen}
                                        />
									</>
                                </>
                            )
                        }
						

							{/* {
								loading ? 
								(
									<div className="text-center my-3">
										<Link to="#" className="text-success">
											@ts-ignore
											<PrimaryButton title="Loading Loan Applications" loading={loading} />
										</Link>
									</div>
								) : (
									<>
                                        <div className="grid grid-cols-3 items-center p-5 bg-green lg:rounded-lg">
                                            <div className="">
                                                <p className="white-text text-sm"> Loan Provider : Exinversa</p>
                                                <p className="white-text text-sm"> Loan Party Status : Accepted</p>
                                            </div>

                                            <div className="text-center"></div>
                                            
                                            <div className="flex items-center"> </div>
                                        </div>

                                        <div className="mt-5 container mx-auto w-full mb-5">
                                            <div className="mt-5 top-divider left-divider right-divider rounded-t-lg">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Invoce Number</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 "></p>
                                                </div>
                                            </div>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Loan Number</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 "></p>
                                                </div>
                                            </div>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Loan Date</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 "></p>
                                                </div>
                                            </div>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Loan Amount</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 "></p>
                                                </div>
                                            </div>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Loan Provider Selected</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 "></p>
                                                </div>
                                            </div>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5">Loan Payoff Days</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5"></p>
                                                </div>
                                            </div>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 capitalize">Extension Requested</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 "></p>
                                                </div>
                                            </div>
                                            <div className="solid-br ">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">Loan status</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 "></p>
                                                </div>
                                            </div>
                                            
                                                    
                                        </div>
                                        
                                        <PaymentStatusModal 
                                            isOpen={isOpen} 
                                            setIsOpen={setIsOpen}
                                        />
									</>
								) 

							} */}
						</div>
					</div>
                </div>
            </div>
        </>
    )
}

// export default LoanDetails; 
const mapStateToProps = (state: any) => {
    const { single_loan_application, loading } = state.loanApplications;
    return { single_loan_application, loading };
};

export default connect(mapStateToProps, { getSingleLoanApplication })(LoanDetails);
