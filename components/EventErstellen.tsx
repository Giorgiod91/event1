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
      await createEventMutation.mutateAsync({
        title,
        date: eventDate,
        description: eventDescription,
        location: eventLocation,
      });

      // Reset form fields
      setTitle("");
      setEventDate("");
      setEventDescription("");
      setEventLocation("");

      await refetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  // for updating the event in my db but not using it for now i just want to showcase a demo of how to update an event

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

  const handleTeilnahmeClick = (event: any) => {
    if (!selectedEvents.includes(event)) {
      setSelectedEvents([...selectedEvents, event]);
      setEventTeilNahme(true);
    }
  };

  const handleRemoveEvent = (eventToRemove: any) => {
    const updatedSelectedEvents = selectedEvents.filter(
      (event) => event !== eventToRemove,
    );
    setSelectedEvents(updatedSelectedEvents);
    if (updatedSelectedEvents.length === 0) {
      setEventTeilNahme(false);
    }
  };

  useEffect(() => {
    if (events) {
      console.log("Fetched events:", events);
    }
  }, [events]);

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center space-y-8 p-5 px-4 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight lg:text-4xl xl:text-5xl">
        Erstelle Events und teile sie mit anderen
      </h1>
      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="rounded-3xl border-2 border-base-content bg-white p-6 shadow-lg md:border-4">
          <h2 className="mb-4 text-xl font-bold">Neues Event erstellen</h2>
          <form onSubmit={handleCreateEvent} className="space-y-4">
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
              className="btn w-full bg-gradient-to-r from-slate-500 to-pink-500 text-white"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              Event erstellen
            </motion.button>
          </form>
        </div>

        <div className="rounded-3xl border-2 border-base-content bg-white p-6 shadow-lg md:border-4">
          <h2 className="mb-4 text-xl font-bold">Geplante Events</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events?.map((event, index) => (
              <motion.div
                key={index}
                className="flex items-start rounded-lg border border-gray-200 p-4"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-200"></div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <p className="mb-2 text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">{event.description}</p>
                  <div className="mt-2">
                    <motion.button
                      onClick={() => handleTeilnahmeClick(event)}
                      className="btn btn-ghost btn-xs bg-gradient-to-r from-slate-500 to-pink-500 text-white"
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Teilnehmen
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {eventTeilNahme && (
          <div className="rounded-3xl border-2 border-base-content bg-white p-6 shadow-lg md:border-4">
            <h2 className="mb-4 text-xl font-bold">
              Meine ausgewählten Events
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {selectedEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col rounded-lg border border-gray-200 p-4"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="mb-2 flex items-center">
                    <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold">{event.title}</h3>
                      <p className="mb-2 text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <motion.button
                      onClick={() => handleRemoveEvent(event)}
                      className="btn btn-ghost btn-xs bg-gradient-to-r from-slate-500 to-pink-500 text-white"
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Entfernen
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventErstellen;
