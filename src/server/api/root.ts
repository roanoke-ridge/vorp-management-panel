import { createTRPCRouter } from "@/server/api/trpc";
import { characterRouter } from "@/server/api/routers/character";
import { dashboardRouter } from "./routers/dashboard";
import { itemRouter } from "./routers/item";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  character: characterRouter,
  dashboard: dashboardRouter,
  item: itemRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
