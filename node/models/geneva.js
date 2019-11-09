let mongoose = require("mongoose");

let genevaSchema = mongoose.Schema({
  page: {
    type: String,
    required: true
  },
  paragraph: {
    type: String,
    required: true
  }
});

let Geneva = (module.exports = mongoose.model("Geneva", genevaSchema));
