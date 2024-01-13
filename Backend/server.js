const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const apiRoutes = require('./ApiRoutes/routes')
const app = express()
dotenv.config()
require('./Database/DbConnection')
const bodyParser = require('body-parser');


//middle wares

app.use(cors())
app.use(express.json())
app.use("/api", apiRoutes)



const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Admin backend service one started on port ${port}`)
})
