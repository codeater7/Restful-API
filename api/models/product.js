const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  var productSchema = new Schema({
    _Id: mongoose.Schema.Types.ObjectId,
    name: String,
    price:   Number,
    
  });

  module.exports= mongoose.model('Product', productSchema)
  //schema but we want it to be wrapped in the model, Schema is the layout, design, Model is the object itself