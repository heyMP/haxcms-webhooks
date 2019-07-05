const path = require('path')
const fs = require('fs')
const Case = require('case')
const cp = require('child_process')
const redis = require('redis')
const redisClient = redis.createClient(6379, 'localhost')
require('dotenv').config()

redisClient.on('connect', function () {
  console.log('connected to db');
});
redisClient.on('exit', function () {
  console.log('exited from db');
});

/**
 * Subscribe to webook updates
 */
redisClient.subscribe('webhook_update', function (err) {
  if (err) throw new Error('Could not subscribe to webhook_update')
  console.log('Subscribed to webhook_update')
})
redisClient.on('message', function (channel, message) {
  const repoName = `${Case.upper(message)}_PATH`
  const repoPath = process.env[repoName]
  console.log('updating:', repoPath)
  if (typeof repoPath !== 'undefined') {
    if (fs.existsSync(repoPath)) {
      const gitSpawn = cp.spawnSync('git', ['pull'], { cwd: repoPath })
      console.log(gitSpawn.output.toString())
      const makeSpawn = cp.spawnSync('make', ['up'], { cwd: process.env.ROOT })
      console.log(makeSpawn.output.toString())
    }
  }
})