import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const characterRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const characters = await ctx.prisma.characters.findMany({
      select: {
        charidentifier: true,
        firstname: true,
        lastname: true,
        gender: true,
        money: true,
        gold: true,
        rol: true,
        job: true,
        jobgrade: true,
        joblabel: true,
      }
    })

    return characters;
  }),

  getById: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const character = await ctx.prisma.characters.findUnique({
      where: { charidentifier: input },
      select: {
        identifier: true,
        charidentifier: true,
        firstname: true,
        lastname: true,
        gender: true,
        money: true,
        gold: true,
        rol: true,
        job: true,
        jobgrade: true,
        joblabel: true,
        skills: true,
      }
    });

    return character;
  }),

  delete: protectedProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.characters.delete({
      where: { charidentifier: input },
    });
  }),
});
