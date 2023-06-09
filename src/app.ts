import express, { Request } from 'express';
import cors from 'cors'
import { generateImage, searchData, getPartOfDay } from './functions';

const app = express()
app.use(cors<Request>({
    origin: ['http://localhost:5173', 'https://weather-png.torten.xyz']
}))

app.get('/api/v1/query', async (req, res) => {
    if (!req.query.location) {
        res.status(401);
        return res.send({ message: 'No location given, please add a `location` query.' })
    }
    
    const query = req.query.location.toString()

    const result = await searchData(query)
    if (result.status == 0) {
        res.status(404)
        return res.send(result)
    } else return res.send(result)
})

app.get('/api/v1/generate', async (req, res) => {
    if (!req.query.location) {
        res.status(401);
        return res.send({ message: 'No location given, please add a `location` query.' })
    }
    const query = req.query.location.toString()

    const result = await searchData(query)
    if (result.status == 0) {
        res.status(404)
        return res.send(result)
    }

    const image = await generateImage(`a view of a popular landmark ${query} with ${result.weatherData.current.weather[0].main} and ${result.weatherData.current.weather[0].description} in ${getPartOfDay()}`)

    res.send({
        result,
        image
    })
})

app.listen(3000, () => {
    console.log('🚀 Listening at port 3000')
})