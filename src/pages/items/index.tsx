import React from "react";
import { api } from "@/utils/api";
import { Loading } from "@/components/common/loading";
import { ItemClient } from "@/components/page-component/item/client";

const Items = () => {
  const { data, isLoading, isError, error } = api.item.getAll.useQuery();

  if (isLoading) return <Loading />;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 md:p-8">
        <ItemClient data={data} />
      </div>
    </div>
  );
};

export default Items;
