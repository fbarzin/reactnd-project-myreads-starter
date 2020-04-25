import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from "react-router-dom"
import ListBooks from "./ListBooks"
import Search from "./Search"
import * as BooksAPI from "./BooksAPI"
import {search} from "./BooksAPI"

class BooksApp extends React.Component {

  state = {
    allBooks: [],
    searchResult: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          allBooks: books
        }))
      })
  }

  searchBook = (query) => {
    console.log(query)
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
        this.setState((currentState) => ({
          allBooks: currentState.allBooks.filter((item) => {
            return item.id !== book.id
          }).unshift(book)
        }))
      })
  }

  render() {
    const { allBooks, searchResult } = this.state

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={allBooks}
          />
        )}/>

        <Route path='/search' render={() => (
          <Search
            onSearch={this.searchBook}
            searchResult={searchResult}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
