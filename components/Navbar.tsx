import React from "react";
import { getServerAuthSession } from "~/server/auth";

type Props = {};

export async function Navbar({}: Props) {
  const session = await getServerAuthSession();
  return (
    <div className="max-full navbar mx-auto bg-[#FFF8F3] ">
      <div className="navbar mx-auto flex max-w-5xl justify-between bg-[#FFF8F3]">
        <a className="btn btn-ghost mb-4   bg-gradient-to-r from-accent to-secondary bg-clip-text text-2xl font-black tracking-tight text-transparent drop-shadow-xl hover:bg-[#BF95F9] sm:text-6xl md:text-3xl">
          EventOne
        </a>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="text-black ">Link</a>
            </li>
            <li>
              <details>
                <summary className="text-black hover:bg-[#BF95F9]">
                  Möglichkeiten
                </summary>
                <ul className="rounded-t-none bg-[#FFF8F3] p-2">
                  <li>
                    <a
                      href="#EventSuchen"
                      className="text-black hover:bg-[#BF95F9]"
                    >
                      Event Teilnahme
                    </a>
                  </li>
                  <li>
                    <a
                      href="#EventErstellen"
                      className="text-black hover:bg-[#BF95F9]"
                    >
                      Event Erstellen
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
