import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.event.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        eventId: z.string().refine((val) => !isNaN(Number(val)), {
          message: "taskId must be a number",
        }),
        completed: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { eventId, completed } = input;
      const task = await ctx.db.event.update({
        where: { id: Number(eventId) },
        data: { completed },
      });
      return task;
    }),
});
