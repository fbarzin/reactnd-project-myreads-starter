import React, {Component} from 'react'
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import BookShelf from "./BookShelf"

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  render() {
    const {books, updateShelf} = this.props

    const currentlyReading = books.filter((book) => {
      return book.shelf === 'currentlyReading'
    })

    const wantToRead = books.filter((book) => {
      return book.shelf === 'wantToRead'
    })

    const read = books.filter((book) => {
      return book.shelf === 'read'
    })

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title={'Currently Reading'}
              books={currentlyReading}
              updateShelf={updateShelf}
            />
            <BookShelf
              title={'Want to Read'}
              books={wantToRead}
              updateShelf={updateShelf}
            />
            <BookShelf
              title={'Read'}
              books={read}
              updateShelf={updateShelf}
            />
          </div>
        </div>
        <Link to='/search' className='open-search open-search-button'>
          Add a book
        </Link>
      </div>
    )
  }
}

export default ListBooks
