const shortid = require('shortid')
const { Schema, Types } = require('mongoose')

const location = {
  type: [Number],
  index: '2dsphere',
}

const meta = {
  type: Schema.Types.Mixed,
}

const defaultSchema = {
  _id: {
    type: String,
    default: () => Types.ObjectId().valueOf(),
  },
  shortId: {
    type: String,
    default: shortid.generate,
    unqiue: true,
    index: true,
  },
}

const defaultOptions = {
  timestamps: true,
}

module.exports = {
  location,
  meta,
  defaultSchema,
  defaultOptions,
}
