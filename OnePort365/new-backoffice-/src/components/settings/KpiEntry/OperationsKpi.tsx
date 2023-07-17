import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import SlidingPane from "react-sliding-pane";
import CustomTabs from "components/customTabs/CustomTabs";
import KpiCustomTabs from "components/customTabs/KpiCustomTabs";
import ImportKpiEntry from "./ImportKpi/ImportKpiEntry";
import ExportKpiEntry from "./ExportKpi/ExportKpiEntry";
import LagosTab from "./ImportKpi/ImportKpiPartials/lagosTab";
import KanoTab from "./ImportKpi/ImportKpiPartials/kanoTab";
import OnneTab from "./ImportKpi/ImportKpiPartials/onneTab";

const OperationsKpi = (props: any) => {
    const [tab, setTab] = useState("Import");
    const { isOpen, setIsOpen, loading  } = props;
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
                        <h3 className="text-xl black-text font-bold">Operations KPI Entry </h3>

                        <div className="mt-7">
                            <div className="">
                                <div className="my-5 w-full">
                                    <KpiCustomTabs 
                                        tabs={["Import", "Export"]}
                                        activeTab={tab} 
                                        setActiveTab={setTab} 
                                    />
                                </div>
                                {/* {
                                    tab === "Import" ? (
                                        <ImportKpiEntry />
                                    ) : (
                                        <ExportKpiEntry />
                                    )
                                } */}
                                {
                                    tab === "Import" ? (
                                        <ImportKpiEntry />
                                    ) : tab === "Export" ? (
                                        <ExportKpiEntry />
                                    ) : (
                                        <></>
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

export default OperationsKpi;