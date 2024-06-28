"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { api } from "~/trpc/react";

type Props = {};

function EventErstellen({}: Props) {
  const [event, setEvent] = useState("");
  const {
    data: tasks,
    isLoading,
    refetch: refetchEvents,
  } = api.event.getAll.useQuery();
  const createEventMutation = api.event.create.useMutation();
  const updateEventMutation = api.event.update.useMutation();

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [eventTeilNahme, setEventTeilNahme] = useState(false);
  const createEvent = api.event.create.useMutation({
    onSuccess: () => {
      void refetchEvents();
    },
  });
  const updateTask = api.event.update.useMutation({
    onSuccess: () => {
      void refetchEvents();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPlan(true);
  };

  const handleTeilNahme = (e: React.FormEvent) => {
    setEventTeilNahme(true);
    e.preventDefault();
  };

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center space-y-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl font-extrabold tracking-tight lg:text-4xl xl:text-5xl">
        Erstelle Events und teile sie mit anderen
      </h1>
      <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row">
        <div className="w-full max-w-md">
          <form
            className="flex flex-col space-y-4 rounded-lg bg-white p-6 shadow-lg"
            onSubmit={handleSubmit}
          >
            <input
              onChange={(e) => setEventName(e.target.value)}
              className="input input-bordered w-full"
              type="text"
              placeholder="Event Name"
            />
            <input
              onChange={(e) => setEventDate(e.target.value)}
              className="input input-bordered w-full"
              type="date"
              placeholder="Event Datum"
            />
            <input
              onChange={(e) => setEventDescription(e.target.value)}
              className="input input-bordered w-full"
              type="text"
              placeholder="Event Beschreibung"
            />
            <input
              onChange={(e) => setEventLocation(e.target.value)}
              className="input input-bordered w-full"
              type="text"
              placeholder="Event Ort"
            />
            <motion.button
              type="submit"
              className="via-magenta-500 btn w-full bg-gradient-to-r from-slate-500 to-pink-500 text-white"
              whileHover={{
                scale: 1.1,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              Event erstellen
            </motion.button>
          </form>
        </div>
        {showPlan && (
          <div className="w-full max-w-2xl space-y-6">
            <h2 className="text-center text-2xl font-bold">Geplante Events</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <motion.div
                className="rounded-lg bg-white p-4 shadow-lg"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <img
                  src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                  alt="Event"
                  className="h-40 w-full rounded-t-lg object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{eventName}</h2>
                  <p className="text-gray-600">{eventDate}</p>
                  <p className="text-gray-600">{eventLocation}</p>
                  <p className="text-gray-600">{eventDescription}</p>
                  <motion.button
                    onClick={handleTeilNahme}
                    className="via-magenta-500 btn mt-4 w-full bg-gradient-to-r from-slate-500 to-pink-500 text-white"
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 1.2 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Teilnehmen
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
        {eventTeilNahme && (
          <div className="mt-8 w-full max-w-2xl space-y-6">
            <h2 className="text-center text-2xl font-bold">Meine Events</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <motion.div
                className="rounded-lg bg-white p-4 shadow-lg"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <img
                  src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                  alt="Event"
                  className="h-40 w-full rounded-t-lg object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{eventName}</h2>
                  <p className="text-gray-600">{eventDate}</p>
                  <p className="text-gray-600">{eventLocation}</p>
                  <p className="text-gray-600">{eventDescription}</p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventErstellen;
