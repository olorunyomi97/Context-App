import React from 'react';
import { Link } from "react-router-dom";
import PrimaryButton from "components/buttons/PrimaryButton";
import OceanExportShipmentForm from './OceanFreightComponent/OceanAndExport/OceanExportShipmentForm';
import OceanImportShipmentForm from './OceanFreightComponent/OceanAndImport/OceanImportShipmentForm';
import SecondaryButton from "components/buttons/SecondaryButton";
import ExportHaulageForm from './HaulageComponent/ExportAndHaulage/ExportAndHaulage';
import ImportHaulageForm from './HaulageComponent/ImportAndHaulage/ImportAndHaulage';
import oops from "assets/images/oops.jpeg";
import DTDExportAirfreightForm from './AirFreightComponent/AirAndExport/DTDExportAirfreightForm';
import ADExportAirFreightForm from './AirFreightComponent/AirAndExport/ADExportAirFreightForm';
import DTDImportAirFreightForm from './AirFreightComponent/AirAndImport/DTDImportAirFreightForm';
import ADImportAirFreightForm from './AirFreightComponent/AirAndImport/ADImportAirFreightForm';
import ExportWarehousing from './WarehousingComponent/ExportAndWarehousing/ExportAndWarehousing'
import ImportWarehousing from './WarehousingComponent/ImportAndWarehousing/ImportAndWarehousing'
import ExportCBT from './CBTComponent/ExportAndCBT/ExportAndCBT'
import ImportCBT from './CBTComponent/ImportAndCBT/ImportAndCBT'


const shipmentAndTransportCombo = (props: any) => {
    const { loading, nextStep, previousStep } = props;
    console.log(props);

    return (
        <div>
            {
                loading ?
                    (
                        <div className="text-center my-3">
                            <Link to="#" className="text-success">
                                {/* @ts-ignore */}
                                <PrimaryButton title="Loading Combination" loading={loading} />
                            </Link>
                        </div>
                    ) : (
                        <>
                            {
                                props.shipmentType === 'export' && props.transportationType === 'Ocean Freight' ? (
                                    <>
                                        <OceanExportShipmentForm />
                                    </>
                                ) : props.shipmentType === 'import' && props.transportationType === 'Ocean Freight' ? (
                                    <>
                                        <OceanImportShipmentForm />
                                    </>
                                ) : props.shipmentType === 'export' && props.transportationType === 'Haulage' ? (
                                    <>
                                        <ExportHaulageForm />
                                    </>
                                ) : props.shipmentType === 'import' && props.transportationType === 'Haulage' ? (
                                    <>
                                        <ImportHaulageForm />
                                    </>

                                ) : props.shipmentType === 'import' && props.transportationType === 'Air Freight' && props.airFreightType === "Door to Door" ? (
                                    <>
                                        <DTDImportAirFreightForm />
                                    </>
                                ) : props.shipmentType === 'import' && props.transportationType === 'Air Freight' && props.airFreightType === "Airport Delivery" ? (
                                    <>
                                        <ADImportAirFreightForm />
                                    </>
                                ) : props.shipmentType === 'export' && props.transportationType === 'Air Freight' && props.airFreightType === "Door to Door" ? (
                                    <>
                                        <DTDExportAirfreightForm />
                                        {/* <ExportAirFreightType /> */}
                                    </>
                                ) : props.shipmentType === 'export' && props.transportationType === 'Air Freight' && props.airFreightType === "Airport Delivery" ? (
                                    <>
                                        <ADExportAirFreightForm />
                                    </>
                                ) : props.shipmentType === "export" && props.transportationType === "Warehousing" ? (
                                    <>
                                        <ExportWarehousing />
                                    </>
                                ) : props.shipmentType === "import" && props.transportationType === "Warehousing" ? (
                                    <>
                                        <ImportWarehousing />
                                    </>
                                ) : props.shipmentType === "export" && props.transportationType === "CBT" ? (
                                    <>
                                        <ExportCBT />
                                    </>

                                ) : props.shipmentType === "import" && props.transportationType === "CBT" ? (
                                    <>
                                        <ImportCBT />
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col item-center justify-center rounded mobile-dashboard">
                                            <img src={oops} alt="" width='50%' height='65%' className="mx-auto" />

                                            <div
                                                className="mx-auto my-2"
                                                style={{ textAlign: 'center' }}
                                            >
                                                <p className="grey-text mt-3">Seems like you selected neither a  <span className='green-text font-semibold'>Shipment Type</span> and a <span className='green-text font-semibold'>Mode of Transportation</span></p>
                                                <p className="grey-text">Please click the button below to go back and select a  <span className='green-text font-semibold'>Shipment Type</span> and a <span className='green-text font-semibold'>Mode of Transportation</span></p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 py-14 items-center">
                                            <div></div>
                                            <div className="w-22">
                                                {/* @ts-ignore */}
                                                <SecondaryButton
                                                    title="Previous Step"
                                                    icon="ion-ios-arrow-round-back"
                                                    onClick={previousStep}
                                                />
                                            </div>
                                            <div></div>
                                        </div>
                                    </>
                                )
                            }
                        </>
                    )
            }
        </div>
    )
}

export default shipmentAndTransportCombo