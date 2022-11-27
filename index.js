const express = require("express")
const mongoose = require("mongoose")
const restRouter = require("./routes/rest.router")

const app = express()

app.use(express.json())

app.listen(8080, () => {
    console.log("server started")
})

app.use("/api/restaurant", restRouter)

mongoose.connect("mongodb://localhost/FindMyRestaurant")
    .then(
        () => {
            console.log("DB connected")
        }
    )
    .catch(
        (err) => {
            console.log(err)
        }
    )