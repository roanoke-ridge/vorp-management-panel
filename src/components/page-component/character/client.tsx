"use client";
import React from "react";
import { Heading } from "@/components/common/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table/data-table";
import { type CharacterColumn } from "@/lib/validators";
import { columns } from "./columns";

interface CharacterClientProps {
  data: CharacterColumn[];
}

export const CharacterClient = ({ data }: CharacterClientProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Character"
          description="Manage characters"
        />
      </div>
      <Separator />
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};
