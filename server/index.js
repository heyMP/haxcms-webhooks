const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')
const Case = require('case')
const cp = require('child_process')
const redis = require('redis')
const redisClient = redis.createClient(6379, 'db')

app.use(cors())
app.use(bodyParser())

redisClient.on('connect', function() {
  console.log('connected to db');
});
redisClient.on('exit', function() {
  console.log('exited from db');
});

// respond with "hello world" when a GET request is made to the homepage
app.post('/', function (req, res) {
  const { repository: { name, full_name } } = req.body
  // find out if there is a corresponmding path environment
  redisClient.publish('webhook_update', name)
  res.send(200)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))