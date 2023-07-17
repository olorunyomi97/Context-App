
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

//icons
import transferIcon from "assets/icons/transfer.svg";
import cardIcon from "assets/icons/card.svg";

const PaymentDrawer = (props: any) => {
  const { isOpen, setIsOpen, setIsBankDetailsOpen } = props;

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
        <i
          className="ion-ios-close py-1 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer"
          onClick={() => setIsOpen(false)}
        ></i>

        <div className="flex items-center my-10">
          <h3 className="text-xl black-text font-semibold">Payment Method</h3>

          <p className="text-lg black-text font-semibold ml-auto">
            Invoices No: 475849HTF
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div
            className=" flex flex-col  justify-center item-center rounded cursor-pointer"
            style={{
              borderWidth: 2,
              minHeight: 321,
              borderColor: "#3ab44a",
            }}
            onClick={() => setIsBankDetailsOpen(true)}
          >
            <div className="bg-light-green rounded-full p-3 py-4 mx-auto">
              <img src={transferIcon} alt="" width={61} height={50} />
            </div>
            <div className="mt-3 mx-auto">
              <p className="black-text font-semibold">Bank transfer</p>
            </div>
          </div>
          <div
            className="flex flex-col  justify-center item-center rounded "
            style={{ borderWidth: 2, minHeight: 321, borderColor: "#e5e7eb" }}
          >
            <div className="bg-grey rounded-full p-4  mx-auto mt-14">
              <img src={cardIcon} alt="" width={40} height={40} />
            </div>
            <div className="mt-3 mx-auto">
              <p className="black-text font-semibold">Card payment</p>
            </div>
            <div className="bg-red p-2 mx-auto rounded-full mt-3">
              <p className="white-text text-sm">Coming soon...</p>
            </div>
          </div>
        </div>
      </SlidingPane>
    </>
  );
};

export default PaymentDrawer;
