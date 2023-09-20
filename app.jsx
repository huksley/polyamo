import React, { useState, useEffect } from "react";
import axolotl from "./assets/axolotl.svg";

export const Slider = ({ id, title, labels, state, setState }) => {
  const [value, setValue] = useState(state && id && state[id] ? state[id] : 50);

  useEffect(() => {
    if (state && setState && id) {
      setState({ ...state, [id]: value });
    }
  }, [value, state, id]);

  useEffect(() => {
    if (state && id) {
      setValue(state[id]);
    }
  }, [state, id]);

  return (
    <div className="rounded-md border border-slate-600 p-4">
      {Array.isArray(labels) && labels.length === 2 ? (
        <div className="flex flex-row justify-between gap-2">
          <h3 className="text-xl font-bold">{labels[0]}</h3>
          <h3 className="text-xl font-bold">{labels[0]}</h3>
        </div>
      ) : Array.isArray(labels) && labels.length > 2 ? (
        <table className="w-full">
          <tr>
            {labels.map((label, index) => (
              <td key={index} width={Math.round((1 / labels.length) * 100)} className="text-xl font-bold">
                {labels[0]}
              </td>
            ))}
          </tr>
        </table>
      ) : null}
      <input
        type="range"
        min={0}
        max={100}
        className="w-full"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="text-center">{title ?? "title"}</div>
    </div>
  );
};

const saveStateToHash = (state) => {
  const hash = btoa(JSON.stringify(state));
  if (window.location.hash === "#" + hash) {
    return;
  }
  history.replaceState(null, null, "#" + hash);
};

const loadStateFromHash = () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    return JSON.parse(atob(hash));
  }
  return {};
};

export function App() {
  const [state, setState] = useState(loadStateFromHash());

  useEffect(() => {
    saveStateToHash(state);
  }, [state]);

  return (
    <div className="app w-full rounded-xl p-4">

      <div className="flex flex-row justify-center">
        <img src={axolotl}/>
      </div>      

      <h1 className="text-center text-4xl font-bold">Polyamo</h1>

      <div className="my-4 px-12 text-center">
        Build your <b>unique</b> profile and match with others. Create a link and share with your partners.
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

      <div className="flex justify-center p-4">
        <div className="relative inline-flex flex-row">
          <a className="button" href="#">
            Make private link
          </a>
        </div>
      </div>
    </div>
  );
}
