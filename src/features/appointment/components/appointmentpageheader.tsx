"use client";
import React, { ReactEventHandler } from "react";

import Button from "@/features/shared-features/common/button";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import {
  setAddAppointmentFormTrue,
  setAppointmentView,
} from "@/state/admin/AdminSlice";
import { Button1 } from "@/features/shared-features/table/components/ui/button";
import { RootState, useAppSelector } from "@/state/store";
import { IdCard, Sheet } from "lucide-react";

const AppointmentPageHeader = () => {
  const dispatch = useDispatch();
  const { view } = useAppSelector(
    (state: RootState) => state.admin.admin.appointment.viewType
  );

  const handleButtonClick = (e: ReactEventHandler) => {
    dispatch(setAddAppointmentFormTrue(true));
  };

  return (
    <div className="max-w-full flex justify-between lg:max-w-[calc(100vw-120px)]">
      <div className="flex flex-col">
        <div className=" flex gap-4 items-center">
          <div className="font-semibold text-md  md:text-xl lg:text-2xl">
            Appointment
          </div>
          <div className="flex items-center px-2 h-[18px] lg:h-[25px] bg-blue-50 text-blue-400 text-[11px] lg:text-[14px] rounded-xl">
            Today
          </div>
        </div>
        <div className="text-[#667085] text-[11px] lg:text-[13px] sm:text-[12px] md:text-[13px] lg:text-[15px] tracking-wide">
          View and Manage Your Appointment here.
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row lg:gap-4 justify-between items-center">
        <Button1
          className="flex gap-2 justify-center items-center h-[30px] w-[100px] sm:h-[34px] sm:w-[130px] lg:w-[170px] lg:h-[38px] font-normal text-[12px] sm:text-[14px] lg:text-[16px] rounded-md cursor-pointer"
          variant="outline"
          size="sm"
          onClick={() => dispatch(setAppointmentView(!view))}
        >
          {view ? (
            <Sheet className="size-3.5 lg:size-5" />
          ) : (
            <IdCard className="size-3.5 lg:size-6" />
          )}
          {view ? "Card" : "Table"} View
        </Button1>
        <div className="flex items-center">
          <Button
            css={{
              customCss:
                "flex gap-0 sm:gap-2 justify-center items-center h-[30px] w-[100px] lg:w-[170px] sm:h-[34px] sm:w-[130px] lg:h-[38px] bg-[#0070FF] font-medium text-white  text-[10px] sm:text-[14px] lg:text-[16px] rounded-md cursor-pointer",
            }}
            title="Add Appointment"
            icon={
              <AddIcon
                className="text-white"
                sx={{
                  fontSize: {
                    xs: "17px",
                    sm: "20px",
                    lg: "22px",
                    xl: "24px",
                  },
                }}
              />
            }
            handleAction={handleButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentPageHeader;
