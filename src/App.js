import React from 'react'
import './App.css'
import {Route} from "react-router-dom"
import ListBooks from "./ListBooks"
import Search from "./Search"
import * as BooksAPI from "./BooksAPI"

class BooksApp extends React.Component {

  state = {
    allBooks: [],
    searchResult: []
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

  searchBook = (query) => {
    BooksAPI.search(query)
      .then((books) => {
        this.setState(() => ({
          searchResult: books
        }))
        console.log('search => ', this.state.searchResult)
      })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((book) => {
        console.log('updatedBook', book)
        this.getAllBooks()
      })
  }

  render() {
    const { allBooks, searchResult } = this.state

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
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
