const calculateTotalOceanFreight = (charges) => {
  let totalAmount = 0;
  // console.log("`charges`", charges);
  charges.length &&
    charges.map((item: any, index: number) => {
      if (index === 0) {
        totalAmount = item.amountUsd;
      } else {
        totalAmount += item.amountUsd;
      }
    });

  // console.log("totalAmount", totalAmount);

  return totalAmount;
};

export { calculateTotalOceanFreight };
