const express = require('express')
const app = express()
const port = 3000


const getInfoObj = require("./get.js")





app.get('/', (req, res) => {
  res.send('Send requests to /api')
})

app.get('/api/:name' , (req, res) => {
  let name = req.params.name
  getInfoObj(name)
    .then(x => res.send(x))
    .catch(e => res.send(e))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
