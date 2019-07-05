const assert = require('assert')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

describe('Array', function() {
  it('should return -1 when the value is not present', async function() {
    const data = fs.readFileSync(path.join(__dirname, 'test-webhook-call.json'))
    const post = await axios.post('http://localhost:3000', data)
    return post
  });
});