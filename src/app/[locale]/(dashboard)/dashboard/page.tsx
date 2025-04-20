import React from "react";
import { SectionCards } from "@/components/section-cards"; 
import { api } from "@/lib/api/serverCore";  
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
// import { IHomeDashboardResponse } from "@/entities/dashboard"; 

const Page = async () => {
  const data = await api.get("getHome"); 

  return (
    <div className="mt-3">
      <SectionCards data={data} /> 
      <div className="px-4 lg:px-6 mt-5">
        <ChartAreaInteractive />

      </div>
    </div>
  );
};

export default Page;
