"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type CharacterColumn } from "@/lib/validators";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<CharacterColumn>[] = [
  {
    accessorKey: "firstname",
    header: "First Name",
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "job",
    header: "Job",
  },
  {
    accessorKey: "jobgrade",
    header: "Job Grade",
  },
  {
    accessorKey: "joblabel",
    header: "Job Label",
  },
  {
    id: "actions",
    enableSorting: false,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
