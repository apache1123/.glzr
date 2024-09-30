/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { createStore } from 'solid-js/store';
import * as zebar from 'zebar';
import { DateTime } from './widgets/date-time/date-time';
import { Weather } from './widgets/weather/weather';
import { CurrentApplication } from './widgets/current-application/current-application';
import { Workspaces } from './widgets/workspaces/workspaces';
import { GlazewmStatus } from './widgets/glazewm-status/glazewm-status';
import { Cpu } from './widgets/cpu/cpu';
import { Memory } from './widgets/memory/memory';
import { Network } from './widgets/network/network';

const providers = zebar.createProviderGroup({
  date: { type: 'date' },
  weather: { type: 'weather' },
  glazewm: { type: 'glazewm' },
  cpu: { type: 'cpu' },
  memory: { type: 'memory' },
  network: { type: 'network' },
});

render(() => <App />, document.getElementById('root')!);

function App() {
  const [output, setOutput] = createStore(providers.outputMap);

  providers.onOutput((outputMap) => setOutput(outputMap));

  return (
    <div class="app">
      <div class="group" id="group-top">
        {output.date && <DateTime date={output.date} />}
        {output.weather && <Weather weather={output.weather} />}
      </div>
      <div class="group" id="group-middle">
        {output.glazewm && <CurrentApplication glazewm={output.glazewm} />}
        {output.glazewm && <Workspaces glazewm={output.glazewm} />}
      </div>
      <div class="group" id="group-bottom">
        {output.glazewm && <GlazewmStatus glazewm={output.glazewm} />}
        {output.cpu && <Cpu cpu={output.cpu} />}
        {output.memory && <Memory memory={output.memory} />}
        {output.network && <Network network={output.network} />}
      </div>
    </div>
  );
}
