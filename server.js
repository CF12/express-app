const express = require("express")
const app = express()

const port = 8080
app.get('/', (req, res) => {
  res.send('Hi!')
})

app.get('/*', (req, res) => {
  var input = req.url.slice(1).split('%20')
  var date

  date = new Date(parseInt(input))
  if (isNaN(date.getTime())) date = new Date(input)

  if(isNaN(date.getTime())) {
    res.status(400)
    res.send('ERROR: 400 - Bad Request')
    return
  }

  var sendback = {
    original_url: String(req.url),
    calendar_time: date.toUTCString(),
    unix_time: date.getTime()
  }
  
  res.status(200)
  res.send(sendback)
})

app.listen(port, () => {
  console.log('INFO >> Express server running on port: ' + port)
})