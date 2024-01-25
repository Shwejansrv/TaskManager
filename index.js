const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const {notFound} = require('./middleware/not-Found')

const connectDB = require('./db/connect')
require('dotenv').config()

//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.use('/api/v1/tasks',tasks)
// app.use(notFound)
app.all('*',(req,res)=>{
    res.status(500).send("Page not found")
})

const port = process.env.PORT;
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`Server listening on ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()