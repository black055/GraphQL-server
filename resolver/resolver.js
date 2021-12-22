const databaseAccess = require("../data/db.js");

const resolver = {
  Book: {
    author: ({ authorId }) => databaseAccess.getAuthorById(authorId),
  },

  Author: {
    books: ({ id }) => databaseAccess.getBookByAuthorId(id),
  },

  Query: {
    books: () => databaseAccess.getAllBooks(),
    authors: () => databaseAccess.getAllAuthors(),
    book: (parent, { id }) => databaseAccess.getBookById(id),
    author: (parent, { id }) => databaseAccess.getAuthorById(id),
  },

  Mutation: {
    createAuthor: (parent, params) => databaseAccess.addAuthor(params),
    createBook: (parent, params) => databaseAccess.addBook(params),
  },
};

module.exports = resolver;
