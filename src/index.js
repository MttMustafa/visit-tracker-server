const express = require('express')

// TODO: create process env for port
const PORT = process.env.PORT;
const app = express();
const visitRouter = require('./routers/visits')

app.use(express.json())
app.use(visitRouter)

app.listen(PORT, () => {
    console.log(`Listening from port: ${PORT}`)
})