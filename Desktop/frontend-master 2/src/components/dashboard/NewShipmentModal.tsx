import React from "react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

//icons
import close from "assets/icons/close.svg";
import back from "assets/icons/back.svg";

import cbt from "assets/icons/dashboard/cbt.svg";
import ship from "assets/icons/dashboard/ship.svg";
import truck from "assets/icons/dashboard/truck.svg";
import warehouse from "assets/icons/dashboard/warehouse.svg";
import airplane from "assets/icons/dashboard/airplane.svg";

//component
import OutlineButton from "components/buttons/OutlineButton";

//internal component
const ShipmentItem = ({
  text,
  subtext,
  svg,
  shipmentItem,
  setShipmentItem,
  showCategory,
  setFreightType,
  modalText,
  setFreightShipment,
  modalImg,
  setImage,
}) => (
  <>
    <div
      tabIndex={1}
      className={`flex gap-x-9 p-6 rounded cursor-pointer ${
        shipmentItem === text ? "shipment-item" : "border-grey"
      }`}
      onClick={(e) => {
        // console.log("think>>>", modalText + text);
        // if (modalText + text === "ExportOcean Freight") {
        //   e.stopPropagation();
        //   setShipmentItem(text);
        // } else {
        //   // setImage(modalImg);
        //   // setFreightType(text);
        //   // setFreightShipment(modalText);
        //   // showCategory();
        //   setShipmentItem("");
        // }
        e.stopPropagation();
        setShipmentItem(text);
      }}
    >
      <div>
        <p className="black-text-3 text-sm font-medium">{text}</p>
        <p className="text-xs grey-text mt-2">{subtext}</p>
      </div>
      <div>{svg}</div>
    </div>
  </>
);

