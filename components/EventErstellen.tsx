"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { api } from "~/trpc/react";

type Props = {};

function EventErstellen({}: Props) {
  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [eventTeilNahme, setEventTeilNahme] = useState(false);

  const {
    data: events,
    isLoading,
    refetch: refetchEvents,
  } = api.event.getAll.useQuery();

  const createEventMutation = api.event.create.useMutation();
  const updateEventMutation = api.event.update.useMutation();

  const handleCreateEvent = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log("Creating event with:", {
        title,
        date: eventDate,
        description: eventDescription,
        location: eventLocation,
      });

      await createEventMutation.mutateAsync({
        title,
        date: eventDate, // Pass date as a string
        description: eventDescription,
        location: eventLocation,
      });

      // Reset form fields
      setTitle("");
      setEventDate("");
      setEventDescription("");
      setEventLocation("");

      await refetchEvents();
      console.log("Event created and events refetched.");
      setShowPlan(true); // Ensure showPlan is true to display the events
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleUpdateEvent = (eventId: number, completed: boolean) => {
    updateEventMutation.mutate(
      {
        eventId: eventId.toString(),
        completed: completed,
      },
      {
        onError: (error) => {
          console.error("Error updating event:", error);
        },
        onSuccess: () => {
          void refetchEvents();
        },
      },
    );
  };

  const handleTeilNahme = (event: any) => {
    setSelectedEvents([...selectedEvents, event]);
    setEventTeilNahme(true);
  };

  const handleRemoveEvent = (eventToRemove: any) => {
    setSelectedEvents(
      selectedEvents.filter((event) => event !== eventToRemove),
    );
  };

  useEffect(() => {
    if (events) {
      console.log("Fetched events:", events);
    }
  }, [events]);

  return (
    <div className="px=4 mx-auto flex min-h-screen w-full flex-col items-center justify-center space-y-8 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl font-extrabold tracking-tight lg:text-4xl xl:text-5xl">
        Erstelle Events und teile sie mit anderen
      </h1>
      <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row">
        <div className="w-full max-w-md">
          <form
            className="flex flex-col space-y-4 rounded-lg bg-white p-6 shadow-lg"
            onSubmit={handleCreateEvent}
          >
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="input input-bordered w-full"
              type="text"
              placeholder="Event Name"
              required
            />
            <input
              onChange={(e) => setEventDate(e.target.value)}
              value={eventDate}
              className="input input-bordered w-full"
              type="date"
              placeholder="Event Datum"
              required
            />
            <input
              onChange={(e) => setEventDescription(e.target.value)}
              value={eventDescription}
              className="input input-bordered w-full"
              type="text"
              placeholder="Event Beschreibung"
              required
            />
            <input
              onChange={(e) => setEventLocation(e.target.value)}
              value={eventLocation}
              className="input input-bordered w-full"
              type="text"
              placeholder="Event Ort"
              required
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
              {events?.map((event, index) => (
                <motion.div
                  key={index}
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
                    <h2 className="text-lg font-bold">{event.title}</h2>
                    <p className="text-gray-600">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">{event.location}</p>
                    <p className="text-gray-600">{event.description}</p>
                    <motion.button
                      onClick={() => handleTeilNahme(event)}
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
              ))}
            </div>
          </div>
        )}
        {eventTeilNahme && (
          <div className="mt-8 w-full max-w-2xl space-y-6">
            <h1 className="mb-4 text-center text-2xl font-bold">
              Meine Events
            </h1>
            <div className="max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {selectedEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    className="rounded-lg border border-b-gray-500 bg-white p-4 shadow-lg"
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
                    <div className="w-50 relative mt-4 h-[2px] bg-slate-500"></div>
                    <div className="p-4">
                      <h2 className="text-lg font-bold">{event.title}</h2>
                      <p className="text-gray-600">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">{event.location}</p>
                      <p className="text-gray-600">{event.description}</p>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleRemoveEvent(event)}
                          className="via-magenta-500 btn btn-ghost btn-xs bg-gradient-to-r from-slate-500 to-pink-500 text-white hover:text-black"
                        >
                          Entfernen
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventErstellen;
