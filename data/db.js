const Book = require("../models/Book");
const Author = require("../models/Author");

const databaseAccess = {
  getAllBooks: async () => await Book.find(),
  getAllAuthors: async () => await Author.find(),
  getBookById: async (id) => await Book.findById(id),
  getBookByAuthorId: async (authorId) =>
    await Book.find({ authorId: authorId }),
  getAuthorById: async (id) => await Author.findById(id),
  addAuthor: async ({ name, age, gender, national }) => {
    const newAuthor = new Author({ name, age, gender, national });
    return await newAuthor.save();
  },
  addBook: async ({ name, genre, description, createdYear, authorId }) => {
    const newBook = new Book({
      name,
      genre,
      description,
      createdYear,
      authorId,
    });
    return await newBook.save();
  },
};

module.exports = databaseAccess;
