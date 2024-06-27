import React from "react";

type Props = {};

function Navbar({}: Props) {
  return (
    <div>
      <div className="navbar via-magenta-500 bg-gradient-to-r from-slate-500 to-pink-500">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-white">EvenTS</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="text-white">Login</a>
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

export default Navbar;
