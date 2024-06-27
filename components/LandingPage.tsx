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
    <div className="scrollbar scrollbar-track-slate-950 scrollbar-thumb-blue-400 h-screen space-y-10">
      <div className="scrollbar scrollbar-track-white scrollbar-thumb-orange-400 relative m-2 mx-auto flex h-screen flex-col space-y-10 overflow-y-scroll p-5 sm:overflow-hidden md:flex-col lg:flex-row">
        <div className="flex w-1/2 flex-row items-center justify-center">
          <div>
            {events.length > 0 && (
              <motion.div
                key={currentIndex}
                className="card bg-base-100 hover w-96 rounded-lg border
    border-black p-5 shadow-xl duration-200"
                variants={container}
                initial="hidden"
                animate="visible"
              >
                <figure>
                  <motion.img
                    src={events[currentIndex].images[0].url}
                    alt="Event"
                    className="h-60 w-full object-contain"
                    variants={item}
                  />
                </figure>
                <motion.div className="card-body" variants={item}>
                  <h2 className="card-title">{events[currentIndex].name}</h2>
                  <p>{/* Description goes here */}</p>
                  <div className="card-actions justify-center">
                    <motion.button
                      className="btn via-magenta-500 bg-gradient-to-r from-slate-500 to-pink-500 text-white"
                      whileHover={{
                        scale: 1.2,
                        transition: { duration: 1 },
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Teilnehmen
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
            {currentIndex < events.length - 1 && (
              <button
                onClick={handleNextEvent}
                className="join-item btn btn-outline via-magenta-500 bg-gradient-to-r from-slate-500 to-pink-500 text-white"
              >
                Nächstes Event
              </button>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <div className="relative top-40 p-5">
            <h1 className="text-center text-5xl font-extrabold tracking-tight lg:text-left lg:text-6xl  xl:text-7xl">
              Finde Events{" "}
              <span className="via-magenta-500 bg-gradient-to-r from-black to-pink-500 bg-clip-text text-transparent">
                in deiner Nähe
              </span>{" "}
              oder{" "}
              <span className="via-magenta-500 bg-gradient-to-r from-slate-500 to-pink-500 bg-clip-text text-transparent">
                erstelle deine eigenen
              </span>
            </h1>
            <p className="text-center text-2xl leading-relaxed text-gray-700 lg:text-left">
              Leicht Planen und Gestalten
            </p>
            <button className="btn btn-wide via-magenta-500 bg-gradient-to-r from-slate-500 to-pink-500 text-white">
              Jetzt loslegen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
