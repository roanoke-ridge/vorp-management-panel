import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { itemFormSchema } from "@/lib/validators";

export const itemRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.items.findMany()

    return items;
  }),

  getById: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const item = await ctx.prisma.items.findUnique({
      where: { id: input },
    });

    return item;
  }),

  create: protectedProcedure
    .input(itemFormSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.items.create({
        data: { ...input, type: 'item_standard' }
      });
    }),

  update: protectedProcedure
    .input(itemFormSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) { return false; }
      return await ctx.prisma.items.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),

  delete: protectedProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.items.delete({
      where: { id: input },
    });
  }),
});
