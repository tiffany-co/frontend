import DashboardLayout from "@/layouts/dashboardLayout";
import CreateAddress from "@/components/createAddress";
import ShowAddress from "@/components/showAddress";
import Spinner from "@/components/spinner";
import { useAllAddresses } from "@/hooks";
import React from "react";
import "./address.css";

function Address() {
  const { data: allAddresses, refetch, isFetching } = useAllAddresses();
  return (
    <>
      <DashboardLayout>
        {isFetching ? <Spinner /> : null}
        <div>
          <h3>آدرس کاربر</h3>
          <div className="address-container">
            <div className="create-address">
              <CreateAddress refetch={refetch} />
            </div>
            <div className="row show-address">
              <ShowAddress
                allAddresses={allAddresses}
                refetch={refetch}
                isDashboard={true}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Address;
