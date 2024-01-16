import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//components
import Layout from "components/layout/Layout";
import ExportOcean from "components/rate/exportOcean/ExportOcean";
import FreightQuickForm from "components/rate/freightQuickForm/FreightQuickForm";

const Rate = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  console.log("StateID>>>", state?.shipID);

  const [components] = useState([
    {
      id: 1,
      component: <ExportOcean shipId={state?.shipId} />,
      shipmentCategory: "ExportOcean Freight",
    },
    {
      id: 2,
      component: <FreightQuickForm />,
      shipmentCategory: "ExportGet a quick quote",
    },
    {
      id: 3,
      component: <FreightQuickForm />,
      shipmentCategory: "ImportGet a quick quote",
    },
  ]);

  const [activeComponent, setActiveComponent] = useState<any>({
    id: 1,
    component: <ExportOcean />,
    shipmentCategory: "ExportOcean Freight",
  });

  useEffect(() => {
    if (
      !state?.shipmentCategory ||
      !components.find(
        (item: any) => item.shipmentCategory === state?.shipmentCategory
      )
    ) {
      navigate("/dashboard");
      return;
    }
    // if (!components.find((item: any) => item.shipmentCategory === state?.shipmentCategory)) {

    // }
    setActiveComponent((getPrev: any) =>
      components.find(
        (item: any) => item.shipmentCategory === state?.shipmentCategory
      )
    );
  }, [state]);

  return (
    <Layout>
      <main className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll no-over-flow-x">
        {/* {conditionalComponent()} */}
        {activeComponent.component}
      </main>
    </Layout>
  );
};

export default Rate;

//function that determines which component to be rendered based on the page
// const conditionalComponent = () => {
//   if (!state?.shipmentCategory) {
//     navigate('/dashboard')
//     return;
//   }
//   switch (state?.shipmentCategory) {
//     case "ExportOcean Freight":
//       return <ExportOcean shipId={state?.shipId} />

//     case "ExportGet a quick quote":
//     case "ImportGet a quick quote":
//     case "ExportAir Freight":
//       return <FreightQuickForm />

//     default:
//       return <FreightQuickForm />
//   }
// }
