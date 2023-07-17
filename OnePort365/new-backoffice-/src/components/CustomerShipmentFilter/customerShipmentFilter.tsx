import { useState, useEffect } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import filterIcon from "assets/icons/filter.svg";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PrimaryButton from "components/buttons/PrimaryButton";
import { getSingleCustomer } from "store/actions";


const CustomerShipmentFilters = (props: any): JSX.Element => {
    const params = useParams();
	const { loading, single_customer } = props;
    const [openFilter, setOpenFilter] = useState(false);
    // console.log(params);
    // console.log(single_customer['data']?.['data']?.['customer_data']);
    const customer_data = single_customer['data']?.['data']?.['customer_data']

    useEffect(() => {
        props.getSingleCustomer(params.id);
    }, [getSingleCustomer]);

    return (
        <>
            {/* desktop only */}
            <div className="desktop-only">
            {loading ? 
                (
                    <div className="text-center my-3">
                        <Link to="#" className="text-success">
                            {/* @ts-ignore */}
                            {/* <PrimaryButton title="Loading Customer Details" loading={loading} /> */}
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* {
                            customer_data.map((data) => {
                                return ( */}
                                    <div className="flex items-end">
                                        <div style={{marginBottom:"8px"}}>
                                            <Link
                                                // customer_data = {customer_data}
                                                // to={`/shipment-creation-for-customer?user_id=${customer_data._id}`}
                                                to={`/shipment-creation-for-customer?user_id=${customer_data._id}`}
                                                state={{
                                                    firstname: customer_data.firstname,
                                                    lastname: customer_data.lastname,
                                                    data: customer_data._id
                                                }}
                                                style={{textDecoration: 'none', marginBottom:"20px"}}
                                                
                                                className="bg-green white-text text-sm px-4 w-full rounded mb-2 shipment-filter-button"
                                            >
                                                Add Shipment+
                                            </Link>
                                        </div>
                                        <div className="mt-5">
                                            <label className="text-xs filter-text pl-3" htmlFor={"shipment_type"}>
                                                Shipment Type
                                            </label>
                                            <div className="pl-3">
                                                <select className="px-2 py-2 text-xs rounded custom-input  w-full inner-filter-text bg-grey">
                                                    <option value="">Please Select</option>
                                                    <option value="">Import</option>
                                                    <option value="">Export</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mx-4">
                                            <label className="text-xs filter-text" htmlFor={"departure_date"}>Departure Date</label>
                                            <div className="">
                                                <input 
                                                    className="form-input px-2 py-2 text-xs custom-input rounded  w-full inner-filter-tex bg-grey" 
                                                    type="date" 
                                                    name="departure_date" 
                                                    defaultValue={"Departure Date"} 
                                                />
                                            </div>
                                        </div>

                                        <div className="">
                                            <label className="text-xs filter-text" htmlFor={"month"}>Month</label>
                                            <div className="">
                                                <input 
                                                    className="form-input px-2 py-2 text-xs custom-input rounded solid-br w-full inner-filter-text bg-grey" 
                                                    type="month"
                                                    name="month" 
                                                    defaultValue={"Departure Date"} 
                                                />
                                            </div>
                                        </div>

                                        <div className="lg:ml-12">
                                            <div className="">
                                                <input 
                                                    className="form-input px-2 py-3 custom-input text-xs rounded  w-full inner-filter-text " 
                                                    type="text" 
                                                    name="search" 
                                                    placeholder="Search by ID" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                {/* )
                            }
                        )} */}
                        
                    </>
                )
            }
            </div>

            
        </>
    );
};

// export default CustomerShipmentFilters;

const mapStateToProps = (state: any) => {
    const { single_customer, loading } = state.customers;
    return { single_customer, loading };
};

export default connect(mapStateToProps, { getSingleCustomer })(CustomerShipmentFilters);

