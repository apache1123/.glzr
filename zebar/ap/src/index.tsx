/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { createStore } from 'solid-js/store';
import { init } from 'zebar';
import { DateTime } from './widgets/date-time/date-time';
import { Weather } from './widgets/weather/weather';
import { CurrentApplication } from './widgets/current-application/current-application';
import { Workspaces } from './widgets/workspaces/workspaces';
import { GlazewmStatus } from './widgets/glazewm-status/glazewm-status';
import { Cpu } from './widgets/cpu/cpu';
import { Memory } from './widgets/memory/memory';
import { Network } from './widgets/network/network';

const zebarCtx = await init();

const providers = await zebarCtx.createProviderGroup({
  date: { type: 'date' },
  weather: { type: 'weather' },
  glazewm: { type: 'glazewm' },
  cpu: { type: 'cpu' },
  memory: { type: 'memory' },
  network: { type: 'network' },
});

// Extract and export zebar provider types for use in widgets as the zebar package doesn't export them currently
export type DateOutput = typeof providers.outputMap.date;
export type WeatherOutput = typeof providers.outputMap.weather;
export type GlazeWmOutput = typeof providers.outputMap.glazewm;
export type Workspace = GlazeWmOutput['currentWorkspaces'][0];
export type CpuOutput = typeof providers.outputMap.cpu;
export type MemoryOutput = typeof providers.outputMap.memory;
export type NetworkOutput = typeof providers.outputMap.network;

render(() => <App />, document.getElementById('root')!);

function App() {
  const [output, setOutput] = createStore(providers.outputMap);

  providers.onOutput((outputMap) => setOutput(outputMap));

  return (
    <div class="app">
      <div class="group" id="group-top">
        <DateTime date={output.date} />
        <Weather weather={output.weather} />
      </div>
      <div class="group" id="group-middle">
        <CurrentApplication glazewm={output.glazewm} />
        <Workspaces glazewm={output.glazewm} />
      </div>
      <div class="group" id="group-bottom">
        <GlazewmStatus glazewm={output.glazewm} />
        <Cpu cpu={output.cpu} />
        <Memory memory={output.memory} />
        <Network network={output.network} />
      </div>
    </div>
  );
}
