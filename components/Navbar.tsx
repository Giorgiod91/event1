import React from "react";
import { getServerAuthSession } from "~/server/auth";

type Props = {};

export async function Navbar({}: Props) {
  const session = await getServerAuthSession();
  return (
    <div>
      <div className="via-magenta-500 navbar bg-gradient-to-r from-slate-500 to-pink-500">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-white">EvenTS</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              // login button with nextauth
              <a href="/api/auth/signin" className="btn btn-ghost text-white">
                Login
              </a>
            </li>
            <li>
              <details>
                <summary className="text-white">Möglichkeiten</summary>
                <ul className="rounded-t-none bg-white/20 p-2">
                  <li>
                    <a className="text-black" href="#EventSuchen">
                      Events Suchen
                    </a>
                  </li>
                  <li>
                    <a
                      className="cursor-pointer text-black"
                      href="#EventErstellen"
                    >
                      Events erstellen
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
