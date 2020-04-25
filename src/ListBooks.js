import React, {Component} from 'react'
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import BookShelf from "./BookShelf"

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array
  }

  render() {
    const {books} = this.props

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
            />
            <BookShelf
              title={'Want to Read'}
              books={wantToRead}
            />
            <BookShelf
              title={'Read'}
              books={read}
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
