import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useSelector, connect } from "react-redux";

//icons
import close from "assets/icons/close.svg";

//component
import CustomInput from "components/textInputs/CustomInput";
// import CustomSelect from "components/selectInputs/CustomSelect";
// import CustomDefaultSelect from 'components/selectInputs/CustomDefaultSelect';
import CustomPhoneInput from "components/textInputs/CustomPhoneInput";
import PrimaryButtons from "components/buttons/PrimaryButtons";

//actions
import { inviteTeammate, updateTeammate } from "store/actions";

interface InviteTeamProps {
  error: string;
  mode: string;
  invite_loading: boolean;
  invite_message: string;
  invite_data?: {};
  my_teammates?: object;
  selectedId?: string;
  userInfo?: {
    _id?: "";
    email?: "";
    phone?: "";
    lastname?: "";
    firstname?: "";
    country_code?: "";
  };
  closeModal: () => void;
  inviteTeammate: (a, b) => void;
  updateTeammate: (a, b?) => void;
}

const InviteTeamModal = ({
  error,
  invite_loading,
  invite_message,
  invite_data,
  closeModal,
  inviteTeammate,
  updateTeammate,
  my_teammates,
  selectedId,
  userInfo,
  mode,
}: InviteTeamProps) => {
  // const { error, invite_loading, invite_message, invite_data, closeModal, inviteTeammate, my_teammates, selectedId, userInfo } = props;
  const ref = useRef<HTMLDivElement>(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // console.log("juker>>>", userInfo)

  //callback functiom
  const onInvite = () => {
    closeModal();
    window.location.reload();
  };

  // useEffect(() => {
  //   setUserInfo(my_teammates.filter((item) => item._id === selectedId))
  // }, [my_teammates, selectedId])

  const onSubmit = (data: any) => {
    console.log("Kki>>>", data);
    let data_ = {
      email: data.email,
      firstname: data.first_name,
      lastname: data.last_name,
      phone: data.phone_number.phone.toString(),
      country_code: data.phone_number.country_code
        ? data.phone_number.country_code.toString()
        : userInfo?.country_code,
    };

    let updateDate = {
      firstname: data.first_name,
      lastname: data.last_name,
      phone: data.phone_number.phone.toString(),
      country_code: data.phone_number.country_code
        ? data.phone_number.country_code.toString()
        : userInfo?.country_code,
    };

    const finalData = {
      id: userInfo?._id,
      data: updateDate,
    };
    // console.log("koko>>", typeof data.phone_number.phone)

    console.log("nommb>>>", data.phone_number.phone);
    console.log("nommb33>>>", data.phone_number.country_code);
    mode === "invite"
      ? inviteTeammate(data_, onInvite)
      : updateTeammate(finalData, onInvite);
  };

  console.log("nioco>>", userInfo);
  // console.log('xero>>>', my_teammates)

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-center h-full bg-[#0618028c] z-[50]">
      <div
        ref={ref}
        className="flex flex-col bg-white rounded-lg w-full mx-4 md:w-[434px] md:mx-0 max-h-[calc(100vh_-_50px)]"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center pt-6 px-6 pb-4 border-solid border-b-[1px] border-[#e6e7ec80]">
            <div>
              <p className="text-xl black-text-3 font-semibold">
                {mode === "invite"
                  ? "Invite New Team Member"
                  : "Edit Team Member"}
              </p>
            </div>
            <>
              <img
                className="cursor-pointer"
                onClick={closeModal}
                src={close}
                alt="close"
              />
            </>
          </div>
          <div className="py-4 md:py-8 px-6 flex flex-col max-h-[500px] xl:max-h-max overflow-y-scroll">
            <CustomInput
              control={control}
              name={"first_name"}
              id={"first_name"}
              label={"First Name"}
              placeholder={""}
              isRequired={true}
              type="text"
              errors={errors}
              isDisabled={false}
              //@ts-ignore
              defaultValue={
                mode === "invite"
                  ? ""
                  : //@ts-ignore
                    userInfo.firstname.charAt(0).toUpperCase() +
                    //@ts-ignore
                    userInfo.firstname.slice(1)
              }
              min={""}
              max={""}
              icon={""}
            />
            <CustomInput
              control={control}
              name={"last_name"}
              id={"last_name"}
              label={"Last Name"}
              placeholder={""}
              isRequired={true}
              type="text"
              errors={errors}
              isDisabled={false}
              //@ts-ignore
              defaultValue={
                mode === "invite"
                  ? ""
                  : //@ts-ignore
                    userInfo.lastname.charAt(0).toUpperCase() +
                    //@ts-ignore
                    userInfo.lastname.slice(1)
              }
              min={""}
              max={""}
              icon={""}
            />
            <CustomInput
              control={control}
              name={"email"}
              id={"email"}
              label={"Email"}
              placeholder={""}
              isRequired={true}
              type="text"
              errors={errors}
              isDisabled={mode === "invite" ? false : true}
              //@ts-ignore
              defaultValue={mode === "invite" ? "" : userInfo.email}
              min={""}
              max={""}
              icon={""}
            />
            {/* <CustomInput
              control={control}
              name={"phone_number"}
              id={"phone_number"}
              label={"Phone Number"}
              placeholder={""}
              isRequired={true}
              type="number"
              errors={errors}
              isDisabled={false}
              //@ts-ignore
              defaultValue={mode === "invite" ? "" : userInfo.phone}
              min={""}
              max={""}
              icon={""}
            /> */}
            {/* <CustomDefaultSelect
              control={control}
              name={"role"}
              id={"role"}
              label={"Role"}
              placeholder={"Choose a role"}
              isRequired={true}
              errors={errors}
              isDisabled={false}
              options={[
                { label: "Team Member", value: "team_member" },
                { label: "Super Admin", value: "super_admin" },
              ]}
              defaultValue={''}
              icon=""
            /> */}
            <CustomPhoneInput
              control={control}
              name={"phone_number"}
              id={"phone_number"}
              label={"Phone Number"}
              isRequired={true}
              //@ts-ignore
              defaultValue={mode === "invite" ? "" : userInfo.phone}
              placeholder={"Enter phone number"}
              isDisabled={false}
              errors={errors}
            />
          </div>
          <div className="p-4 border-solid border-t-[1px] border-[#e6e7ec80] shadow-[0_-3px_32px_-12px_rgba(0,0,0,0.18)]">
            <PrimaryButtons
              title={mode === "invite" ? "Invite Team Member" : "Save Changes"}
              style={{ color: "#59725C" }}
              // onClick={closeModal}
              disabled={false}
              loading={invite_loading}
              icon={""}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { error, invite_loading, invite_message, invite_data } =
    state.teammates;
  return { error, invite_loading, invite_message, invite_data };
};

export default connect(mapStateToProps, { inviteTeammate, updateTeammate })(
  InviteTeamModal
);
