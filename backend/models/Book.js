const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  author: { 
    type: String, 
    required: true, 
    trim: true 
  },
  category:[{ 
    type: String, 
    // required: true, 
    trim: true 
  }],
 

   description: { 
    type: String, 
    // required: true, 
    trim: true 
  },
  image: { 
    type: String // URL or path of the uploaded book image
  },
}, { timestamps: true }) 
module.exports = mongoose.model('Book', bookSchema)
