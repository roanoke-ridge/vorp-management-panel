"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type items as ItemType } from "@prisma/client";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<ItemType>[] = [
  {
    accessorKey: "item",
    header: "Item Key",
  },
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "desc",
    header: "Description",
  },
  {
    accessorKey: "limit",
    header: "Limit",
  },
  {
    accessorKey: "can_remove",
    header: "Removable",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "usable",
    header: "Usable",
  },
  {
    accessorKey: "metadata",
    header: "Metadata",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
