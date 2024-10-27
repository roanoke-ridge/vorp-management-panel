"use client";

import React, { useState } from "react";
import { Heading } from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table/data-table";
import { type items as ItemType } from "@prisma/client";
import { columns } from "./columns";

import { ItemModal } from "@/components/page-component/item/item-modal";

interface ItemClientProps {
  data: ItemType[];
}

export const ItemClient = ({ data }: ItemClientProps) => {
  const [itemModalOpen, setItemModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Items"
          description="Manage items"
        />
        <Button
          onClick={() => {
            setItemModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <div>
        <DataTable columns={columns} data={data} />
      </div>

      <ItemModal
        title="Add New Item"
        description="Add a new item to your server"
        isOpen={itemModalOpen}
        onClose={() => setItemModalOpen(false)}
        // onConfirm={() => {}}
      />
    </>
  );
};
