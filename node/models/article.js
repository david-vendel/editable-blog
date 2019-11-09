let mongoose = require("mongoose");

let articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  author: {
    type: String,
    required: false
  },
  body: {
    type: String,
    required: false
  },
  x: {
    type: String,
    required: false
  },
  page: {
    type: String,
    required: false
  },
  paragraphs: {
    type: Array,
    required: false
  },
  breadcrumps: {
    type: Array,
    required: false
  }
});

let Article = (module.exports = mongoose.model("Article", articleSchema));
