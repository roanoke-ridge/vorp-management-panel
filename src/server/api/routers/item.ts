import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { itemFormSchema } from "@/lib/validators";

export const itemRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.items.findMany()

    return items;
  }),

  getById: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const item = await ctx.prisma.items.findUnique({
      where: { id: input },
    });

    return item;
  }),

  create: publicProcedure
    .input(itemFormSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.items.create({
        data: { ...input, type: 'item_standard' }
      });
    }),

  update: publicProcedure
    .input(itemFormSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) { return false; }
      return await ctx.prisma.items.update({
        where: { id: input.id },
        data: { ...input },
      });
    }),

  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.items.delete({
      where: { id: input },
    });
  }),
});
