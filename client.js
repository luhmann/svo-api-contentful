const redisClient = require('redis').createClient()

redisClient.get('test', (err, reply) => {
  if (err) {
    console.log(`An error was thrown ${err}`)
    return
  }
  console.log(reply)
  // console.log(JSON.parse(reply))
  redisClient.end()
})
