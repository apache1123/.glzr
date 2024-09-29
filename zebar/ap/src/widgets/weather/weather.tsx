import './weather.css';
import { StatusItem } from '../../components/status-item/status-item';
import { WeatherOutput } from 'zebar';

const rainingStatuses = [
  'light_rain_day',
  'light_rain_night',
  'heavy_rain_day',
  'heavy_rain_night',
  'snow_day',
  'snow_night',
  'thunder_day',
  'thunder_night',
];

const icons = {
  clear_day: 'nf-weather-day_sunny',
  clear_night: 'nf-weather-night_clear',
  cloudy_day: 'nf-weather-day_cloudy',
  cloudy_night: 'nf-weather-night_alt_cloudy',
  light_rain_day: 'nf-weather-day_sprinkle',
  light_rain_night: 'nf-weather-night_alt_sprinkle',
  heavy_rain_day: 'nf-weather-day_rain',
  heavy_rain_night: 'nf-weather-night_alt_rain',
  snow_day: 'nf-weather-day_snow',
  snow_night: 'nf-weather-night_alt_snow',
  thunder_day: 'nf-weather-day_lightning',
  thunder_night: 'nf-weather-night_alt_lightning',
};

export interface WeatherProps {
  weather: WeatherOutput;
}

export function Weather(props: WeatherProps) {
  const isRaining = () => rainingStatuses.includes(props.weather.status);

  return (
    <div class={isRaining() ? 'rain' : 'no-rain'}>
      <StatusItem
        iconClass={icons[props.weather.status]}
      >{`${props.weather.celsiusTemp.toFixed(0)}°`}</StatusItem>
    </div>
  );
}
