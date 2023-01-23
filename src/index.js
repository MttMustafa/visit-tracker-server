const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT;
const app = express();
const visitRouter = require('./routers/visits')


var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true,
    "optionsSuccessStatus": 204
}

app.use(express.json())
app.use(visitRouter)
app.use(cors(corsOptions))

app.listen(PORT, () => {
    console.log(`Listening from port: ${PORT}`)
})