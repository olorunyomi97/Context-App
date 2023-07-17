import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import OceanExportEdit from './OceanAndExport/edit';
// import OceanImportEdit from './OceanAndImport/edit';
// import ExportHaulageEdit from './ExportAndHaulage/edit';
// import ImportHaulageEdit from './ImportAndHaulage/edit';

const DynamicShipmentEdit = (props: any) => {
	const params = useParams();
	const { single_shipment } = props;
	const single_shipment_data = single_shipment?.data?.data?.shipment_data;
	console.log(single_shipment_data);

	return (
		<div>
			<div className="p-2 flex items-center">


				{/* ***** Ocean ***** */}
				{single_shipment_data?.shipment_transport_type === "ocean_freight" && single_shipment_data?.shipment_type === "export" ? (
					<Link
						to=""
						onClick={() => {
							window.location.href = `/shipments/edit-oceanfreight-export-shipment/${params.id}`;
						}}
						className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
					>
						Edit
					</Link>
				) : single_shipment_data?.shipment_transport_type === "ocean_freight" && single_shipment_data?.shipment_type === "import" ? (
					<Link
						to=""
						onClick={() => {
							window.location.href = `/shipments/edit-oceanfreight-import-shipment/${params.id}`;
						}}
						className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
					>
						Edit
					</Link>
				) : single_shipment_data?.shipment_transport_type === "haulage" && single_shipment_data?.shipment_type === "export" ? (
					<Link
						to=""
						onClick={() => {
							window.location.href = `/shipments/edit-haulage-export-shipment/${params.id}`;
						}}
						className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
					>
						Edit
					</Link>
				) : single_shipment_data?.shipment_transport_type === "haulage" && single_shipment_data?.shipment_type === "import" ? (
					<Link
						to=""
						onClick={() => {
							window.location.href = `/shipments/edit-haulage-import-shipment/${params.id}`;
						}}
						className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
					>
						Edit
					</Link>
					// EXPORT & AIR DELIVERY
				) : single_shipment_data?.shipment_transport_type === "air_freight" && single_shipment_data?.shipment_type === "export" && single_shipment_data?.air_freight_type === "airport delivery" ? (
					<Link
						to=""
						onClick={() => {
							window.location.href = `/shipments/export-airfreight-airport-delivery-edit/${params.id}`;
						}}
						className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
					>
						Edit
					</Link>

				) : single_shipment_data?.shipment_transport_type === "air_freight" && single_shipment_data?.shipment_type === "export" && single_shipment_data?.air_freight_type === "door to door" ? (
					<Link
						to=""
						onClick={() => {
							window.location.href = `/shipments/export-airfreight-door-to-door-edit/${params.id}`;
						}}
						className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
					>
						Edit
					</Link>

				) : single_shipment_data?.shipment_transport_type === "air_freight" && single_shipment_data?.shipment_type === "import" && single_shipment_data?.air_freight_type === "airport delivery" ? (
					<Link
						to=""
						onClick={() => {
							window.location.href = `/shipments/import-airfreight-airport-delivery-edit/${params.id}`;
						}}
						className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
					>
						Edit
					</Link>
				) : single_shipment_data?.shipment_transport_type === "air_freight" && single_shipment_data?.shipment_type === "import" && single_shipment_data?.air_freight_type === "door to door" ? (
					<Link
						to=""
						onClick={() => {
							window.location.href = `/shipments/import-airfreight-door-to-door-edit/${params.id}`;
						}}
						className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
					>
						Edit
					</Link>
				) : single_shipment_data?.shipment_transport_type === "warehousing" && single_shipment_data?.shipment_type === "export" ? (
					<>
						<Link
							to=""
							onClick={() => {
								window.location.href = `/shipments/export-warehousing-edit/${params.id}`;
							}}
							className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
						>
							Edit
						</Link>
					</>
				) : single_shipment_data?.shipment_transport_type === "warehousing" && single_shipment_data?.shipment_type === "import" ? (
					<>
						<Link
							to=""
							onClick={() => {
								window.location.href = `/shipments/import-warehousing-edit/${params.id}`;
							}}
							className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
						>
							Edit
						</Link>
					</>
				) : single_shipment_data?.shipment_transport_type === "customs_brokerage" && single_shipment_data?.shipment_type === "import" ? (
					<>
						<Link
							to=""
							onClick={() => {
								window.location.href = `/shipments/export-cbt-edit/${params.id}`;
							}}
							className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
						>
							Edit
						</Link>
					</>

				) : single_shipment_data?.shipment_transport_type === "customs_brokerage" && single_shipment_data?.shipment_type === "export" ? (
					<>
						<Link
							to=""
							onClick={() => {
								window.location.href = `/shipments/export-cbt-edit/${params.id}`;
							}}
							className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
						>
							Edit
						</Link>
					</>
				) : (
					<>
					</>
				)
				}
			</div>
		</div>
	);
};

export default DynamicShipmentEdit;
