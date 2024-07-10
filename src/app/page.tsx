import EventErstellen from "components/EventErstellen";
import Example from "components/Example";
import Footer from "components/Footer";
import LandingPage from "components/LandingPage";
import { Navbar } from "components/Navbar";
import SecondSection from "components/SecondSection";
import ThirdSection from "components/thirdSection";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen  flex-col  items-center justify-between ">
      <Navbar />
      <section className="w-full">
        <LandingPage />
      </section>

      <section className="w-full">
        <SecondSection />
      </section>
      <section id="EventSuchen" className="w-full">
        <Example />
      </section>
      <section className="w-full">
        <ThirdSection />
      </section>
      <section id="EventErstellen" className="w-full">
        <EventErstellen />
      </section>
      <section id="payment" className="w-full"></section>

      <section className="w-full">
        <Footer />
      </section>
    </main>
  );
}
