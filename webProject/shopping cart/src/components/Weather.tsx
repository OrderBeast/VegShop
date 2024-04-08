import { useEffect, useState } from "react";


const ApiKey = '9c0f7e8b64e52c8a9e545041aa5143ec';
const latitude  = '32.109333'
const longitude   = '34.855499'
const apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${ApiKey}&units=metric`

 function useGetWeather() {
    const [weather, setWeather] = useState<any>([]);
    useEffect(()=>{
        fetch(apiCall)
        .then(response =>response.json())
        .then(json=>setWeather(json)).catch(x=>setWeather({}))
    },[])
    return weather
}

export function Weather() {
    const weather = useGetWeather();
    return <><label>{ JSON.stringify(weather)}</label></>
}