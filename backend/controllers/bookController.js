const Book = require('../models/Book')
const cloudinary = require('../utils/cloudinary') // your Cloudinary config

// Create a new book
   const createBook = async (req, res) => {
  try {
    const { title, author, category, description, image } = req.body;

    if (!title || !author || !image) {
      return res.status(400).json({ message: "Title, Author, and Image are required" });
    }

    const book = new Book({
      title,
      author,
      category,
      description,
      image,
    });

    await book.save();

    res.status(201).json(book);
  } catch (error) {
    console.error("Book create error:", error);
    res.status(500).json({ message: "Failed to create book", error: error.message });
  }
};


// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

// Get a single book by ID
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) return res.status(404).json({ message: 'Book not found' })

        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

// Update a book
const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) return res.status(404).json({ message: 'Book not found' })

        const { title, author, category } = req.body

        book.title = title || book.title
        book.author = author || book.author
        book.category = category || book.category

        // If a new image is uploaded
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            book.image = result.secure_url
        }

        await book.save()
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        res.status(200).json({ message: 'Book removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}


module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
}
