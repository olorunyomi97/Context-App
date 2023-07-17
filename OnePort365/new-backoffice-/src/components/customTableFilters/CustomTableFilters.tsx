import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

//icons
import filterIcon from "assets/icons/filter.svg";

const CustomTableFilters = (props: any): JSX.Element => {
    // const [departureDate, SetDepartureDate] = useState("");
    const [openFilter, setOpenFilter] = useState(false);

    return (
        <>
            {/* desktop only */}
            <div className="desktop-only">
                <div className="flex items-end">
                    <div className="mt-5">
                        <label className="text-xs filter-text" htmlFor={"shipment_type"}>
                            Shipment Type
                        </label>
                        <div className="">
                            <select className="px-5 py-2 text-xs rounded custom-input w-full inner-filter-text bg-grey" style={{paddingLeft: '8px'}}>
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
                                className="form-input px-4 py-1.5 text-xs custom-input rounded  w-full inner-filter-text bg-grey" 
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
                            className="form-input px-4 py-1.5 text-xs custom-input rounded solid-br w-full inner-filter-text bg-grey" 
                            type="month" 
                            name="month" 
                            defaultValue={"January 2022"} 
                        />
                        </div>
                    </div>

                    <div className="lg:ml-60">
                        <div className="">
                            <input 
                            className="form-input px-4 py-2 custom-input text-xs rounded  w-full inner-filter-text " 
                            type="text" 
                            name="search" 
                            placeholder="Search by ID, Destination" 
                        />
                        </div>
                    </div>
                </div>
            </div>

            {/* mobile filter  */}
            <div className="mobile-only">
                <div className="flex">
                    <div className="">
                        <input className="form-input px-4 py-2 custom-input text-xs rounded w-full black-text " type="text" name="search" placeholder="Search by ID, Destination" />
                    </div>

                    <div className="ml-auto">
                        <div className="solid-br bg-grey px-4 py-1.5 rounded flex" onClick={() => setOpenFilter(true)}>
                            <p className="black-text text-xs">Filter</p>
                            <img src={filterIcon} alt="" className="ml-2" width={15} />
                        </div>
                    </div>
                </div>

                <div className="">
                    {openFilter ? (
                        <>
                            <SlidingPane
                                className="custom-pane"
                                isOpen={openFilter}
                                from="left"
                                hideHeader={true}
                                width="350px"
                                shouldCloseOnEsc={true}
                                onRequestClose={() => {
                                    setOpenFilter(false);
                                }}
                            >
                                <div className="flex items-center">
                                    <p className="black-text text-lg font-semibold">Filter</p>
                                    <i className="ion-ios-close py-1 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer ml-auto" onClick={() => setOpenFilter(false)}></i>
                                </div>

                                <div className="mt-10">
                                    <label className="text-xs black-text" htmlFor={"shipment_type"}>
                                        Shipment Type
                                    </label>
                                    <div className="">
                                        <select name="" id="" className=" px-4 py-1.5 text-xs rounded custom-input  w-full black-text ">
                                            <option value="">please select</option>
                                            <option value="">import</option>
                                            <option value="">export</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="my-4">
                                    <label className="text-xs black-text" htmlFor={"departure_date"}>
                                        Departure Date
                                    </label>
                                    <div className="">
                                        <input className="form-input px-4 py-1.5 text-xs custom-input rounded  w-full black-text " type="date" name="departure_date" defaultValue={"Departure Date"} />
                                    </div>
                                </div>

                                <div className="">
                                    <label className="text-xs black-text" htmlFor={"month"}>
                                        Month
                                    </label>
                                    <div className="">
                                        <input className="form-input px-4 py-1.5 text-xs custom-input rounded solid-br w-full black-text " type="month" name="month" defaultValue={"Departure Date"} />
                                    </div>
                                </div>

                                <div className="my-7 bg-green px-4 py-2 rounded">
                                    <p className="white-text text-xs text-center">Apply</p>
                                </div>
                            </SlidingPane>
                        </>
                    ) : (
                        <> </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CustomTableFilters;
