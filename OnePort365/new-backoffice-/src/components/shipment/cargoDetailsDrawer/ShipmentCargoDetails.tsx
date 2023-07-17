import React from "react";
import { Link } from "react-router-dom";
// import SingleCargoDetailsDrawer from "./ExportContainerStatus/SingleCargoDetailsDrawer";
// import BatchCargoDetailsDrawer from "./ExportContainerStatus/BatchCargoDetailsDrawer";
import EditContainerDrawer from "./ExportContainerStatus/UpdateContainerDrawer";
import UpdateContainerDrawer from "./ImportContainerStatus/UpdateContainerDrawer";


const ShipmentCargoDetails = (props: any) => {
  const { shipments, isOpen, setIsOpen, isBatchOpen, setIsBatchOpen, isEditOpen, setIsEditOpen, isUpdateOpen, setIsUpdateOpen } = props;

  return (
    <div className="shippingdetails-height">
		<>
			{/* <div className="flex items-center ml-auto">
				<div className="ml-auto mb-5">
					<>
						<div
							className="bg-green solid-br white-text-2 text-sm py-3 px-4 w-full rounded flex"
							onClick={() => setIsBatchOpen(true)}
						>
							Update By Batch
						</div>
					</>
					
				</div>
			</div> */}
			<div
				className="solid-br rounded-lg p-3 mb-3 cursor-pointer"
				// onClick={() => setIsOpen(true)}
			>
				<div className="flex items-center">
					<p className="black-text text-sm font-semibold">
						Container 1
					</p>
					<div className="flex items-center ml-auto">
						{/* <div className="ml-auto">
							<div
								className="ml-auto solid-br black-text-2 text-sm py-2 px-3 w-full rounded flex"
								onClick={() => setIsOpen(true)}
							>
								Update container
							</div>
							
						</div> */}
						<div className="ml-3">
							<div 
								className="bg-green white-text-2 text-sm py-3 px-4 w-full rounded flex" 
								onClick={() => setIsEditOpen(true)}
							>
							Update Container Status
							</div>
						</div>
					</div>
					{/* <i className="ml-auto ion-ios-arrow-forward"></i> */}
				</div>
			</div>

			<div
				className="solid-br rounded-lg p-3 mb-3 cursor-pointer"
				// onClick={() => setIsOpen(true)}
			>
				<div className="flex items-center">
					<p className="black-text text-sm font-semibold">
						Container 2
					</p>
					<div className="flex items-center ml-auto">
						{/* <div className="ml-auto">
							<div
								className="solid-br black-text-2 text-sm py-2 px-3 w-full rounded flex"
								onClick={() => setIsOpen(true)}
							>
								Update container
							</div>
							
						</div> */}
						<div className="ml-3">
							<div 
								className="bg-green white-text-2 text-sm py-3 px-4 w-full rounded flex" 
								onClick={() => setIsEditOpen(true)}
							>
							Update Container Status
							</div>
						</div>
					</div>
					{/* <i className="ml-auto ion-ios-arrow-forward"></i> */}
				</div>
			</div>

			<div
				className="solid-br rounded-lg p-3 mb-3 cursor-pointer"
				onClick={() => setIsOpen(true)}
			>
				<div className="flex items-center">
					<p className="black-text text-sm font-semibold">
						Container 3
					</p>
					<div className="flex items-center ml-auto">
						{/* <div className="ml-auto">
							<div
								className="solid-br black-text-2 text-sm py-2 px-3 w-full rounded flex"
								onClick={() => setIsOpen(true)}
							>
								Update container
							</div>
							
						</div> */}
						<div className="ml-3">
							<div 
								className="bg-green white-text-2 text-sm py-3 px-4 w-full rounded flex" 
								onClick={() => setIsUpdateOpen(true)}
							>
							Update Container Status
							</div>
						</div>
					</div>
					{/* <i className="ml-auto ion-ios-arrow-forward"></i> */}
				</div>
			</div>
		</>
      	{/* {shipments.length ? (
			shipments.map((data: any) => {
			return (
				<>
					<div
						className="solid-br rounded-lg p-3 mb-2 cursor-pointer"
						onClick={() => setIsOpen(true)}
					>
					<div className="flex items-center">
						<p className="black-text text-sm font-semibold">
							Container 2
						</p>

						<i className="ml-auto ion-ios-arrow-forward"></i>
					</div>
				</div>
				</>
			);
			})
		) : (
			<> </>
		)} */}
{/* 
      <SingleCargoDetailsDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
	  <BatchCargoDetailsDrawer isBatchOpen={isBatchOpen} setIsBatchOpen={setIsBatchOpen} /> */}
	  <EditContainerDrawer isEditOpen={isEditOpen}  setIsEditOpen={setIsEditOpen} />
	  <UpdateContainerDrawer isUpdateOpen={isUpdateOpen}  setIsUpdateOpen={setIsUpdateOpen} />
    </div>
  );
};

export default ShipmentCargoDetails;
