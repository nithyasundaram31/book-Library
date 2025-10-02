// routes/bookmarkRoutes.js
const express = require("express");
const { deleteBook, updateBook, createBook, getBookById, getBooks } = require("../controllers/bookController");

const bookRoute= express.Router();



// GET all books
bookRoute.get('/', getBooks)

// GET single book by ID
bookRoute.get('/:id', getBookById)

// POST create a book (with Cloudinary image upload)
bookRoute.post('/', createBook)

// PUT update a book (with optional new image)
bookRoute.put('/:id', updateBook)

// DELETE remove a book
bookRoute.delete('/:id', deleteBook)




module.exports = bookRoute;
