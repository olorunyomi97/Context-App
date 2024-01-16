import { useEffect, useState } from "react";
import CustomTabs from "components/customTabs/CustomTabs";
import { formatCurrency } from "helpers";

const AdditionalCharges = (props: any) => {
  const { charges, totalCharge, currency } = props;
  const [currentLoad, setCurrentLoad] = useState("load 1");
  const [tabs, setTabs] = useState([]);
  const [tab, setTab] = useState("Load 1");

  let insurance_subtotal = 0;
  let ocean_subtotal = 0;
  let service_subtotal = 0;

  useEffect(() => {
    let tabs_ = [];
    charges.ocean_charges.map((charge: any, index: number) => {
      // @ts-ignore
      tabs_.push(`Load ${index + 1}`);
    });

    setTabs(tabs_);
  }, []);

  const calcOceanSubtotal = (charge) => {
    ocean_subtotal += charge;
  };

  const calcServiceSubtotal = (charge) => {
    service_subtotal += charge;
  };

  const calcInsuranceSubtotal = (charge) => {
    insurance_subtotal += charge;
  };

  return (
    <>
      <div className="top-divider dashboard-content-scroll">
        <p className="text-sm black-text  ml-5 my-3">
          Charges subject to the information below
        </p>
      </div>

      <p className="text-sm grey-text mt-5 mb-3 font-bold ml-5">
        Ocean Charges
      </p>

      {tabs.length ? (
        <CustomTabs tabs={tabs} activeTab={tab} setActiveTab={setTab} />
      ) : null}

      <div className="">
        <table className="w-full mt-3">
          <thead>
            <tr className="text-left">
              <th className="text-xs grey-text font-bold pl-5">Description</th>
              <th className="text-xs grey-text font-bold">Comment</th>
              <th className="text-xs grey-text font-bold">Units</th>
              <th className="text-xs grey-text font-bold">Unit Price</th>
              <th className="text-xs grey-text font-bold">Amount</th>
            </tr>
          </thead>

          {charges.ocean_charges.length &&
            charges.ocean_charges.map((charge: any, index: number) => {
              return (
                <tbody key={index}>
                  {tab === `Load ${index + 1}` &&
                    charges.ocean_charges[index].map(
                      (charge: any, index: number) => {
                        calcOceanSubtotal(
                          currency === "USD"
                            ? charge.amountUsd
                            : charge.amountNgn
                        );
                        return (
                          <tr className="top-divider" key={index}>
                            <td className="">
                              <p className="text-xs grey-text my-3 pl-5">
                                {charge.description}
                              </p>
                            </td>

                            <td className="">
                              <p className="text-xs grey-text my-3">
                                {charge.rateBasis}
                              </p>
                            </td>

                            <td className="">
                              <p className="text-xs grey-text my-3">
                                {charge.qty}
                              </p>
                            </td>

                            <td className="">
                              <p className="text-xs black-text my-3 ml-auto font-semibold">
                                {currency === "USD"
                                  ? formatCurrency(charge.rateUsd, currency)
                                  : formatCurrency(
                                      charge.rateNgn,
                                      currency
                                    )}{" "}
                                {/* <span className="grey-text uppercase font-normal">
                                  {currency === "USD" ? "USD" : "NGN"}
                                </span> */}
                              </p>
                            </td>
                            <td className="">
                              <p className="text-xs black-text my-3 ml-auto font-semibold">
                                {currency === "USD"
                                  ? formatCurrency(charge.amountUsd, currency)
                                  : formatCurrency(
                                      charge.amountNgn,
                                      currency
                                    )}{" "}
                                {/* <span className="grey-text uppercase font-normal">
                                  {currency === "USD" ? "USD" : "NGN"}
                                </span> */}
                              </p>
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              );
            })}
        </table>
        <div className="top-divider justify-between items-center flex px-5">
          {/* <div className="ml-auto"> */}
          <span className="text-sm black-text placeholder:font-normal">
            Subtotal:
          </span>{" "}
          <p className="text-sm black-text my-3 ml-auto font-semibold">
            {formatCurrency(ocean_subtotal, currency)}{" "}
            {/* <span className="grey-text uppercase font-normal ">
                {currency === "USD" ? "USD" : "NGN"}
              </span> */}
          </p>
          {/* </div> */}
        </div>
      </div>

      {charges.insurance_charges.length ? (
        <>
          <p className="text-sm grey-text mt-5 mb-3 font-bold ml-5">
            Insurance
          </p>

          {charges.insurance_charges.map((charge: any) => {
            calcInsuranceSubtotal(
              currency === "USD" ? charge.amount_usd : charge.amount
            );
            return (
              <div className="top-divider flex px-5">
                <div className="">
                  <p className="text-sm grey-text  my-3">
                    {charge.description}
                  </p>
                </div>
                <div className="ml-auto">
                  <p className="text-sm black-text my-3 ml-auto font-semibold">
                    {currency === "USD"
                      ? formatCurrency(charge.amount_usd, currency)
                      : formatCurrency(charge.amount, currency)}{" "}
                    {/* <span className="grey-text uppercase font-normal">
                      {currency === "USD" ? "USD" : "NGN"}
                    </span> */}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="top-divider flex px-5">
            <div className="ml-auto">
              <p className="text-sm black-text my-3 ml-auto font-semibold">
                <span className="font-normal">Subtotal:</span>{" "}
                {formatCurrency(insurance_subtotal, currency)}{" "}
                {/* <span className="grey-text uppercase font-normal ">
                  {currency === "USD" ? "USD" : "NGN"}
                </span> */}
              </p>
            </div>
          </div>
        </>
      ) : null}

      <p className="text-sm grey-text mt-5 mb-3 font-bold ml-5">
        Service Charges
      </p>
      {charges.service_charges.length &&
        charges.service_charges.map((charge: any) => {
          calcServiceSubtotal(
            currency === "USD" ? charge.amount_usd : charge.amount
          );
          return (
            <div className="top-divider flex px-5">
              <div className="">
                <p className="text-sm grey-text  my-3">{charge.description}</p>
              </div>
              <div className="ml-auto">
                <p className="text-sm black-text my-3 ml-auto font-semibold">
                  {currency === "USD"
                    ? formatCurrency(charge.amount_usd, currency)
                    : formatCurrency(charge.amount, currency)}{" "}
                </p>
              </div>
            </div>
          );
        })}
      <div className="top-divider flex justify-between items-center px-5">
        <span className="font-normal text-sm black-text ">Subtotal:</span>{" "}
        <p className="text-sm black-text my-3 ml-auto font-semibold">
          {formatCurrency(service_subtotal, currency)}{" "}
          {/* <span className="grey-text uppercase font-normal ">
              {currency === "USD" ? "USD" : "NGN"}
            </span> */}
        </p>
      </div>

      {/* <div className="bg-light-green py-3 px-5 flex">
        <div className="ml-auto">
          <p className="text-lg black-text my-3 ml-auto font-semibold">
            <span className="font-normal text-sm">Total:</span>{" "}
            {new Intl.NumberFormat("en-US").format(totalCharge.toFixed(2))}{" "}
            <span className="grey-text uppercase font-normal ">
              {currency === "USD" ? "USD" : "NGN"}
            </span>
          </p>
        </div>
      </div> */}
    </>
  );
};

export default AdditionalCharges;
