import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import SlidingPane from "react-sliding-pane";
import CustomTabs from "components/customTabs/CustomTabs";
import PrimaryButton from "components/buttons/PrimaryButton";
import LagosTab from "./ImportKpiPartials/lagosTab";
import KanoTab from "./ImportKpiPartials/kanoTab";
import OnneTab from "./ImportKpiPartials/onneTab";

const ImportKpiKpiEntry = (props:any) => {

    const { handleSubmit, control, formState: { errors }, reset } = useForm();
    const { isOpen, setIsOpen, loading  } = props;
    const [tab, setTab] = useState("Lagos");
    return (
       <>
            <SlidingPane
                className="custom-slider"
                overlayClassName="some-custom-overlay-class"
                isOpen={isOpen}
                hideHeader={true}
                width="756px"
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    setIsOpen(false);
                }}
            >
                <div className="">
                    <i className="ion-ios-arrow-round-back py-1 px-3 bg-grey text-3xl rounded-full black-text cursor-pointer" onClick={() => setIsOpen(false)}></i>

                    <div className="mt-10 px-2">
                        <h3 className="text-xl black-text font-bold">Import KPI Entry </h3>

                        <div className="mt-7">
                            <div className="">
                                <div className="my-5 w-full">
                                    <CustomTabs 
                                        tabs={["Lagos", "Kano", "Onne"]} 
                                        activeTab={tab} 
                                        setActiveTab={setTab} 
                                    />
                                </div>
                                <div style={{textAlign: 'left'}}>
                                    <p>Maximum Number of Days</p>
                                </div>
                                {
                                    tab === "Lagos" ? (
                                        <LagosTab />
                                    ) : tab === "Kano" ? (
                                        <KanoTab />
                                    ) : (
                                        <OnneTab />
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </SlidingPane>
       </>
    )
}

export default ImportKpiKpiEntry;