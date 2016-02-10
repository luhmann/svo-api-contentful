const contentful = require('contentful')
const config = require('./config/contentful.js')
const _ = require('lodash')
const util = require('util')

const client = contentful.createClient({
  space: config.space,
  accessToken: config.token,
  // Resolve links to entries and assets
  resolveLinks: true
})

const parse = (entries) => {
  'use strict'

  let flat = {}
  Object.keys(entries[0].fields).forEach((key) => {
    let value = entries[value]

    if (_.isArray(value)) {
      flat[key] = parse(value)
    } else {
      flat[key] = value
    }
  })

  return flat
}

client
  .entries({
    content_type: 'recipe',
    'fields.slug': 'black-bean-chili'
  })
  .then((entries) => {
    console.log(`Total entries ${entries.total}`)
    if (entries.total > 0) {
      var parsed = parse(entries)
    }
    console.log(util.inspect(parsed, {showHidden: false, depth: null}))
  })
