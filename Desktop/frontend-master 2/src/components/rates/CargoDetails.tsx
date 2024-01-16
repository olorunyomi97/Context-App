import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

//components
import CustomInput from "components/textInputs/CustomInput";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import CustomRadio from "components/selectInputs/CustomRadio";
import CustomTextarea from "components/textInputs/CustomTextarea";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import CustomSelect from "components/selectInputs/CustomSelect";

//redux
import { updateCargoDetails } from "store/actions";

const CargoDetails = (props: any): JSX.Element => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [containerSize, setContainerSize] = useState(20);
  const [goodsType, setGoodsType] = useState("raw materials");
  const [currency, setCurrency] = useState({ options: "", value: "" });

  const defaultCurrencies = [
    { value: "USD", label: "$" },
    { value: "EUR", label: "€" },
    { value: "GBP", label: "£" },
  ];

  const {
    shipmentType,
    loading,
    previousStep,
    nextStep,
    rate_data,
    updateCargoDetails,
    showStep,
  } = props;

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const onSubmit = (data: any) => {
    data.container_size = containerSize;
    data.goods_type = goodsType;

    const newData = {
      id: urlParams.get("id") || rate_data._id,
      data,
    };

    updateCargoDetails(newData, nextStep, shipmentType);
  };

  useEffect(() => {
    if (rate_data.container_size) {
      setContainerSize(rate_data.container_size);
    }
    if (rate_data.goods_type) {
      setGoodsType(rate_data.goods_type);
    }
  }, [rate_data]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-24">
        <div className="booking-card md:p-10">
          <div className="">
            <CustomInput
              control={control}
              name={"container_count"}
              id={"container_count"}
              label={"No of container(s)"}
              placeholder={"Enter no of container(s)"}
              isRequired={true}
              type={"number"}
              errors={errors}
              isDisabled={false}
              defaultValue={rate_data?.container_count}
              min={"1"}
              max={""}
              icon=""
            />
          </div>

          <div className="mt-5">
            <p className="text-xs font-medium black-text mb-2">
              Size of container
            </p>
            <div className="grid grid-cols-2">
              <div className="mr-1">
                <CustomRadio
                  selected={containerSize === 20 ? true : false}
                  label={"20 Feet"}
                  onClick={() => setContainerSize(20)}
                />
              </div>

              <div className="ml-1">
                <CustomRadio
                  selected={containerSize === 40 ? true : false}
                  label={"40 Feet"}
                  onClick={() => setContainerSize(40)}
                />
              </div>
            </div>
          </div>

          <div className="mt-2">
            <p className="text-xs font-medium black-text mb-2">Goods type</p>
            <div className="grid grid-cols-2">
              <div className="mr-1">
                <CustomRadio
                  selected={goodsType === "raw materials" ? true : false}
                  label={"Raw Material"}
                  onClick={() => setGoodsType("raw materials")}
                />
              </div>

              <div className="ml-1">
                <CustomRadio
                  selected={goodsType === "agro allied products" ? true : false}
                  label={"Agro Allied Products"}
                  onClick={() => setGoodsType("agro allied products")}
                />
              </div>
              <div className="mr-1">
                <CustomRadio
                  selected={goodsType === "solid minerals" ? true : false}
                  label={"Solid Minerals"}
                  onClick={() => setGoodsType("solid minerals")}
                />
              </div>

              <div className="ml-1">
                <CustomRadio
                  selected={goodsType === "finished goods" ? true : false}
                  label={"Finished Goods"}
                  onClick={() => setGoodsType("finished goods")}
                />
              </div>
            </div>
          </div>

          {/* <div className="mt-2"></div> */}

          <div className="mt-2">
            {/* <div className="w-1/5"> */}
            {/* @ts-ignore  */}
            {/* <CustomSelect
                name={"currency"}
                id={"currency"}
                control={control}
                label={"Currency"}
                errors={errors}
                isRequired={true}
                options={defaultCurrencies}
              /> */}
            {/* </div> */}
            {/* <div className="w-4/5"> */}
            {/* <CustomCurrencyInput
              control={control}
              name={"goods_value"}
              id={"goods_value"}
              label={"Total value of Goods (₦)"}
              placeholder={"Enter value of goods"}
              isRequired={true}
              type={"number"}
              errors={errors}
              isDisabled={false}
              defaultValue={rate_data?.goods_value}
              min={"1"}
              max={""}
              icon=""
            /> */}
            {/* </div> */}
          </div>

          <div className="mt-5">
            <CustomTextarea
              control={control}
              name={"cargo_description"}
              id={"cargo_description"}
              label={"Cargo description"}
              placeholder={"Enter cargo description"}
              isRequired={false}
              errors={errors}
              isDisabled={false}
              defaultValue={rate_data?.cargo_description}
              icon=""
            />
          </div>
        </div>
        <div className="grid grid-cols-3 mt-10 items-center">
          <div className="">
            {/* @ts-ignore */}
            <SecondaryButton
              title="Previous Step"
              icon="ion-ios-arrow-round-back"
              onClick={previousStep}
            />
          </div>
          <div className="mx-auto">
            {showStep ? (
              <p className="black-text font-medium text-base">Step 2 of 3</p>
            ) : (
              <></>
            )}
          </div>
          <div className="">
            {/* @ts-ignore */}
            <PrimaryButton title="Continue" loading={loading} />
          </div>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { loading, rate_data } = state.rate;
  return { loading, rate_data };
};
export default connect(mapStateToProps, { updateCargoDetails })(CargoDetails);