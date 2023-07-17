import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import DataTable from "react-data-table-component";
import moment from "moment";
import "../../index.css"
import { getContainerStatusHistory } from "store/actions";
import PrimaryButton from "components/buttons/PrimaryButton";
import { getSingleShipment, uploadShipmentDocs } from "store/actions";
import Moment from "react-moment";

const ContainerStatusHistory = (props: any) => {
    const { loading, container_status_history, single_shipment } = props;
    // const single_shipment_data = single_shipment?.data?.data[0];
    // console.log(single_shipment_data)
    const params = useParams();
    const container_status_history_data = container_status_history?.data?.data
    const container_status_history_data_reverse = container_status_history_data?.slice()?.reverse();;
    console.log(container_status_history_data_reverse)
    const [filterHistoryStatus, setFilteredHistoryStatus] = useState([])


    useEffect(() => {
        props.getContainerStatusHistory(params.id);
    }, [])

    useEffect(() => {
        setFilteredHistoryStatus(container_status_history_data_reverse)
    }, [])

    const customStyles = {
        rows: {
            style: {
                minHeight: "50px",
            },
        },
        headCells: {
            style: {
                paddingLeft: "8px",
                paddingRight: "8px",
                backgroundColor: "#f0fdf4",
            },
        },
        cells: {
            style: {
                paddingLeft: "8px",
                paddingRight: "8px",
            },
        },
    };

    const columns = [
        {
            name: "Container Number",
            selector: (row) => {
                return (
                    <div className="uppercase">
                        {row?.container_details[0].container_number === null ? 'N/A' : row?.container_details[0].container_number}
                    </div>
                )
            },
            sortable: true,
        },
        {
            name: "Container Status",
            selector: (row) => {
                return (
                    <div className="bg-light-green green-text py-1 px-2 rounded-full mt-3 mb-3" style={{ marginRight: '10px' }}>
                        <small>{row?.status === null ? 'N/A' : row?.status}</small>
                    </div>
                )
            },
            sortable: true,
        },
        {
            name: "Status Update Date",
            selector: (row) => {
                return (
                    <div className="grey-text">
                        {/* {moment(row?.createdAt).format("LL")} */}
                        <Moment format="DD-MM-YYYY hh:ss a">{row?.createdAt}</Moment>
                    </div>
                )
            },
        },
        {
            name: "Remarks",
            selector: (row) => {
                return (
                    <div>
                        {row?.remarks}
                    </div>
                )
            },
        },
    ];


    const handleSearch = (event) => {
        let value = event;
        const results: any = [];

        container_status_history_data?.filter((container_status_history_data) => {
            if (
                //prettier-ignore
                container_status_history_data?.container_details[0]?.container_number.toLowerCase().includes(value.toLowerCase())
            ) {
                results.push(container_status_history_data);
            }
        });

        setFilteredHistoryStatus(results);
    };

    return (
        <div className="pt-5">
            {
                loading ?
                    (
                        <div className="text-center my-3">
                            <Link to="#" className="text-success">
                                {/* @ts-ignore */}
                                <PrimaryButton title="Loading Shipments" loading={loading} />
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="pt-3 solid-br desktop-only">
                                <DataTable
                                    //@ts-ignore
                                    columns={columns}
                                    data={filterHistoryStatus}
                                    pagination
                                    persistTableHead
                                    responsive
                                    customStyles={customStyles}
                                    actions={
                                        <ActionsMemo
                                            handleSearch={handleSearch}
                                            filterStatus={filterHistoryStatus}
                                        />
                                    }
                                // selectableRows
                                // selectableRowsHighlight={false}
                                // onSelectedRowsChange = {({ selectedRows }) => { 
                                //     updateContainerData( selectedRows) 
                                //     setSelected(selectedRows);
                                // }}
                                />
                            </div>

                            {/* Mobile View */}
                            <div className="bg-grey py-2 mobile-only">
                                {/* <div className="mobile-padding">
                                    <ActionsMemo
                                        handleSearch={handleSearch}
                                        filterStatus={filterHistoryStatus}
                                    />
                                </div> */}
                                {
                                    container_status_history_data?.map((data: any, index: any) => {
                                        return (
                                            <div className="bg-white mb-3" key={index}>

                                                <div className="grid grid-cols-1 gap-4 py-3 px-7 bottom-divider items-center ">
                                                    <div className="">
                                                        <p className="grey-text text-sm">
                                                            <span className="black-text">Container Number: <span className="uppercase">{data?.container_details[0]?.container_number === null ? 'N/A' : data?.container_details[0]?.container_number}</span> </span>
                                                        </p>
                                                        <p className="grey-text text-sm">
                                                            <span className="black-text">Seal Number: <span className="uppercase">{data?.container_details[0]?.shipping_line_seal_number === null ? 'N/A' : data?.container_details[0]?.shipping_line_seal_number}</span></span>
                                                        </p>
                                                        <p className="grey-text text-sm">
                                                            <span className="black-text">Status Update Date:   <Moment format="DD-MM-YYYY hh:ss a">{data?.createdAt}</Moment></span>
                                                        </p>
                                                        <p className="grey-text text-sm">
                                                            <span className="black-text">Container Status: <span className="bg-light-green green-text py-1 px-2 rounded-full mt-3 mb-3">{data?.status === null ? 'N/A' : data?.status}</span></span>
                                                        </p>
                                                        <p className="grey-text text-sm">
                                                            <span className="black-text">Remarks:  {data?.remarks === null ? 'N/A' : data?.remarks}</span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-4 py-3 px-7 bottom-divider items-center">
                                                    <Link
                                                        to=""
                                                        onClick={() => {
                                                            window.location.href = `/customers/customer-shipment/${data?.['_id']}`
                                                        }}
                                                    >
                                                    </Link>

                                                    <div className="">
                                                        <p className="white-text font-semibold text-sm">{data?.['company_name']}</p>
                                                    </div>


                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            {/* Mobile View */}

                        </>
                    )
            }


        </div>
    )
}


// export default ContainerStatusHistory;

const mapStateToProps = (state: any) => {
    const { container_status_history, loading } = state.shipments;
    return { container_status_history, loading };
};

// Table actions
const ActionsMemo = (props: any): JSX.Element => {
    const { handleSearch } = props;
    return (
        <>
            <input
                placeholder="Search By Container Number"
                className="form-input px-4 py-1.5 custom-input w-full black-text w-52 mb-5"
                onChange={(e) => handleSearch(e.target.value)}
            // onChange={(e) => handleSearch(e)}
            />
        </>
    );
};

export default connect(mapStateToProps, { getContainerStatusHistory })(ContainerStatusHistory);
