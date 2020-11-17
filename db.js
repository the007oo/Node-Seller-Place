const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/node_product', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})