import { useEffect, useState } from "react";


const ApiKey = 'edcc4dfb9bdb30f65b16179201846ff1';
const latitude  = '32.109333'
const longitude   = '34.855499'
const apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${ApiKey}&units=metric `

 function useGetWeather() {
    const [weather, setWeather] = useState<any>(null);
    useEffect(()=>{
        fetch(apiCall)
        .then(response =>response.json())
        .then(json=>setWeather(json)).catch(x=>setWeather({}))
    },[])
    return weather
}

export function Weather() {
  try {
    const weather = useGetWeather();
    const desc = weather.weather[0].description;
    const temprtature = weather.main.temp;
    const text = `${desc} ${temprtature}C° \xa0\xa0\xa0\xa0\xa0\xa0\xa0`;
    return (
      <>
        <h3>{text}</h3>
      </>
    );
  } catch (error) {
    return (
      <>
        <h3>"fail get weather"</h3>
      </>
    );
  }
}