import { Configuration, OpenAIApi } from 'openai'
import * as dotenv from "dotenv"

dotenv.config()

const Config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(Config)

type SearchReturnData = {
    status: number;
    message: string;
    weatherData?: any;
    locationData?: any;
}


export async function searchData(location: string): Promise<SearchReturnData> {
    const locationDataRequest = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.OPENWEATHER_KEY}`)
    let locationData = await locationDataRequest.json()
    if (!locationData[0]) {
        return {
            status: 0,
            message: 'We could not find the weather information in your area, check for mispellings, typos, and other gramatical mistakes and try again, maybe try to use other ways of the location as well.'
        }
    }
    const weatherDataRequest = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${locationData[0].lat}&lon=${locationData[0].lon}&exclude=hourly,minutely&appid=${process.env.OPENWEATHER_KEY}&units=metric`)
    let weatherData = await weatherDataRequest.json()
    return {
        status: 1,
        message: 'Weather data fetched successfully',
        weatherData,
        locationData
    }
}

export async function generateImage(prompt: string): Promise<string> {
    const img = await openai.createImage({
        prompt,
        n: 1,
        size: '512x512'
    })

    return img.data.data[0].url
}

export function getPartOfDay(): string {
  const hours = new Date().getHours();

  if (hours >= 0 && hours < 6) {
    return "Midnight";
  } else if (hours >= 6 && hours < 9) {
    return "Dawn";
  } else if (hours >= 9 && hours < 12) {
    return "Noon";
  } else if (hours >= 12 && hours < 15) {
    return "Afternoon";
  } else if (hours >= 15 && hours < 18) {
    return "Dusk";
  } else {
    return "Night";
  }
}
