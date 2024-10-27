import { z } from "zod";
import { Prisma } from "@prisma/client";

export const characterFormSchema = z.object({
  charidentifier: z.number(),
  firstname: z.string().nullable(),
  lastname: z.string().nullable(),
  gender: z.string(),
});

export type CharacterFormValues = z.infer<typeof characterFormSchema>;

export const characterColumn = z.object({
  charidentifier: z.number(),
  firstname: z.string().nullable(),
  lastname: z.string().nullable(),
  gender: z.string(),
  money: z.number(),
  gold: z.number(),
  rol: z.number(),
  job: z.string(),
  jobgrade: z.number(),
  joblabel: z.string(),
});

export type CharacterColumn = z.infer<typeof characterColumn>;

export const updateCharacterFormSchema = z.object({
  charidentifier: z.number(),
  firstname: z.string().nullable(),
  lastname: z.string().nullable(),
  gender: z.string().nullable(),
});

export type UpdateCharacterFormValues = z.infer<typeof updateCharacterFormSchema>;

export const itemFormSchema = z.object({
  id: z.number().optional(),
  item: z.string(),
  label: z.string(),
  limit: z.coerce.number(),
  can_remove: z.number().min(0).max(1),
  // type: z.string(), // type removed from form as it's not used in vorp inventory anyway
  usable: z.number().min(0).max(1).nullable(),
  desc: z.string(),
  metadata: z.string().nullable(),
  weight: z.custom<Prisma.Decimal>((value: string) => {
    return new Prisma.Decimal(value);
  })
});

export type itemFormType = z.infer<typeof itemFormSchema>;
