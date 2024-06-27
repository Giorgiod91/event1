"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {};
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
}

function Example({}: Props) {
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://app.ticketmaster.com/discovery/v2/events.json?apikey=9kvw9fCMZfFe363wHUrKAKAfHaivj4BA&city=Hannover&countryCode=DE",
        );
        if (!response.ok) {
          throw new Error(`Error fetching events: ${response.statusText}`);
        }
        const data = await response.json();
        const events = data._embedded?.events ?? [];
        // Filter events to ensure they are in Hannover
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

    fetchEvents();
  }, []);

  const handleTeilnahmeClick = (event: Event) => {
    setSelectedEvents([...selectedEvents, event]);
  };

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center space-y-5 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
          Suche ein Event aus,
        </h1>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
          markiere es und füge es deinem EventPlan hinzu
        </h1>
      </div>
      <div className="w-340 border-gradient-to-r via-magenta-500 border-4 from-slate-500 to-pink-500">
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label></label>
                </th>
                <th>Name</th>
                <th>Beschreibung</th>
                <th>Ort</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {events.slice(0, 5).map((event, index) => (
                <tr key={index}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={event.images[0].url} alt="Event" />
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
                  <td>
                    {event.name}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {event.name}
                    </span>
                  </td>
                  <td>Hannover</td>
                  <th>
                    <motion.button
                      onClick={() => handleTeilnahmeClick(event)}
                      className="btn btn-ghost btn-xs via-magenta-500 bg-gradient-to-r from-slate-500 to-pink-500 text-white"
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
              {/* row 1 */}
            </tbody>
            {/* foot */}
            <tfoot></tfoot>
          </table>
        </div>
      </div>
      {selectedEvents.length > 0 && (
        <div className="mt-8 w-full max-w-3xl">
          <h1 className="mb-4 text-center text-2xl font-bold">Meine Events</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {selectedEvents.map((event, index) => (
              <motion.div
                key={index}
                className="rounded-lg bg-white p-4 shadow-lg"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <img
                  src={event.images[0].url}
                  alt="Event"
                  className="h-40 w-full rounded-t-lg object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{event.name}</h2>
                  <p className="text-gray-600">{event.dates.start.localDate}</p>
                  <p className="text-gray-600">Hannover</p>

                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        setSelectedEvents(
                          selectedEvents.filter(
                            (selectedEvent) => selectedEvent !== event,
                          ),
                        )
                      }
                      className="btn btn-ghost btn-xs via-magenta-500 bg-gradient-to-r from-slate-500 to-pink-500 text-white"
                    >
                      Entfernen
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Example;