const NewShipmentModal = (props: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    closeModal,
    modalText,
    showCategory,
    setFreightType,
    setFreightShipment,
    setImage,
  } = props;
  const [shipmentItem, setShipmentItem] = useState("");

  //creating the click outside to close drop down effect
  // useEffect(() => {
  //   const checkIfClickedOutside = (e) => {
  //     if (modalIsOpen && ref.current && !ref.current.contains(e.target)) {
  //       closeModal()
  //     }
  //   }
  //   document.addEventListener("mousedown", checkIfClickedOutside)
  //   return () => {
  //     // Cleanup the event listener
  //     document.removeEventListener("mousedown", checkIfClickedOutside)
  //   }
  // }, [modalIsOpen, closeModal])

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex items-center justify-center h-full bg-[#0618028c] z-[99999999999]">
        <div
          ref={ref}
          className="flex flex-col bg-white rounded-lg md:w-[434px] mx-4 md:mx-0 max-h-[calc(100vh_-_50px)]"
        >
          <div className="flex justify-between items-center pt-6 px-6 pb-4 border-solid border-b-[1px] border-[#e6e7ec80]">
            <div>
              <p className="text-base black-text-3 font-semibold">New {modalText} Shipments</p>
              <p className="text-sm grey-text">Please select your preferred service type.</p>
            </div>
            <>
              <img
                className="cursor-pointer"
                onClick={closeModal}
                src={close}
                alt="close"
              />
            </>
          </div>
          <div className="py-4 md:py-8 px-6 flex flex-col gap-y-6 max-h-[500px] xl:max-h-max overflow-y-scroll">
            <ShipmentItem
              text="Ocean Freight"
              subtext="View available rates for transporting your goods using ocean freight"
              svg={
                <svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect className="shipmentitem-svgfill" width="64" height="64" rx="5" fill="#F9FAFB" />
                  <path className="shipmentitem-svg" fill-rule="evenodd" clip-rule="evenodd" d="M18.008 21.092c-.351.204-.332.39.277 2.725.32 1.227.561 2.261.537 2.3-.023.039-.21.095-.413.126-.764.115-1.967.445-2.099.577-.122.122-.14.57-.178 4.233l-.041 4.098-.455.165c-1.778.648-3.446 1.33-3.533 1.446-.078.103-.103.807-.103 2.843v2.705l.222.175c.217.17.279.173 3.106.15 2.745-.022 2.89-.031 3.001-.184.183-.25.149-.676-.066-.827-.157-.109-.551-.128-2.645-.128h-2.461V37.47l1.797-.668c10.997-4.089 22.947-7.215 34.324-8.978a38.04 38.04 0 0 1 1.48-.212c.268 0-.138 2.577-.627 3.983-.624 1.791-1.176 2.608-3.09 4.57-2.05 2.103-3.154 3.527-3.761 4.856l-.218.475h-4.975c-5.522 0-5.345-.017-5.342.521.003.657-.185.636 5.685.636 5.086 0 5.205-.004 5.412-.166a.878.878 0 0 0 .27-.434c.115-.537.785-1.696 1.515-2.623.6-.761 1.401-1.647 2.617-2.893 1.733-1.775 2.374-2.775 3.013-4.7.5-1.505.743-2.936.743-4.368 0-.672-.022-.788-.176-.943-.155-.155-.235-.17-.682-.123-.852.09-4.2.624-6.25.999l-1.942.354-2.91-1.683c-1.6-.926-3.038-1.745-3.196-1.82-.266-.128-.413-.127-2.13.005-1.016.078-2.358.187-2.982.242l-1.136.1-.078-.25c-.873-2.824-.997-3.158-1.206-3.254-.145-.065-.898-.096-2.361-.096h-2.149l-.202.203c-.112.111-.202.27-.2.351.001.082.219.91.483 1.843.326 1.148.452 1.71.39 1.746-.05.029-.333.076-.628.106l-.538.054-.602-2.007c-.425-1.418-.652-2.05-.773-2.151-.154-.13-.395-.145-2.373-.142-1.384.001-2.257.034-2.351.089Zm4.46 2.716.502 1.651-.258.044c-.142.024-.76.119-1.373.21-.614.092-1.161.183-1.217.203-.06.021-.134-.087-.182-.27a683.18 683.18 0 0 1-.492-1.898l-.41-1.591h2.93l.5 1.651Zm6.57-.373c.215.68.384 1.245.375 1.254-.01.01-.66.087-1.445.172l-1.426.154-.158-.54c-.088-.298-.26-.894-.382-1.326-.122-.432-.24-.833-.262-.89-.032-.084.267-.101 1.432-.083l1.473.022.393 1.237Zm7.887 2.159c.291.163.53.321.53.351 0 .03-.958.217-2.129.415-7.12 1.204-13.474 2.619-17.644 3.93l-.393.124v-2.776l1.054-.22c3.69-.768 8.01-1.3 16.426-2.026 1.509-.13 1.572-.125 2.156.202Zm3.234 1.87c.82.471 1.002.608.88.657-.085.035-.88.216-1.766.404-4.93 1.041-11.059 2.668-16.453 4.367-1.803.568-4.928 1.605-5.386 1.787-.135.054-.145-.05-.145-1.508v-1.566l1.385-.424c4.201-1.287 9.871-2.509 18.285-3.939 1.159-.197 2.12-.361 2.136-.366.016-.005.495.26 1.064.587Zm-.034 5.111c-.366.139-.467.629-.186.91.384.384 1.1-.04.929-.551-.092-.275-.475-.46-.743-.359Zm-3.578.963c-.184.233-.173.544.025.742.334.334.965.077.965-.394a.552.552 0 0 0-.99-.348Zm-3.255.691c-.544.428.005 1.226.618.898.505-.27.248-1.055-.35-1.068-.027 0-.148.076-.268.17ZM21.51 41.714c-.225.286-.216.488.032.736.193.193.251.203 1.202.203.95 0 1.009-.01 1.202-.203.255-.255.259-.542.011-.775-.175-.164-.277-.18-1.233-.18-1.028 0-1.045.004-1.214.219Zm5.715-.09c-.125.088-.183.213-.182.393.002.537.227.636 1.443.636.909 0 .97-.01 1.162-.203.255-.255.26-.542.012-.775-.175-.164-.277-.18-1.221-.18-.799 0-1.072.03-1.214.13Z" fill="#6B7280" />
                  <path clip-rule="evenodd" d="M18.008 21.092c-.351.204-.332.39.277 2.725.32 1.227.561 2.261.537 2.3-.023.039-.21.095-.413.126-.764.115-1.967.445-2.099.577-.122.122-.14.57-.178 4.233l-.041 4.098-.455.165c-1.778.648-3.446 1.33-3.533 1.446-.078.103-.103.807-.103 2.843v2.705l.222.175c.217.17.279.173 3.106.15 2.745-.022 2.89-.031 3.001-.184.183-.25.149-.676-.066-.827-.157-.109-.551-.128-2.645-.128h-2.461V37.47l1.797-.668c10.997-4.089 22.947-7.215 34.324-8.978a38.04 38.04 0 0 1 1.48-.212c.268 0-.138 2.577-.627 3.983-.624 1.791-1.176 2.608-3.09 4.57-2.05 2.103-3.154 3.527-3.761 4.856l-.218.475h-4.975c-5.522 0-5.345-.017-5.342.521.003.657-.185.636 5.685.636 5.086 0 5.205-.004 5.412-.166a.878.878 0 0 0 .27-.434c.115-.537.785-1.696 1.515-2.623.6-.761 1.401-1.647 2.617-2.893 1.733-1.775 2.374-2.775 3.013-4.7.5-1.505.743-2.936.743-4.368 0-.672-.022-.788-.176-.943-.155-.155-.235-.17-.682-.123-.852.09-4.2.624-6.25.999l-1.942.354-2.91-1.683c-1.6-.926-3.038-1.745-3.196-1.82-.266-.128-.413-.127-2.13.005-1.016.078-2.358.187-2.982.242l-1.136.1-.078-.25c-.873-2.824-.997-3.158-1.206-3.254-.145-.065-.898-.096-2.361-.096h-2.149l-.202.203c-.112.111-.202.27-.2.351.001.082.219.91.483 1.843.326 1.148.452 1.71.39 1.746-.05.029-.333.076-.628.106l-.538.054-.602-2.007c-.425-1.418-.652-2.05-.773-2.151-.154-.13-.395-.145-2.373-.142-1.384.001-2.257.034-2.351.089Zm4.46 2.716.502 1.651-.258.044c-.142.024-.76.119-1.373.21-.614.092-1.161.183-1.217.203-.06.021-.134-.087-.182-.27a683.18 683.18 0 0 1-.492-1.898l-.41-1.591h2.93l.5 1.651Zm6.57-.373c.215.68.384 1.245.375 1.254-.01.01-.66.087-1.445.172l-1.426.154-.158-.54c-.088-.298-.26-.894-.382-1.326-.122-.432-.24-.833-.262-.89-.032-.084.267-.101 1.432-.083l1.473.022.393 1.237Zm7.887 2.159c.291.163.53.321.53.351 0 .03-.958.217-2.129.415-7.12 1.204-13.474 2.619-17.644 3.93l-.393.124v-2.776l1.054-.22c3.69-.768 8.01-1.3 16.426-2.026 1.509-.13 1.572-.125 2.156.202Zm3.234 1.87c.82.471 1.002.608.88.657-.085.035-.88.216-1.766.404-4.93 1.041-11.059 2.668-16.453 4.367-1.803.568-4.928 1.605-5.386 1.787-.135.054-.145-.05-.145-1.508v-1.566l1.385-.424c4.201-1.287 9.871-2.509 18.285-3.939 1.159-.197 2.12-.361 2.136-.366.016-.005.495.26 1.064.587Zm-.034 5.111c-.366.139-.467.629-.186.91.384.384 1.1-.04.929-.551-.092-.275-.475-.46-.743-.359Zm-3.578.963c-.184.233-.173.544.025.742.334.334.965.077.965-.394a.552.552 0 0 0-.99-.348Zm-3.255.691c-.544.428.005 1.226.618.898.505-.27.248-1.055-.35-1.068-.027 0-.148.076-.268.17ZM21.51 41.714c-.225.286-.216.488.032.736.193.193.251.203 1.202.203.95 0 1.009-.01 1.202-.203.255-.255.259-.542.011-.775-.175-.164-.277-.18-1.233-.18-1.028 0-1.045.004-1.214.219Zm5.715-.09c-.125.088-.183.213-.182.393.002.537.227.636 1.443.636.909 0 .97-.01 1.162-.203.255-.255.26-.542.012-.775-.175-.164-.277-.18-1.221-.18-.799 0-1.072.03-1.214.13Z" stroke="#6B7280" stroke-width=".2" mask="url(#a)" />
                </svg>
              }
              shipmentItem={shipmentItem}
              setShipmentItem={setShipmentItem}
              modalText={modalText}
              modalImg={ship}
              setImage={setImage}
              setFreightType={setFreightType}
              setFreightShipment={setFreightShipment}
              showCategory={showCategory}
            />
            {/* <ShipmentItem
              text="Air Freight"
              subtext="View available rates for transporting your goods using air freight"
              svg={
                <svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect className="shipmentitem-svgfill" width="64" height="64" rx="5" fill="#F9FAFB" />
                  <path className="shipmentitem-svg" d="M46.518 18.05a7.471 7.471 0 0 0-1.708.455c-.286.119-2.735 1.256-5.443 2.527-2.707 1.271-4.97 2.311-5.026 2.311-.056 0-2.628-.987-5.715-2.194-3.11-1.217-5.85-2.246-6.146-2.309-1.031-.218-2.018.002-2.527.565-.552.612-.885 1.742-.644 2.192.05.094 1.758 1.317 3.796 2.717 2.037 1.401 3.679 2.571 3.648 2.6-.113.108-4.033 1.923-4.154 1.923-.067 0-1.705-.401-3.639-.892-2.16-.548-3.583-.875-3.691-.847a.787.787 0 0 0-.323.205C14.729 27.54 13 30.702 13 30.86c0 .075.049.23.108.346.118.228.147.241 3.658 1.68.99.406 1.8.76 1.8.785.001.026-.252.159-.563.295-.608.267-.846.493-.846.8 0 .242 1.497 3.46 1.72 3.696.1.107.247.173.386.173.14 0 2.365-1 5.89-2.647 3.115-1.457 5.675-2.634 5.69-2.617.013.017-.21 2.463-.495 5.435l-.519 5.405.147.2c.229.31.867.657 1.391.756 1.16.218 2.147-.395 2.783-1.73.12-.253 1.238-3.477 2.483-7.166 1.245-3.688 2.275-6.715 2.288-6.725.014-.01 2.049-.96 4.523-2.112 2.473-1.151 4.712-2.217 4.973-2.369.262-.151.78-.576 1.15-.943.55-.545.732-.785.985-1.3.704-1.43.578-2.66-.376-3.68-.843-.9-2.14-1.289-3.658-1.094Zm1.747 1.433c.406.112.935.482 1.146.801.626.946-.012 2.493-1.425 3.458-.477.326-8.392 4.098-8.458 4.032-.017-.018.07-.31.194-.65.297-.813.297-1.11-.003-1.361-.424-.357-.869-.187-1.091.419-.08.215-1.336 3.941-2.794 8.281-1.457 4.34-2.712 8.036-2.788 8.214-.224.523-.51.928-.766 1.084-.422.258-1.122.138-1.058-.181.018-.086.324-3.27.682-7.078l.65-6.921-.15-.2c-.315-.423-.916-.378-1.108.083-.053.127-.138.703-.188 1.282l-.093 1.05-5.664 2.641c-3.115 1.452-5.69 2.639-5.723 2.638-.058-.003-.912-1.794-.912-1.914 0-.034.453-.274 1.007-.533 1.035-.485 1.22-.644 1.22-1.042 0-.348-.365-.542-3.359-1.78-1.623-.67-2.95-1.241-2.95-1.267 0-.063 1.017-1.859 1.1-1.941.037-.038 1.528.295 3.538.79l3.474.856.49-.21c.27-.115 5.354-2.483 11.298-5.262 5.944-2.778 10.971-5.107 11.17-5.175.751-.255 1.874-.305 2.56-.114Zm-25.963.698c.463.108 10.294 3.913 10.295 3.984.002.054-4.213 2.024-4.33 2.024-.095 0-7.593-5.117-7.663-5.23-.083-.134.237-.622.493-.752.305-.155.627-.163 1.205-.026Z" fill="#6B7280" />
                  <path d="M46.518 18.05a7.471 7.471 0 0 0-1.708.455c-.286.119-2.735 1.256-5.443 2.527-2.707 1.271-4.97 2.311-5.026 2.311-.056 0-2.628-.987-5.715-2.194-3.11-1.217-5.85-2.246-6.146-2.309-1.031-.218-2.018.002-2.527.565-.552.612-.885 1.742-.644 2.192.05.094 1.758 1.317 3.796 2.717 2.037 1.401 3.679 2.571 3.648 2.6-.113.108-4.033 1.923-4.154 1.923-.067 0-1.705-.401-3.639-.892-2.16-.548-3.583-.875-3.691-.847a.787.787 0 0 0-.323.205C14.729 27.54 13 30.702 13 30.86c0 .075.049.23.108.346.118.228.147.241 3.658 1.68.99.406 1.8.76 1.8.785.001.026-.252.159-.563.295-.608.267-.846.493-.846.8 0 .242 1.497 3.46 1.72 3.696.1.107.247.173.386.173.14 0 2.365-1 5.89-2.647 3.115-1.457 5.675-2.634 5.69-2.617.013.017-.21 2.463-.495 5.435l-.519 5.405.147.2c.229.31.867.657 1.391.756 1.16.218 2.147-.395 2.783-1.73.12-.253 1.238-3.477 2.483-7.166 1.245-3.688 2.275-6.715 2.288-6.725.014-.01 2.049-.96 4.523-2.112 2.473-1.151 4.712-2.217 4.973-2.369.262-.151.78-.576 1.15-.943.55-.545.732-.785.985-1.3.704-1.43.578-2.66-.376-3.68-.843-.9-2.14-1.289-3.658-1.094Zm1.747 1.433c.406.112.935.482 1.146.801.626.946-.012 2.493-1.425 3.458-.477.326-8.392 4.098-8.458 4.032-.017-.018.07-.31.194-.65.297-.813.297-1.11-.003-1.361-.424-.357-.869-.187-1.091.419-.08.215-1.336 3.941-2.794 8.281-1.457 4.34-2.712 8.036-2.788 8.214-.224.523-.51.928-.766 1.084-.422.258-1.122.138-1.058-.181.018-.086.324-3.27.682-7.078l.65-6.921-.15-.2c-.315-.423-.916-.378-1.108.083-.053.127-.138.703-.188 1.282l-.093 1.05-5.664 2.641c-3.115 1.452-5.69 2.639-5.723 2.638-.058-.003-.912-1.794-.912-1.914 0-.034.453-.274 1.007-.533 1.035-.485 1.22-.644 1.22-1.042 0-.348-.365-.542-3.359-1.78-1.623-.67-2.95-1.241-2.95-1.267 0-.063 1.017-1.859 1.1-1.941.037-.038 1.528.295 3.538.79l3.474.856.49-.21c.27-.115 5.354-2.483 11.298-5.262 5.944-2.778 10.971-5.107 11.17-5.175.751-.255 1.874-.305 2.56-.114Zm-25.963.698c.463.108 10.294 3.913 10.295 3.984.002.054-4.213 2.024-4.33 2.024-.095 0-7.593-5.117-7.663-5.23-.083-.134.237-.622.493-.752.305-.155.627-.163 1.205-.026Z" stroke="#000" strokeWidth="0.1px" />
                </svg>
              }
              shipmentItem={shipmentItem}
              setShipmentItem={setShipmentItem}
              modalText={modalText}
              modalImg={airplane}
              setImage={setImage}
              setFreightType={setFreightType}
              setFreightShipment={setFreightShipment}
              showCategory={showCategory}
            /> */}
            <ShipmentItem
              text="Haulage"
              subtext="View available rates for transporting your goods using haulage"
              svg={
                <svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect className="shipmentitem-svgfill" width="64" height="64" rx="5" fill="#F9FAFB" />
                  <path className="shipmentitem-svg" fill-rule="evenodd" clip-rule="evenodd" d="M15.468 19.106c-.322.144-.652.513-.743.832-.117.406-.103 11.754.014 11.973.217.408.655.486.967.174l.192-.191V20.245h24.141v5.748c0 4.22.025 5.793.091 5.918.217.408.656.486.968.174.161-.16.192-.266.192-.664v-.472h3.847c2.337 0 3.96.032 4.13.08.398.11.762.373 1.063.767.419.55.405.56-.801.56-1.02 0-1.066.006-1.25.191-.183.183-.192.237-.192 1.143 0 1.204.083 1.489.583 1.988.455.455.797.584 1.555.584h.518v2.812H49.136l-.242-.488c-1.444-2.915-5.64-2.913-7.085.002-.16.322-.283.483-.361.468-.103-.02-.125-.37-.158-2.539-.043-2.76-.033-2.703-.526-2.802-.21-.042-.288-.012-.487.188l-.238.237v4.934H27.078l-.163-.367c-.692-1.565-2.442-2.528-4.155-2.288-1.236.173-2.48 1.073-2.998 2.167l-.231.489-1.797-.02-1.797-.02V37.63l1.5-.021 1.5-.021.16-.205c.212-.269.203-.516-.028-.784l-.189-.22H12.37l-.189.22c-.231.269-.24.515-.026.786l.161.206h2.333l.002.8c.001.61.036.876.145 1.114.336.731.613.813 2.785.817l1.72.003.096.599c.524 3.296 4.613 4.52 6.847 2.051.446-.492.89-1.39.95-1.924.024-.206.06-.453.08-.55l.035-.176H41.335l.122.645c.159.84.451 1.443.975 2.008.854.923 1.665 1.278 2.92 1.278 1.256 0 2.066-.355 2.92-1.277.537-.58.812-1.141.97-1.98l.125-.663 1.125-.025 1.124-.025.192-.223.192-.223-.023-3.8c-.022-3.698-.027-3.812-.193-4.216-.385-.94-1.268-1.753-2.146-1.978-.263-.068-.421-.156-.466-.261-.037-.087-.28-1.013-.539-2.057l-.471-1.898.244-.206.244-.205-.032-.826c-.027-.71-.061-.884-.245-1.239-.252-.488-.71-.967-1.123-1.176-.553-.28-1.05-.325-3.536-.325h-2.411l-.026-.918c-.024-.821-.046-.946-.214-1.181a1.492 1.492 0 0 0-.508-.409c-.308-.14-.79-.145-12.586-.144-10.077.001-12.308.02-12.5.106Zm31.189 3.971c.333.183.646.605.702.95l.045.281H41.29v-1.414l2.558.023c2.26.021 2.588.04 2.809.16ZM30.18 27.882l-2.877 2.87-1.503-1.498c-.957-.954-1.582-1.517-1.719-1.55-.44-.107-.858.402-.681.828.047.115.887 1.005 1.866 1.978 1.62 1.609 1.803 1.768 2.045 1.768.245 0 .506-.24 3.45-3.185 2.9-2.9 3.185-3.207 3.185-3.44a.653.653 0 0 0-.637-.64c-.228 0-.532.278-3.13 2.869Zm17.188-.272c.268 1.085.487 2 .486 2.031 0 .032-1.478.059-3.283.059H41.29V25.636h5.589l.489 1.973Zm3.375 6.7v.703h-.497c-.433 0-.524-.027-.703-.206-.18-.18-.206-.27-.206-.703v-.498h1.406v.703Zm-37.195-.397c-.282.282-.294.572-.036.83l.191.192h4.216c2.32 0 4.273-.022 4.343-.05.142-.054.355-.424.355-.617 0-.07-.103-.23-.228-.355l-.229-.229h-8.383l-.229.229Zm14.874 2.506a.641.641 0 0 0-.376.7c.108.49-.101.472 5.325.472h4.938l.162-.206c.213-.27.205-.517-.026-.786l-.189-.22-4.831-.015c-2.702-.008-4.907.016-5.002.055Zm-4.516 1.29c.678.11 1.472.731 1.827 1.427.35.684.351 1.69.005 2.372-1.034 2.036-3.855 2.04-4.856.007-.231-.47-.257-.59-.254-1.188.002-.562.036-.734.217-1.108.384-.793 1.18-1.41 2.001-1.55.355-.06.464-.057 1.06.04Zm21.878-.033a2.782 2.782 0 0 1 2.267 2.38c.101.806-.337 1.87-.982 2.38-1.576 1.248-3.84.477-4.339-1.478-.377-1.478.648-3.027 2.171-3.28.227-.038.414-.073.417-.078.003-.005.213.03.466.076Zm-23.148 1.55c-.96.602-.742 2.025.359 2.355.625.187 1.425-.285 1.543-.911.168-.898-.302-1.528-1.177-1.577-.37-.02-.525.008-.725.134Zm22.103-.018c-.775.382-.887 1.584-.198 2.126.537.423 1.234.38 1.718-.103.449-.448.498-1.14.12-1.671-.326-.458-1.091-.623-1.64-.352Z" fill="#6B7280" />
                  <path clip-rule="evenodd" d="M15.468 19.106c-.322.144-.652.513-.743.832-.117.406-.103 11.754.014 11.973.217.408.655.486.967.174l.192-.191V20.245h24.141v5.748c0 4.22.025 5.793.091 5.918.217.408.656.486.968.174.161-.16.192-.266.192-.664v-.472h3.847c2.337 0 3.96.032 4.13.08.398.11.762.373 1.063.767.419.55.405.56-.801.56-1.02 0-1.066.006-1.25.191-.183.183-.192.237-.192 1.143 0 1.204.083 1.489.583 1.988.455.455.797.584 1.555.584h.518v2.812H49.136l-.242-.488c-1.444-2.915-5.64-2.913-7.085.002-.16.322-.283.483-.361.468-.103-.02-.125-.37-.158-2.539-.043-2.76-.033-2.703-.526-2.802-.21-.042-.288-.012-.487.188l-.238.237v4.934H27.078l-.163-.367c-.692-1.565-2.442-2.528-4.155-2.288-1.236.173-2.48 1.073-2.998 2.167l-.231.489-1.797-.02-1.797-.02V37.63l1.5-.021 1.5-.021.16-.205c.212-.269.203-.516-.028-.784l-.189-.22H12.37l-.189.22c-.231.269-.24.515-.026.786l.161.206h2.333l.002.8c.001.61.036.876.145 1.114.336.731.613.813 2.785.817l1.72.003.096.599c.524 3.296 4.613 4.52 6.847 2.051.446-.492.89-1.39.95-1.924.024-.206.06-.453.08-.55l.035-.176H41.335l.122.645c.159.84.451 1.443.975 2.008.854.923 1.665 1.278 2.92 1.278 1.256 0 2.066-.355 2.92-1.277.537-.58.812-1.141.97-1.98l.125-.663 1.125-.025 1.124-.025.192-.223.192-.223-.023-3.8c-.022-3.698-.027-3.812-.193-4.216-.385-.94-1.268-1.753-2.146-1.978-.263-.068-.421-.156-.466-.261-.037-.087-.28-1.013-.539-2.057l-.471-1.898.244-.206.244-.205-.032-.826c-.027-.71-.061-.884-.245-1.239-.252-.488-.71-.967-1.123-1.176-.553-.28-1.05-.325-3.536-.325h-2.411l-.026-.918c-.024-.821-.046-.946-.214-1.181a1.492 1.492 0 0 0-.508-.409c-.308-.14-.79-.145-12.586-.144-10.077.001-12.308.02-12.5.106Zm31.189 3.971c.333.183.646.605.702.95l.045.281H41.29v-1.414l2.558.023c2.26.021 2.588.04 2.809.16ZM30.18 27.882l-2.877 2.87-1.503-1.498c-.957-.954-1.582-1.517-1.719-1.55-.44-.107-.858.402-.681.828.047.115.887 1.005 1.866 1.978 1.62 1.609 1.803 1.768 2.045 1.768.245 0 .506-.24 3.45-3.185 2.9-2.9 3.185-3.207 3.185-3.44a.653.653 0 0 0-.637-.64c-.228 0-.532.278-3.13 2.869Zm17.188-.272c.268 1.085.487 2 .486 2.031 0 .032-1.478.059-3.283.059H41.29V25.636h5.589l.489 1.973Zm3.375 6.7v.703h-.497c-.433 0-.524-.027-.703-.206-.18-.18-.206-.27-.206-.703v-.498h1.406v.703Zm-37.195-.397c-.282.282-.294.572-.036.83l.191.192h4.216c2.32 0 4.273-.022 4.343-.05.142-.054.355-.424.355-.617 0-.07-.103-.23-.228-.355l-.229-.229h-8.383l-.229.229Zm14.874 2.506a.641.641 0 0 0-.376.7c.108.49-.101.472 5.325.472h4.938l.162-.206c.213-.27.205-.517-.026-.786l-.189-.22-4.831-.015c-2.702-.008-4.907.016-5.002.055Zm-4.516 1.29c.678.11 1.472.731 1.827 1.427.35.684.351 1.69.005 2.372-1.034 2.036-3.855 2.04-4.856.007-.231-.47-.257-.59-.254-1.188.002-.562.036-.734.217-1.108.384-.793 1.18-1.41 2.001-1.55.355-.06.464-.057 1.06.04Zm21.878-.033a2.782 2.782 0 0 1 2.267 2.38c.101.806-.337 1.87-.982 2.38-1.576 1.248-3.84.477-4.339-1.478-.377-1.478.648-3.027 2.171-3.28.227-.038.414-.073.417-.078.003-.005.213.03.466.076Zm-23.148 1.55c-.96.602-.742 2.025.359 2.355.625.187 1.425-.285 1.543-.911.168-.898-.302-1.528-1.177-1.577-.37-.02-.525.008-.725.134Zm22.103-.018c-.775.382-.887 1.584-.198 2.126.537.423 1.234.38 1.718-.103.449-.448.498-1.14.12-1.671-.326-.458-1.091-.623-1.64-.352Z" stroke="#6B7280" stroke-width="0.05px" />
                </svg>
              }
              shipmentItem={shipmentItem}
              setShipmentItem={setShipmentItem}
              modalText={modalText}
              modalImg={truck}
              setImage={setImage}
              setFreightType={setFreightType}
              setFreightShipment={setFreightShipment}
              showCategory={showCategory}
            />
            {/* <ShipmentItem
              text="Warehousing"
              subtext="Provide temporary warehousing facilities for your shipment commodities"
              svg={
                <svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect className="shipmentitem-svgfill" width="64" height="64" rx="5" fill="#F9FAFB" />
                  <rect className="shipmentitem-svgfill" x="8" y="8" width="48" height="48" rx="5" fill="#F9FAFB" />
                  <path className="shipmentitem-svg" fill-rule="evenodd" clip-rule="evenodd" d="M23.054 17.393c-6.722 2.6-8.712 3.399-8.848 3.555l-.176.201V48.406h-.787c-.766 0-.793.006-1.016.229a.754.754 0 0 0 0 1.105l.229.229H51.55l.263-.28c.21-.222.263-.342.263-.598 0-.176-.019-.301-.042-.278-.024.024-.144-.058-.268-.182-.218-.218-.249-.225-1.012-.225h-.787V21.15l-.176-.201c-.136-.156-2.126-.955-8.87-3.56-5.256-2.03-8.792-3.355-8.945-3.353-.138.002-4.154 1.513-8.923 3.358Zm3.32.457a9694.59 9694.59 0 0 1-8.183 3.169l-2.598 1.003v2.947H26.53l.002-1.973c.002-2.13.01-2.172.442-2.393.241-.123 9.809-.123 10.05 0 .433.221.44.262.442 2.393l.002 1.973H48.405v-1.485c0-.816-.013-1.484-.028-1.484-.016 0-3.713-1.424-8.216-3.164-4.503-1.74-8.19-3.161-8.194-3.158-.004.004-2.52.981-5.593 2.172Zm1.719 5.712v1.407h7.812V22.156h-7.812v1.407Zm-12.5 13.907v10.937H17.546V30.113l.228-.228.229-.229H45.996l.228.229.228.228v18.293H48.405V26.531H15.593V37.47Zm3.515 2.343v8.594H21.843v-6.574l.228-.229.229-.228h4.23V34.8l.229-.228.228-.228h10.024l.228.228.229.228V41.376h4.231l.228.228.228.229v6.574H44.89V31.22H19.108v8.593Zm8.985-1.171v2.734h7.812V35.906H32.78v.553c0 .507-.019.572-.228.781-.18.18-.298.229-.553.229-.254 0-.374-.05-.553-.229-.21-.209-.228-.274-.228-.78v-.554h-3.125v2.735Zm-4.688 7.03v2.735H31.218v-5.468h-3.125v.552c0 .507-.02.572-.229.782-.179.179-.298.228-.552.228-.255 0-.374-.05-.553-.228-.21-.21-.229-.275-.229-.782v-.553h-3.125v2.735Zm9.375 0v2.735H40.593v-5.468h-3.125v.552c0 .507-.02.572-.229.782-.179.179-.298.228-.552.228-.255 0-.374-.05-.553-.228-.21-.21-.229-.275-.229-.782v-.553H32.78v2.735Zm-20.76 3.517c0 .193.016.272.034.175a1.115 1.115 0 0 0 0-.351c-.018-.097-.034-.018-.034.175Z" fill="#6B7280" />
                </svg>
              }
              shipmentItem={shipmentItem}
              setShipmentItem={setShipmentItem}
              modalText={modalText}
              modalImg={warehouse}
              setImage={setImage}
              setFreightType={setFreightType}
              setFreightShipment={setFreightShipment}
              showCategory={showCategory}
            /> */}
            <ShipmentItem
              text="Custom Brokerage (CBT)"
              subtext="Provide custom brokerage for your export shipments"
              svg={
                <svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect className="shipmentitem-svgfill" width="64" height="64" rx="5" fill="#F9FAFB" />
                  <rect className="shipmentitem-svgfill" x="8" y="8" width="48" height="48" rx="5" fill="#F9FAFB" />
                  <path className="shipmentitem-svg" fill-rule="evenodd" clip-rule="evenodd" d="M33.797 15.853c-.38.12-.96.722-1.076 1.117a3.447 3.447 0 0 0-.096.797v.476l-2.91.023-2.91.023-.508.24a3.26 3.26 0 0 0-1.517 1.518l-.24.508-.024 3.22-.022 3.22-4.743.022-4.743.022-.352.184c-.479.25-.91.676-1.159 1.144l-.208.39v13.985l.208.39c.25.469.68.894 1.16 1.145l.35.184 4.748.022 4.747.022-.047.186c-.08.32.115 1.31.356 1.805a3.253 3.253 0 0 0 1.486 1.474l.508.24h21.64l.508-.24a3.28 3.28 0 0 0 1.515-1.517l.243-.508v-25.39l-.24-.508a3.26 3.26 0 0 0-1.518-1.517l-.508-.241-2.91-.023-2.91-.023v-.524c-.002-.907-.498-1.656-1.244-1.88-.406-.122-7.196-.11-7.584.014Zm.47 1.246c-.367.188-.396.357-.374 2.184.02 1.649.026 1.702.199 1.875l.178.178h6.71l.178-.178c.175-.175.178-.21.178-1.97 0-1.762-.003-1.796-.178-1.971l-.178-.178-3.26-.02c-2.516-.015-3.303.003-3.453.08Zm-7.133 2.512a1.847 1.847 0 0 0-1.15.95l-.195.38-.024 3.03L25.742 27h1.878l.022-2.754c.03-3.723-.197-3.447 2.854-3.48l2.129-.023V19.5l-2.559.005c-1.825.004-2.665.034-2.932.106Zm15.491.506v.626l2.129.023c2.384.026 2.37.023 2.71.62l.163.286-.02 11.668c-.02 11.417-.024 11.672-.173 11.867-.083.11-.242.269-.351.352-.195.148-.427.152-9.362.172-10.034.023-9.372.052-9.822-.431a1.143 1.143 0 0 1-.247-.507l-.047-.293h-1.878l.047.56c.085 1.01.618 1.679 1.478 1.857.29.06 3.454.08 10.61.065l10.197-.021.388-.2a1.89 1.89 0 0 0 .968-1.246c.12-.56.12-23.97 0-24.53a1.89 1.89 0 0 0-.968-1.246l-.388-.2-2.717-.024-2.717-.024v.626Zm-13.75 4.402v2.52l.348.143c.478.197.98.66 1.256 1.157l.232.419v13.984l-.18.336c-.279.524-.69.926-1.206 1.185l-.475.237h17.525V22h-2.1c-1.86 0-2.112.015-2.207.13-.059.07-.283.211-.498.311l-.39.182h-7.11l-.39-.182c-.215-.1-.44-.24-.498-.311-.095-.115-.346-.13-2.207-.13h-2.1v2.52Zm14.083 2.187-1.268 1.268-.492-.487c-.401-.398-.538-.487-.747-.487a.652.652 0 0 0-.639.64c0 .22.112.367.8 1.058 1.142 1.146.958 1.195 2.932-.78 1.414-1.417 1.581-1.61 1.581-1.84a.652.652 0 0 0-.641-.64c-.23 0-.4.141-1.526 1.268ZM32.475 27.83a.81.81 0 0 0-.163.419.81.81 0 0 0 .163.42l.161.205h5.603l.162-.206a.81.81 0 0 0 .161-.419.81.81 0 0 0-.161-.42l-.162-.205h-5.603l-.162.206Zm-17.07.5c-.32.096-.736.526-.827.853-.104.375-.105 12.761-.001 13.124.101.354.512.768.857.864.375.104 12.757.104 13.132 0 .345-.096.756-.51.857-.864.104-.363.103-12.75 0-13.124-.096-.345-.511-.756-.865-.857-.147-.043-.84-.077-1.538-.077h-1.27v1.152c-.002 1.047-.018 1.188-.186 1.543-.22.466-.435.678-.908.892-.328.149-.504.16-2.656.16-2.26.001-2.313-.002-2.7-.183-.455-.212-.832-.627-.96-1.058-.05-.164-.09-.794-.09-1.402V28.25l-1.309.007c-.72.003-1.41.037-1.535.074Zm4.109.972c.036 1.518-.158 1.408 2.486 1.408s2.45.11 2.486-1.408l.026-1.053h-5.024l.026 1.053Zm23.444 3.028-1.268 1.268-.492-.487c-.401-.398-.538-.487-.747-.487a.652.652 0 0 0-.639.64c0 .22.112.367.8 1.058 1.142 1.146.958 1.195 2.932-.78 1.414-1.417 1.581-1.61 1.581-1.84a.652.652 0 0 0-.641-.64c-.23 0-.4.141-1.526 1.268Zm-10.483 1.125a.81.81 0 0 0-.163.419.81.81 0 0 0 .163.42l.161.205h5.603l.162-.206a.81.81 0 0 0 .161-.419.81.81 0 0 0-.161-.42l-.162-.205h-5.603l-.162.206Zm10.483 4.5-1.268 1.268-.492-.487c-.401-.398-.538-.487-.747-.487a.652.652 0 0 0-.639.64c0 .22.112.367.8 1.058 1.142 1.146.958 1.195 2.932-.78 1.414-1.417 1.581-1.61 1.581-1.84a.652.652 0 0 0-.641-.64c-.23 0-.4.141-1.526 1.268Zm-27.046.5a.81.81 0 0 0-.162.419.81.81 0 0 0 .162.42l.162.205h4.352l.162-.206a.645.645 0 0 0 0-.838l-.162-.206h-4.352l-.162.206Zm16.563.625a.81.81 0 0 0-.163.419.81.81 0 0 0 .163.42l.161.205h5.603l.162-.206a.81.81 0 0 0 .161-.419.81.81 0 0 0-.161-.42l-.162-.205h-5.603l-.162.206Zm-16.563 1.875a.81.81 0 0 0-.162.419.81.81 0 0 0 .162.42l.162.205h3.102l.162-.206a.645.645 0 0 0 0-.838l-.162-.206h-3.102l-.162.206Z" fill="#6B7280" />
                </svg>
              }
              shipmentItem={shipmentItem}
              setShipmentItem={setShipmentItem}
              modalText={modalText}
              modalImg={cbt}
              setImage={setImage}
              setFreightType={setFreightType}
              setFreightShipment={setFreightShipment}
              showCategory={showCategory}
            />

            {/* <ShipmentItem
            text="Get a quick quote"
            subtext="Select a specific freight option and get a quote"
            svg={<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect className="shipmentitem-svgfill" width="64" height="64" rx="5" fill="#F9FAFB" />
              <path className="shipmentitem-svg" d="M39.432 40.447h-14.44M39.432 32.074h-14.44M30.504 23.72h-5.51" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path className="shipmentitem-svg" clip-rule="evenodd" d="m39.818 13.5-15.378.008c-5.52.034-8.938 3.666-8.938 9.206v18.392c0 5.568 3.444 9.214 9.012 9.214l15.378-.006c5.52-.034 8.94-3.668 8.94-9.208V22.714c0-5.568-3.446-9.214-9.014-9.214Z" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>}
            shipmentItem={shipmentItem}
            setShipmentItem={setShipmentItem}
          /> */}
          </div>
          <div className="p-4 border-solid border-t-[1px] border-[#e6e7ec80] flex gap-x-6 justify-between">
            <OutlineButton
              title="Back"
              style={{ color: "#59725C" }}
              onClick={closeModal}
              disabled={false}
              loading={false}
              icon={back}
            />
            {shipmentItem ? (
              <Link
                to={shipmentItem === 'Ocean Freight' ? '/freight-details' : shipmentItem === 'Haulage' ? '/haulage-details' : shipmentItem === 'Custom Brokerage (CBT)' ? '/custom-brokerage' : '/'}
                className="white-text text-sm py-3 rounded px-4 bg-green-2 btn w-[96px] flex items-center justify-center"
                state={{ shipmentCategory: modalText + shipmentItem }}
              >
                Proceed
              </Link>
            ) : (
              <Link
                to="/"
                className="white-text text-sm py-3 rounded px-4 bg-[#109b32a1] btn w-[96px] flex items-center justify-center"
                onClick={(e) => e.preventDefault()}
              >
                Proceed
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* {showCategoryModal && <CategoryInfoModal />} */}
    </>
  );
};

export default NewShipmentModal;