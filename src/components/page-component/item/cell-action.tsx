"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Pencil, Trash2 } from "lucide-react";
import { AlertModal } from "@/components/common/alert-modal";
import { ItemModal } from "./item-modal";
import { type Prisma } from "@prisma/client";

interface ItemType {
  label: string;
  desc: string;
  metadata: string | null;
  type: string | null;
  id: number;
  item: string;
  limit: number;
  can_remove: number;
  usable: number | null;
  weight: Prisma.Decimal;
}

interface CellActionProps {
  data: ItemType;
}

export function CellAction({ data }: CellActionProps) {
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [itemModalOpen, setItemModalOpen] = useState(false);

  const { refetch } = api.item.getAll.useQuery(undefined, {
    enabled: false,
  });

  const { mutate: deleteItem, isLoading: deleteItemIsLoading } =
    api.item.delete.useMutation({
      onError: (err) => {
        toast.error(err.message);
      },
      onSuccess: async () => {
        toast.success("Item deleted");
        setAlertModalOpen(false);
        await refetch();
      },
    });

  return (
    <div className="flex justify-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-secondary"
              onClick={() => {
                setItemModalOpen(true);
              }}
            >
              <Pencil className="h-4 w-4 text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit item</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-secondary"
              onClick={() => {
                setAlertModalOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4 text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete item</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <ItemModal
        title="Edit item"
        description="Edit the item details"
        data={data}
        isOpen={itemModalOpen}
        onClose={() => setItemModalOpen(false)}
        // onConfirm={() => {}}
      />

      <AlertModal
        title="Are you sure?"
        description="This action cannot be undone."
        name={data.label}
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={() => deleteItem(data.id)}
        loading={deleteItemIsLoading}
      />
    </div>
  );
}
