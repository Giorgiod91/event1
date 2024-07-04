import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        date: z.string(), // Date as string in 'YYYY-MM-DD' format
        description: z.string(),
        location: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const parsedDate = new Date(input.date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date format");
      }
      return ctx.db.event.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
          date: parsedDate, // Convert the string to Date
          description: input.description,
          location: input.location,
          completed: false,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        eventId: z.string().refine((val) => !isNaN(Number(val)), {
          message: "eventId must be a number",
        }),
        completed: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { eventId, completed } = input;
      const event = await ctx.db.event.update({
        where: { id: Number(eventId) },
        data: { completed },
      });
      return event;
    }),
});
