import mongoose from "mongoose";
 const BooksSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    publicationYear: {
        type: Number,
        required: true,
    },
    shortDescription:{
        type:String
    }
 })
 const booksModel = mongoose.model('Books', BooksSchema, 'Books');
 export default booksModel;
