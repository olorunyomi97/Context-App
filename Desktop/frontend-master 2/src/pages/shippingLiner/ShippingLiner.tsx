import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//components
import Layout from "components/layout/Layout";
import ExportOceanLiner from "components/shippingLiner/ExportOceanLiner";
import FreightQuickForm from "components/rate/freightQuickForm/FreightQuickForm";

const ShippingLiner = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  // console.log("ID>>>", state.id)

  const [components] = useState([
    {
      id: 1,
      component: <ExportOceanLiner id={state?.id} />,
      nextCategory: "export_oceanliner",
    },
    { id: 2, component: <FreightQuickForm />, nextCategory: "quick_freight" },
  ]);

  const [activeComponent, setActiveComponent] = useState<any>({
    id: 1,
    component: <ExportOceanLiner />,
    shipmentCategory: "export_oceanliner",
  });

  useEffect(() => {
    if (
      !state?.nextCategory ||
      !components.find((item: any) => item.nextCategory === state?.nextCategory)
    ) {
      navigate("/dashboard");
      return;
    }
    setActiveComponent((getPrev: any) =>
      components.find((item: any) => item.nextCategory === state?.nextCategory)
    );
  }, []);

  // console.log("idOne>>>", state)
  return (
    <Layout>
      <main className="px-4 pt-8 lg:pt-10 lg:px-10 w-full dashboard-content-scroll no-over-flow-x">
        {/* <ExportOceanLiner /> */}
        {activeComponent.component}
      </main>
    </Layout>
  );
};

export default ShippingLiner;
