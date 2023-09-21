import React, { useState, useEffect, useRef } from "react";
import axolotl from "./assets/axolotl.svg";
import { CopyLinkAlert } from "./CopyLinkAlert";

export const Slider = ({ id, title, labels, state, setState }) => {
  const [value, setValue] = useState(state && id && state[id] ? state[id] : 50);

  useEffect(() => {
    if (state && setState && id && value != state[id]) {
      setState({ ...state, [id]: value });
    }
  }, [value, state, id]);

  return (
    <div className="rounded-md border border-slate-600 p-4 hover:border-slate-400 transition-colors duration-500 ease-in-out">
      <div className="text-center text-2xl font-bold mb-3">{title ?? "title"}</div>

      <input
        type="range"
        min={0}
        max={100}
        className="w-full"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {Array.isArray(labels) && labels.length === 2 ? (
        <div className="flex flex-row justify-between gap-2">
          <h3 className="text-sm md:text-md lg:text-lg font-bold text-slate-300">{labels[0]}</h3>
          <h3 className="text-sm md:text-md lg:text-lg font-bold text-slate-300">{labels[1]}</h3>
        </div>
      ) : Array.isArray(labels) && labels.length > 2 ? (
        <table className="w-full">
          <tbody>
            <tr>
              {labels.map((label, index) => (
                <td
                  key={index}
                  width={Math.round((1 / labels.length) * 100) + "%"}
                  className={
                    index === 0
                      ? "text-sm md:text-md lg:text-lg font-bold text-slate-300"
                      : index === labels.length - 1
                      ? "text-sm md:text-md lg:text-lg font-bold text-right text-slate-300"
                      : "text-sm md:text-md lg:text-lg font-bold text-center text-slate-300"
                  }
                >
                  {label}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

const loadStateFromHash = () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    try {
      return JSON.parse(atob(hash));
    } catch (e) {
      // Don't care
    }
  }

  const backup = localStorage.getItem("polyamo");
  if (backup) {
    try {
      return JSON.parse(backup);
    } catch (e) {
      // Don't care
    }
  }

  return {};
};

export function App() {
  const [state, setState] = useState(loadStateFromHash());

  useEffect(() => {
    const backup = localStorage.getItem("polyamo");
    if (backup !== JSON.stringify(state)) {
      localStorage.setItem("polyamo", JSON.stringify(state));
    }
  }, [state]);

  const copy = useRef(null);

  return (
    <div className="app w-full rounded-xl p-4">
      <div className="flex flex-row justify-center">
        <img src={axolotl} />
      </div>

      <h1 className="text-center text-4xl font-bold">Polyamo</h1>

      <div className="my-4 px-12 text-center">
        Build your <b>unique</b> profile and match with others. Create a link and share with your partners. You can
        share different links with different partners.
      </div>

      <div className="flex flex-col gap-6">
        <Slider
          id="long-distance"
          title="Relationship locality?"
          labels={["Long distance", "Local"]}
          state={state}
          setState={setState}
        />

        <Slider
          id="living-together"
          title="Living together?"
          labels={["Live in", "Separate"]}
          state={state}
          setState={setState}
        />

        <Slider
          id="sexual"
          title="Sexual relationship?"
          labels={["Sexual", "Non-sexual"]}
          state={state}
          setState={setState}
        />

        <Slider
          id="entwined"
          title="Independence?"
          labels={["Entwined", "Autonomous"]}
          state={state}
          setState={setState}
        />

        <Slider
          id="open"
          title="Polyamour partnership?"
          labels={["Open", "Closed"]}
          state={state}
          setState={setState}
        />
        <Slider
          id="hierarchy"
          title="Hierarchy?"
          labels={["Hierarchical", "Non-hierarchical"]}
          state={state}
          setState={setState}
        />

        <Slider
          id="children"
          title="Children?"
          labels={["Children", "No children"]}
          state={state}
          setState={setState}
        />

        <Slider id="marriage" title="Marriage?" labels={["Married", "Not married"]} state={state} setState={setState} />

        <Slider
          id="privilege"
          title="Privilege?"
          labels={["None", "Couple privilege", "Ownership"]}
          state={state}
          setState={setState}
        />

        <Slider
          id="friends"
          title="Friends?"
          labels={["Shared", "Networked", "Independent"]}
          state={state}
          setState={setState}
        />

        <Slider
          id="time"
          title="Time commitment?"
          labels={["Personal", "Everything together"]}
          state={state}
          setState={setState}
        />
      </div>

      <CopyLinkAlert ref={copy} />

      <div className="flex justify-center p-4">
        <div className="relative inline-flex flex-row">
          <a
            className="button plausible-event-name=MakeLinkClick"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const hash = btoa(JSON.stringify(state));
              history.replaceState(null, null, "#" + hash);
              setTimeout(() => {
                copy.current.copy(window.location.href);
              }, 100);
            }}
          >
            Make private link
          </a>
        </div>
      </div>
    </div>
  );
}
