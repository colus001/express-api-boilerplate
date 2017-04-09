const { Schema } = require('mongoose')
const { assign } = require('lodash')
const userPlugin = require('mongoose-user')

const { defaultSchema, defaultOptions } = require('./common')

const schema = assign({}, defaultSchema, {
  name: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
})

const userSchema = new Schema(schema, defaultOptions)

userSchema.plugin(userPlugin, {})

module.exports = userSchema
