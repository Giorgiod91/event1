import React from "react";
import { getServerAuthSession } from "~/server/auth";

export async function Navbar() {
  const session = await getServerAuthSession();
  //bg-[#FFF8F3]
  return (
    <div className="max-full navbar mx-auto bg-[#F7E7DC] ">
      <div className="navbar mx-auto flex max-w-5xl justify-between bg-[#F7E7DC]">
        <a className="btn btn-ghost mb-4 text-2xl font-black tracking-tight drop-shadow-xl hover:bg-[#BF95F9] sm:text-6xl md:text-3xl">
          EventOne
        </a>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="text-xl font-black text-black ">Link</a>
            </li>
            <li>
              <details>
                <summary className="text-xl font-black text-black hover:bg-[#BF95F9]">
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
