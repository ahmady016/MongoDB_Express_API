import mongoose, { Schema } from 'mongoose'
const { Types } = Schema;

const bookSchema = new Schema({
  bookId: {
    type: String,
    required: true,
    trim: true,
    minlength: 12,
    maxlength: 12
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 255
  },
  authors: {
    type: [String],
    validate: {
      message: "A Book should have at least one Author!",
      validator: (val) => val && val.length
    }
  },
  publisher: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 150
  },
  publishedDate: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 10
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1300
  },
  pageCount: {
    type: Number,
    required: true,
    minlength: 100
  },
  rating: {
    type: Number,
    minlength: 0.5,
    maxlength: 5
  },
  language: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 3
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  previewUrl: {
    type: String,
    trim: true,
  },
  infoUrl: {
    type: String,
    trim: true,
  },
  _authors: {
    type: [authorSchema],
    validate: {
      message: "A Book should have at least one Author!",
      validator: (val) => val && val.length
    }
  }
});

const authorSchema = new Schema({
  authorId: {
    type: Types.ObjectId,
    ref: 'Author',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100
  }
});

export default mongoose.model('Book', bookSchema);