import React from 'react'
import './App.css'
import {Route} from "react-router-dom"
import ListBooks from "./ListBooks"
import Search from "./Search"
import * as BooksAPI from "./BooksAPI"
import _ from 'lodash'

class BooksApp extends React.Component {

  state = {
    allBooks: [],
    searchResult: [],
    searchNoResult: false
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          allBooks: books
        }))
      })
  }

  searchBook = _.debounce((query) => {
      BooksAPI.search(query)
        .then((books) => {
          const booksWithShelf = !books.error ? books.map((book) => {
            const myBook = this.state.allBooks.find((b) => (
              b.id === book.id
            ))
            book.shelf = (myBook && myBook.shelf) || book.shelf
            return book
          }) : books
          this.setState(() => ({
            searchResult: books.error ? [] : booksWithShelf,
            searchNoResult: !!books.error
          }))
        })
    }, 200)

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((book) => {
        console.log('updatedBook', book)
        this.getAllBooks()
      })
  }

  render() {
    const { allBooks, searchResult, searchNoResult } = this.state

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={allBooks}
            updateShelf={this.updateShelf}
          />
        )}/>

        <Route path='/search' render={() => (
          <Search
            onSearch={this.searchBook}
            searchResult={searchResult}
            updateShelf={this.updateShelf}
            noResult={searchNoResult}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
