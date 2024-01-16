import React from "react";

//components
import Layout from "components/layout/Layout";
import ExportOceanAdditionalDetails from "components/additionalDetails/exportOcean/ExportOceanAdditionalDetails";

const AdditionalDetails = () => {
  return (
    <Layout>
      <main className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll no-over-flow-x">
        <ExportOceanAdditionalDetails />
      </main>
    </Layout>
  );
};

export default AdditionalDetails;
