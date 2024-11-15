import "./App.css";
import { useEffect, useState } from "react";
import * as zebar from "zebar";
import { DateTime } from "./widgets/date-time/date-time.tsx";
import { Weather } from "./widgets/weather/weather.tsx";
import { CurrentApplication } from "./widgets/current-application/current-application.tsx";
import { Workspaces } from "./widgets/workspaces/workspaces.tsx";
import { Media } from "./widgets/media/media.tsx";
import { Cpu } from "./widgets/cpu/cpu.tsx";
import { Memory } from "./widgets/memory/memory.tsx";
import { Network } from "./widgets/network/network.tsx";

const providers = zebar.createProviderGroup({
  date: { type: "date" },
  weather: { type: "weather" },
  glazewm: { type: "glazewm" },
  cpu: { type: "cpu" },
  memory: { type: "memory" },
  network: { type: "network" },
  media: { type: "media" },
});

function App() {
  const [output, setOutput] = useState(providers.outputMap);

  useEffect(() => {
    providers.onOutput(() => setOutput(providers.outputMap));
  }, []);

  return (
    <div className="app">
      <div className="group" id="group-top">
        {output.date && <DateTime date={output.date} />}
        {output.weather && <Weather weather={output.weather} />}
      </div>
      <div className="group" id="group-middle">
        {output.glazewm && <CurrentApplication glazewm={output.glazewm} />}
        {output.glazewm && <Workspaces glazewm={output.glazewm} />}
      </div>
      <div className="group" id="group-bottom">
        {output.media && <Media media={output.media} />}
        {/*{output.glazewm && <GlazewmStatus glazewm={output.glazewm} />}*/}
        {output.cpu && <Cpu cpu={output.cpu} />}
        {output.memory && <Memory memory={output.memory} />}
        {output.network && <Network network={output.network} />}
      </div>
    </div>
  );
}

export default App;
