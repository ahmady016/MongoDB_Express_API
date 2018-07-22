import mongoose, { Schema } from 'mongoose'

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255
  },
  birth_date: {
    type: Date,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  country: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
});

export default mongoose.model('Author', authorSchema);