import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import CustomStepAside from "components/customSteps/CustomStepAside";
import CompanyDetails from "components/shipmentDataSheet/CompanyDetails";
import ContainerDetails from "components/shipmentDataSheet/ContainerDetails";
import TradePartners from "components/shipmentDataSheet/TradePartners";
import Consignee from "components/shipmentDataSheet/Consignee";
import NotifyParty from "components/shipmentDataSheet/NotifyParty";
import TradeTerms from "components/shipmentDataSheet/TradeTerms";
import PointOfStuffing from "components/shipmentDataSheet/PointOfStuffing";
import OtherDetails from "components/shipmentDataSheet/OtherDetails";
import AttachDocuments from "components/shipmentDataSheet/AttachDocuments";
import Products from "components/shipmentDataSheet/Products";
import WhatDocuments from "components/shipmentDataSheet/WhatDocuments";
// import DocumentSubmission from "components/shipmentDataSheet/DocumentSubmission";

//redux
import { getDataSheetById } from "store/actions";

const ShipmentDataSheet = (props: any) => {
  const params = useParams();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const { datasheet_data, specific_datasheet_section, getDataSheetById } =
    props;

  const [openAside, SetOpenAside] = useState(false);
  const [step, setStep] = useState<number>(0);
  const [items, setItems] = useState<object[]>([
    {
      name: "Company Details",
      id: "company",
      submitted: false,
    },
    {
      name: "Container Details",
      id: "container",
      submitted: false,
    },
    {
      name: "Trade Partners",
      id: "trade_partners",
      submitted: false,
    },
    {
      name: "Consignee",
      id: "consignee",
      submitted: false,
    },
    {
      name: "Notify Party",
      id: "notify_party",
      submitted: false,
    },
    {
      name: "Trade Terms",
      id: "trade_terms",
      submitted: false,
    },
    {
      name: "Point of Stuffing",
      id: "point_of_stuffing",
      submitted: false,
    },
    {
      name: "Other Details",
      id: "other_details",
      submitted: false,
    },
    {
      name: "Attach Documents",
      id: "attach_documents",
      submitted: false,
    },
    {
      name: "Product We Offer",
      id: "product_we_offer",
      submitted: false,
    },
    {
      name: "What Documents ?",
      id: "required_documents",
      submitted: false,
    },
    // {
    //   name: "Document Submission",
    //   submitted: false,
    // },
  ]);

  const populateAside = () => {
    const newItems = [];

    items.map((item: any) => {
      item.submitted = datasheet_data?.datasheet_general?.[item.id];

      // @ts-ignore
      newItems.push(item);
    });

    setItems(newItems);
  };

  useEffect(() => {
    populateAside();
  }, [datasheet_data]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);

  //   const datasheet_id =
  //     specific_datasheet_section?.datasheet_id || urlParams.get("datasheet");

  //   if (datasheet_id) {
  //     getDataSheetById(
  //       {
  //         rate_id: params.id,
  //         datasheet_id,
  //         sheet_section: "container",
  //       },
  //       populateData
  //     );
  //   }
  // }, []);

  const updateDataSheetAside = () => {
    items[step]["submitted"] = true;
    setItems([...items]);

    nextStep();
  };

  const nextStep = () => {
    if (step !== items.length) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step !== 0) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <div className="lg:flex">
        <Aside
          activeTab="quote"
          openAside={openAside}
          SetOpenAside={SetOpenAside}
        />

        <div className="">
          <TopBar title={"Shipping DataSheet"} SetOpenAside={SetOpenAside} />

          <div className="container flex">
            <div className="lg:w-1/4">
              <CustomStepAside items={items} step={step} setStep={setStep} />
            </div>
            <div className="lg:w-3/4 dashboard-content-scroll">
              <div className="lg:px-14 px-5 pt-5 lg:pt-16">
                {
                  step === 0 ? (
                    <CompanyDetails
                      updateDataSheetAside={updateDataSheetAside}
                    />
                  ) : step === 1 ? (
                    <ContainerDetails
                      updateDataSheetAside={updateDataSheetAside}
                      previousStep={previousStep}
                    />
                  ) : step === 2 ? (
                    <TradePartners
                      updateDataSheetAside={updateDataSheetAside}
                      previousStep={previousStep}
                    />
                  ) : step === 3 ? (
                    <Consignee
                      updateDataSheetAside={updateDataSheetAside}
                      previousStep={previousStep}
                    />
                  ) : step === 4 ? (
                    <NotifyParty
                      updateDataSheetAside={updateDataSheetAside}
                      previousStep={previousStep}
                    />
                  ) : step === 5 ? (
                    <TradeTerms
                      updateDataSheetAside={updateDataSheetAside}
                      previousStep={previousStep}
                    />
                  ) : step === 6 ? (
                    <PointOfStuffing
                      updateDataSheetAside={updateDataSheetAside}
                      previousStep={previousStep}
                    />
                  ) : step === 7 ? (
                    <OtherDetails
                      updateDataSheetAside={updateDataSheetAside}
                      previousStep={previousStep}
                    />
                  ) : step === 8 ? (
                    <AttachDocuments
                      updateDataSheetAside={updateDataSheetAside}
                      previousStep={previousStep}
                    />
                  ) : step === 9 ? (
                    <Products
                      updateDataSheetAside={updateDataSheetAside}
                      previousStep={previousStep}
                    />
                  ) : (
                    <WhatDocuments
                      updateDataSheetAside={updateDataSheetAside}
                      previousStep={previousStep}
                    />
                  )
                  //  : (
                  //   <DocumentSubmission
                  //     updateDataSheetAside={updateDataSheetAside}
                  //     previousStep={previousStep}
                  //   />
                  // )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { fetching_datasheet, datasheet_data, specific_datasheet_section } =
    state.shipmentDataSheet;
  return {
    fetching_datasheet,
    datasheet_data,
    specific_datasheet_section,
  };
};

export default connect(mapStateToProps, {
  getDataSheetById,
})(ShipmentDataSheet);
