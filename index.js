// Create webhook server
const redisClient = require('redis').createClient()
const PORT = 5555

const server = require('contentful-webhook-server')({
  path: '/',
  username: 'jfd',
  password: '9q$xMf2GhmNtcbd9JN(LrwWxphYZeL'
})

// Attach handlers to Contentful webhooks
server.on('ContentManagement.Entry.publish', (request) => {
  console.log('A content type was published!')
  var data = []
  request.on('data', function (chunk) {
    data.push(chunk)
  })
  request.on('end', function () {
    var result = JSON.parse(data.join(''))

    if (result.fields.slug) {
      redisClient.set(result.fields.slug, JSON.stringify(result))
    } else {
      console.log('No slug', result)
    }
  })
})

// Start listening for requests on port 3000
server.listen(PORT, function () {
  console.log('Contentful webhook server running on port ' + PORT)
})
