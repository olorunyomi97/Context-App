import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getContacts, updateStatus } from "store/actions";
import PrimaryButton from "components/buttons/PrimaryButton";
import Moment from 'react-moment';
import ViewMessage from "./modals/viewMessage";
import UpdateModal from "./modals/updateModal";
import documentIcon from "assets/icons/document.svg";

const ClosedMessages = (props:any) => {
    const {loading, contacts, updateStatus} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [messageToshow, setMessageToShow] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    const [dataToUpdate, setDataToUpdate] = useState({});

    console.log(contacts?.data?.data)
    useEffect(() => {
        props.getContacts();
    }, [getContacts])

    return (
        <div className="mt-4">
            {
                loading ? 
                (
                    <div className="text-center my-3">
                        <Link to="#" className="text-success">
                            {/* @ts-ignore */}
                            <PrimaryButton title="Loading Contacts" loading={loading} />
                        </Link>
                    </div>
                ) : <>
                    {
                        contacts?.length === 0 || undefined || null ? (
                            <> 
								<div className="mt-5 flex flex-col item-center justify-center solid-br rounded mobile-dashboar" style={{ minHeight: 500 }}>
                                    <img src={documentIcon} alt="" width={113} height={113} className="mx-auto mt-20" />

                                    <div className="mx-auto my-2"style={{textAlign:'center'}}>
                                        <p className="grey-text my-3">You have not attended to any messages yet</p>
                                    </div>
                                </div>
							</>
                        ) : (
                            <>
                                <table className="desktop-only">
                                    <tr className="pb-5">
                                        <th className="grey-text uppercase text-xs font-semibold text-left pl-3 pb-3 px-10">Fullname</th>
                                        <th className="grey-text mx-2 uppercase text-xs font-semibold text-left px-5 pb-3">Email Address</th>
                                        <th className="grey-text mx-2 uppercase text-xs font-semibold text-left px-5 pb-3">Contact Message</th>
                                        <th className="grey-text mx-2 uppercase text-xs font-semibold text-left px-10 pb-3">Contact Query</th>
                                        <th className="grey-text mx-2 uppercase text-xs font-semibold text-left px-10 pb-3">Message Date</th>
                                        <th className="grey-text mx-2 uppercase text-xs font-semibold text-left pb-3">Contact File</th>
                                        <th className="grey-text mx-2 uppercase text-xs font-semibold text-left px-10 pb-3">Status</th>
                                        {/* <th className="grey-text mx-2 uppercase text-xs font-semibold text-left px-10 pb-3">Action </th> */}
                                    </tr>

                                    {
                                        contacts?.['data']?.['data'].map((data, index) => {
                                            return (
                                                <>

                                                {
                                                    data?.['status'] == 'open' ? (
                                                        <></>
                                                    ) : (
                                                        <>
                                                            <tr className="right-divider top-divider bottom-divider left-divider rounded w-full">
                                                                <td className="py-5 pl-3">
                                                                    <div className="flex items-center">
                                                                        <p className="mx-10 ml-2 black-text font-semibold text-sm"style={{textTransform: 'capitalize'}}>{data?.['contact_fullname']}</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="">
                                                                        <p className=" black-text font-semibold text-sm">{data?.['contact_email_address']}</p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <p className="mx-5 black-text font-semibold text-sm">
                                                                        <p
                                                                            className="green-text"
                                                                            onClick={() => {
                                                                                setMessageToShow(data?.['contact_message']);
                                                                                setIsOpen(true)}
                                                                            }
                                                                        >
                                                                            View Message
                                                                        </p>
                                                                    </p>
                                                                </td>
                                                                {/* <td>
                                                                    <p className="mx-10 black-text font-semibold text-sm">{data?.['contact_phone_number']}</p>
                                                                </td> */}

                                                                <td>
                                                                    <p className="mx-10 black-text font-semibold text-sm"style={{textTransform: 'capitalize'}}>
                                                                        {data?.['contact_query_type']}
                                                                    </p>
                                                                </td>
                                                                <td>
                                                                    <p className="mx-10 black-text font-semibold text-sm"style={{textTransform: 'capitalize'}}>
                                                                        <Moment format="DD-MM-YYYY">{data?.['createdAt']}</Moment>
                                                                    </p>
                                                                </td>
                                                                <td>
                                                                    <p className="mx-10 black-text font-semibold text-sm"style={{textTransform: 'capitalize'}}>
                                                                        {/* {data?.['contact_file_location']} */}
                                                                        {
                                                                            data?.['contact_file_location'] == "" ? (
                                                                                <>
                                                                                    N/A
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <a 
                                                                                        className="green-text"
                                                                                        href={data?.['contact_file_location']}
                                                                                        target="_blank"
                                                                                    >
                                                                                        View
                                                                                    </a>
                                                                                </>
                                                                            )
                                                                        }
                                                                    </p>
                                                                </td>
                                                                <td>
                                                                    <p className="black-text font-semibold text-sm">
                                                                        {data?.['status'] === "open" ? (
                                                                            <Link to="#" className="bg-light-red black-text-2 text-sm py-2 px-3 red-text mx-5 text-center rounded-full">
                                                                                Unattended
                                                                            </Link>
                                                                            ) : (
                                                                                <Link to="#" className="bg-light-green black-text-2 text-sm py-2 px-3 green-text mx-5 text-center rounded-full">
                                                                                    Attended
                                                                                </Link>
                                                                            )
                                                                        }
                                                                    </p>
                                                                </td>
                                                                {/* <td className="px-10">
                                                                    <Link
                                                                        onClick={() => {
                                                                            setDataToUpdate(data?.['_id'])
                                                                            setIsUpdate(true)}
                                                                        }
                                                                        to="#"
                                                                        className="bg-green white-text py-2 px-3 w-full rounded mr-3 "
                                                                        style={{textDecoration: 'none'}}
                                                                        >
                                                                        <small>Update</small>
                                                                    </Link>
                                                                </td> */}
                                                                {/* <td className="px-10">
                                                                    {data?.['status'] == "closed" ? (
                                                                            <></>
                                                                        ) : (
                                                                            <>
                                                                                <Link
                                                                                    onClick={() => {
                                                                                        setDataToUpdate(data?.['_id'])
                                                                                        setIsUpdate(true)}
                                                                                    }
                                                                                    to="#"
                                                                                    className="bg-green white-text py-2 px-3 w-full rounded mr-3 "
                                                                                    style={{textDecoration: 'none'}}
                                                                                    >
                                                                                    <small>Update</small>
                                                                                </Link>
                                                                            </>
                                                                        )
                                                                        
                                                                    }
                                                                    
                                                                </td> */}
                                                            </tr>
                                                        </>
                                                    )
                                                }
                                                    
                                                </>
                                            )
                                    }) 
                                    }
                                    
                                    {/* contact_us && callback */}
                                </table>
                            </>
                        )
                    }
                       
                        <ViewMessage 
                            isOpen={isOpen} 
                            setIsOpen={setIsOpen} 
                            message={messageToshow}
                        />
                        <UpdateModal 
                            isUpdate={isUpdate}
                            setIsUpdate={setIsUpdate}
                            id={dataToUpdate}
                            updateStatus={props.updateStatus}
                        />
                    </>
                
            }
        
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const { contacts, error, loading } = state.contacts;
    return { contacts, error, loading };
};

export default connect(mapStateToProps, {getContacts, updateStatus})(ClosedMessages);
