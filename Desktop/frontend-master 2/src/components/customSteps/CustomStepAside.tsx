import React from "react";

function CustomStepAside(props: {
  items: object[];
  step: number;
  setStep: any;
}) {
  const { items, step, setStep } = props;

  return (
    <>
      <div
        className="pl-14 pr-7 pt-5 lg:py-16 dashboard-content-scroll desktop-only"
        style={{
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.11)",
          minHeight: "90vh",
        }}
      >
        <ul>
          {items.map((item, index) => {
            return (
              <div
                className="flex items-center cursor-pointer"
                key={index}
                onClick={() => setStep(index)}
              >
                <li
                  className={`black-text text-xs flex items-center p-2.5 w-11/12 ${
                    step === index ? "bg-grey font-semibold" : "grey-text"
                  } `}
                >
                  <i
                    className={`mr-2 text-2xl green-text ${
                      step === index
                        ? "ion-ios-radio-button-on"
                        : item["submitted"] === true
                        ? "ion-ios-checkmark-circle"
                        : item["submitted"] === false
                        ? "ion-ios-alert yellow-icon"
                        : "ion-ios-radio-button-off grey-text"
                    }`}
                  ></i>{" "}
                  {item["name"]}
                </li>
                {step === index ? (
                  <i className="grey-text-2 ion-ios-play w-1/12"></i>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default CustomStepAside;
