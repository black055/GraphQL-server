const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    id: ID
    name: String
    genre: String
    description: String
    createdYear: Int
    author: Author
  }

  type Author {
    id: ID
    name: String
    age: Int
    gender: String
    national: String
    books: [Book]
  }

  # Root type
  type Query {
    books: [Book]
    authors: [Author]
    book(id: ID!): Book
    author(id: ID!): Author
  }

  type Mutation {
    createAuthor(
      name: String
      age: Int
      gender: String
      national: String
    ): Author
    createBook(
      name: String
      genre: String
      description: String
      createdYear: Int
      authorId: ID!
    ): Book
  }
`;

module.exports = typeDefs;
