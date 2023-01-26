const express = require('express')
const visitRouter = require('./routers/visits')
const PORT = process.env.PORT;

const app = express();

// app.use(express.json())
app.use(visitRouter)

app.listen(PORT, () => {
    console.log(`Listening from port: ${PORT}`)
})