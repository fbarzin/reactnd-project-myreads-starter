import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  updateShelf = (shelf) => {
    this.props.updateShelf(this.props.book, shelf)
  }

  render() {
    const {book} = this.props

    const currentShelf = book.shelf || 'none'

    const notAvailableImageUrl = 'http://books.google.com/books/content?id=1yx1tgAACAAJ&printsec=frontcover&img=1&zoom=1'
    const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : notAvailableImageUrl;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${thumbnail})`
          }}/>
          <div className="book-shelf-changer">
            <select
              onChange={(event) => this.updateShelf(event.target.value)}
              defaultValue={currentShelf}
            >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default Book
