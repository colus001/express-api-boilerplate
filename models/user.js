const { Schema } = require('mongoose')
const { assign } = require('lodash')
const userPlugin = require('mongoose-user')

const { defaultSchema, defaultOptions, meta } = require('./common')

const schema = assign({}, defaultSchema, {
  name: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashed_password: {
    type: String,
  },
  salt: {
    type: String,
  },
  provider: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  meta,
})

const userSchema = new Schema(schema, defaultOptions)

userSchema.plugin(userPlugin, {})

module.exports = userSchema
