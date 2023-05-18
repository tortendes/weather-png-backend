import express from 'express';
import { generateImage, searchData, getPartOfDay } from './functions';

const app = express()

app.get('/api/v1/query', async (req, res) => {
    const query = req.query.location.toString()

    const result = await searchData(query)
    if (result.status == 0) {
        res.status(404)
        return res.send(result)
    } else return res.send(result)
})

app.get('/api/v1/generate', async (req, res) => {

    const query = req.query.location.toString()

    const result = await searchData(query)
    if (result.status == 0) {
        res.status(404)
        return res.send(result)
    }

    const image = await generateImage(`a birds eye view over ${query} with ${result.weatherData.current.weather[0].main} and ${result.weatherData.current.weather[0].description} in ${getPartOfDay()}`)

    res.send({
        result,
        image
    })
})

app.listen(3000, () => {
    console.log('🚀 Listening at port 3000')
})