import express from 'express';
import { allBooks, getBooksById, filterByGenre ,sortInDescndng ,createNewEntry ,deleteRecord ,editBookById} from '../controllers/books.js';

const booksRoutes = express.Router();

booksRoutes.post('/allbooks', allBooks);
booksRoutes.get('/booksById/:id', getBooksById);
booksRoutes.get('/filter/:genre', filterByGenre);
booksRoutes.get('/desendingSort', sortInDescndng);
booksRoutes.post('/create', createNewEntry);
booksRoutes.delete('/deletebyId/:publicationYear',deleteRecord);
booksRoutes.patch('/editById/:id',editBookById);





export default booksRoutes; 