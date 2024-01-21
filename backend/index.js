const connectToMongo = require('./db');
var cors = require('cors')
const express = require('express')
const app = express()
const port = 5000


app.use(cors({
  origin : "https://i-note-book-backend-psi.vercel.app",
  methods : ["POST", "PUT", "GET", "DELETE"],
  credentials : true
}))


connectToMongo();

app.use(express.json())

app.use('/', (req, res) => {
  res.send({success : "Connected To Server Successfully!"});
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook app listen at ${port}. `)
})


