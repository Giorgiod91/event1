"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

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
}

function LandingPage({}: Props) {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const [events, setEvents] = useState<Event[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://app.ticketmaster.com/discovery/v2/events.json?apikey=9kvw9fCMZfFe363wHUrKAKAfHaivj4BA",
        );
        if (!response.ok) {
          throw new Error(`Error fetching events: ${response.statusText}`);
        }
        const data = await response.json();
        const events = data._embedded.events;
        setEvents(events);
        console.log(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleNextEvent = () => {
    if (currentIndex < events.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="h-screen bg-[#FFF5E4]  text-white">
      <div className="container mx-auto flex h-screen flex-col p-5 md:flex-row">
        <div className="flex w-full flex-col items-center justify-center md:w-1/2">
          <div>
            {events.length > 0 && (
              <motion.div
                key={currentIndex}
                className="card w-96 rounded-lg border-2 border-base-content bg-white p-5 shadow-xl duration-200 "
                variants={container}
                initial="hidden"
                animate="visible"
              >
                <figure>
                  <motion.img
                    src={events[currentIndex]?.images[0]?.url}
                    alt="Event"
                    className="h-60 w-full rounded-lg object-cover"
                    variants={item}
                  />
                </figure>
                <motion.div className="card-body" variants={item}>
                  <h2 className="mb-2 text-xl font-bold text-black">
                    {events[currentIndex]?.name}
                  </h2>
                  <p className="mb-4 text-gray-400">
                    {events[currentIndex]?.dates.start.localDate}
                  </p>
                  <div className="flex justify-center">
                    <motion.button
                      className="btn bg-neutral text-white shadow-xl hover:text-black"
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <a href="#EventSuchen">Teilnehmen</a>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
            {currentIndex < events.length - 1 && (
              <button
                onClick={handleNextEvent}
                className="btn  mt-4 bg-neutral text-white hover:text-black"
              >
                Nächstes Event
              </button>
            )}
          </div>
        </div>
        <div className="flex w-full items-center justify-center md:w-1/2">
          <div className="px-8 text-center">
            <h1 className="b mb-8 text-4xl font-extrabold text-black lg:text-6xl ">
              Finde und erstelle Events
            </h1>
            <p className="mb-8 text-xl text-gray-400">
              Entdecke Events in deiner Nähe oder plane deine eigenen
              Veranstaltungen.
            </p>
            <button className="btn  btn-wide mb-4 bg-neutral text-white hover:text-black  ">
              <a href="#EventErstellen">Jetzt loslegen</a>
            </button>
            <p className="text-sm text-gray-400">
              Du kannst auch unsere App herunterladen
            </p>
            <div className="mt-2 flex justify-center">
              <FaApple
                className="mx-2 h-10 w-24  object-contain"
                color="black"
              />
              <FcGoogle className="mx-2 h-10 w-24 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
