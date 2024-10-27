/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { itemFormSchema, type itemFormType } from "@/lib/validators";
import { type items as ItemType } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { api } from "@/utils/api"
import toast from "react-hot-toast";
import { Prisma } from "@prisma/client";

interface ItemModalProps {
  title: string;
  description: string;
  data?: ItemType | null;
  // loading: boolean;
  isOpen: boolean;
  onClose: () => void;
  // onConfirm: () => void;
}

export const ItemModal = ({
  title,
  description,
  data,
  isOpen,
  onClose,
  // onConfirm,
  // loading,
}: ItemModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const { refetch } = api.item.getAll.useQuery(undefined, {
    enabled: false,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const form = useForm<itemFormType>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: data || {
      item: "",
      label: "",
      limit: 10,
      can_remove: 1,
      usable: 0,
      desc: "",
      metadata: "{}",
      weight: new Prisma.Decimal(0.25)
    },
  });

  const { mutate: createItem } = api.item.create.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: async () => {
      toast.success("Item created");
      await refetch();
      onClose();
    },
  });

  const { mutate: updateItem } = api.item.update.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: async () => {
      toast.success("Item updated");
      await refetch();
      onClose();
    },
  })

  function onSubmit(values: itemFormType) {
    values.weight = new Prisma.Decimal(values.weight);
    if (data) {
      values.id = data.id;
      updateItem(values);
    } else {
      console.log('creating');
      createItem(values);
    }
  }

  function onCancel() {
    form.reset();
    onClose();
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} action="#" className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="item"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Key</FormLabel>
                      <FormControl>
                        <Input placeholder="nice_item" {...field} />
                      </FormControl>
                      <FormDescription>
                        The item key is used to identify the item in the database.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input placeholder="Nice item" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is what your players will see in their inventory.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="This is a pretty nice item" {...field} />
                  </FormControl>
                  <FormDescription>
                    A well written description can help players understand the item better.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Limit</FormLabel>
                      <FormControl>
                        <Input placeholder="10" {...field} />
                      </FormControl>
                      <FormDescription>
                        The max amount a player can carry.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input placeholder="0.25" {...field} value={(field.value ?? 0.25).toString()} />
                      </FormControl>
                      <FormDescription>
                        How much does this item weigh?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="can_remove"
                  render={({ field }) => (
                    <FormItem key={field.value}>
                      <FormLabel>Removable</FormLabel>
                      <Select onValueChange={(value) => field.onChange(Number(value))} value={(field.value ?? '0').toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Yes</SelectItem>
                          <SelectItem value="0">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Can the player remove this item from their inventory?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="usable"
                  render={({ field }) => (
                    <FormItem key={field.value}>
                      <FormLabel>Usable</FormLabel>
                      <Select onValueChange={(value) => field.onChange(Number(value))} value={(field.value ?? '0').toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Yes</SelectItem>
                          <SelectItem value="0">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Is this a usable item?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="metadata"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metadata</FormLabel>
                  <FormControl>
                    <Textarea placeholder="{}" {...field} value={field.value ?? "{}"} />
                  </FormControl>
                  <FormDescription>
                    Leave this set as {"{}"} unless you know what you're doing.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="justify-between space-x-2">
              <Button variant="destructive" type="button" onClick={() => onCancel()}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
