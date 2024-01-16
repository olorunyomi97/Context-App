import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import ShipmentDetailsCard from "components/shipment/ShipmentDetailsCard";
import PageLoading from "components/partials/pageLoading";

//redux
import { getInvoicesByRateId } from "store/actions";

const ShipmentInvoice = (props: any) => {
  const params = useParams();
  //   const { isOpen, setIsOpen } = useState(false);
  const [openAside, SetOpenAside] = useState(false);

  const { loading, getInvoicesByRateId, rate_invoice_data } = props;

  useEffect(() => {
    getInvoicesByRateId(params.id);
  }, []);

  return (
    <>
      <div className="flex">
        <Aside
          activeTab="invoice"
          openAside={openAside}
          SetOpenAside={SetOpenAside}
        />

        <div className="">
          <TopBar title={"Invoices"} SetOpenAside={SetOpenAside} />

          {loading ? (
            <>
              <PageLoading title={"quote details"} />
            </>
          ) : (
            <div className="pt-5 lg:px-14 lg:pt-10 container ">
              <div className="" style={{ maxWidth: 686 }}>
                <div className="">
                  {rate_invoice_data.invoice_details &&
                  rate_invoice_data.invoice_details.length ? (
                    <>
                      {" "}
                      <ShipmentDetailsCard
                        shipment={rate_invoice_data.invoice_details[0]}
                      />{" "}
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="mt-10 px-7 lg:px-0">
                  <h3 className="black-text text-lg font-semibold">
                    All Invoice(s)
                  </h3>
                  <div className="mt-4">
                    {rate_invoice_data.invoice_uploads &&
                    rate_invoice_data.invoice_uploads.length ? (
                      rate_invoice_data.invoice_uploads.map(
                        (invoice: any, index: number) => {
                          return (
                            <div
                              className={`${
                                index === 0
                                  ? "solid-br"
                                  : "right-divider left-divider bottom-divider"
                              }  p-3 flex items-center rounded`}
                              key={index}
                            >
                              <p className="black-text">
                                {invoice._id.substring(0, 9)}
                              </p>

                              <Link
                                to={`/invoice/${invoice._id}?rate=${params.id}`}
                                className=" ml-auto "
                              >
                                <div className="solid-br py-2 px-7 bg-green rounded cursor-pointer">
                                  <p className="text-sm white-text mr-2 font-semibold">
                                    View Invoice
                                  </p>
                                </div>
                              </Link>
                            </div>
                          );
                        }
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { loading, rate_invoice_data } = state.invoice;
  return { loading, rate_invoice_data };
};

export default connect(mapStateToProps, { getInvoicesByRateId })(
  ShipmentInvoice
);
