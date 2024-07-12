"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Event {
  name: string;
  dates: {
    start: {
      localDate: string;
    };
  };
  url: string;
  images: {
    url: string;
  }[];
  _embedded: {
    venues: {
      city: {
        name: string;
      };
    }[];
  };
  priceRanges?: {
    max: number;
  }[];
}

interface TicketmasterResponse {
  _embedded?: {
    events: Event[];
  };
}

function Example() {
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [checkboxStates, setCheckboxStates] = useState<Record<number, boolean>>(
    {},
  );

  useEffect(() => {
    const apikey = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&city=Hannover&countryCode=DE`,
        );
        if (!response.ok) {
          throw new Error(`Error fetching events: ${response.statusText}`);
        }

        const data = (await response.json()) as TicketmasterResponse;
        const events = data._embedded?.events ?? [];
        const filteredEvents = events.filter((event) =>
          event._embedded.venues.some(
            (venue) => venue.city.name === "Hannover",
          ),
        );
        setEvents(filteredEvents);
        console.log(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    void fetchEvents();
  }, []);
  const handleCheckboxChange = (index: number) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };

  const handleTeilnahmeClick = (event: Event, index: number) => {
    if (!selectedEvents.includes(event) && checkboxStates[index]) {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center space-y-5 bg-[#FFF8F3] p-5 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 lg:text-6xl">
          Wähle ein Event
        </h1>
        <p className="text-xl font-medium text-gray-800">
          Markiere es und füge es deinem EventPlan hinzu
        </p>
      </div>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="border-gradient-to-r via-magenta-500 w-full max-w-4xl rounded-3xl border-2 border-base-content bg-white from-slate-500 to-pink-500 md:border-4"
      >
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Beschreibung</th>
                <th>Ort</th>
                <th>Preis</th>
              </tr>
            </thead>
            <tbody>
              {events.slice(0, 5).map((event, index) => (
                <tr key={index}>
                  <th>
                    <label>
                      <input
                        onChange={() => handleCheckboxChange(index)}
                        type="checkbox"
                        className="checkbox"
                        checked={checkboxStates[index] ?? false}
                      />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={event.images[0]?.url} alt="Event" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{event.name}</div>
                        <div className="text-sm opacity-50">
                          {event.dates.start.localDate}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hover:scale-105">
                    {event.name}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {event.name}
                    </span>
                  </td>
                  <td>Hannover</td>
                  <td>€ {event.priceRanges?.[0]?.max ?? "N/A"}</td>
                  <th>
                    <motion.button
                      onClick={() => handleTeilnahmeClick(event, index)}
                      className="via-magenta-500 btn btn-ghost btn-xs bg-[#BF95F9] text-white hover:bg-purple-700"
                      whileHover={{
                        scale: 1.2,
                        transition: { duration: 1 },
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Teilnehmen
                    </motion.button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      {selectedEvents.length > 0 && (
        <div className="mt-8 w-full max-w-4xl">
          <h1 className="mb-4 text-center text-2xl font-bold">Meine Events</h1>
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
                    src={event.images[0]?.url}
                    alt="Event"
                    className="h-40 w-full rounded-t-lg object-cover"
                  />
                  <div className="w-50 relative mt-4 h-[2px] bg-slate-500"></div>
                  <div className="p-4">
                    <h2 className="text-lg font-bold">{event.name}</h2>
                    <p className="text-gray-600">
                      {event.dates.start.localDate}
                    </p>
                    <p className="text-gray-600">Hannover</p>
                    <div className="flex">
                      <button
                        onClick={() =>
                          setSelectedEvents(
                            selectedEvents.filter(
                              (selectedEvent) => selectedEvent !== event,
                            ),
                          )
                        }
                        className="via-magenta-500 btn btn-ghost btn-xs bg-[#BF95F9] text-white hover:bg-purple-700"
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
  );
}

export default Example;
