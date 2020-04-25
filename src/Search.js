import React, {Component} from 'react'
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'
import Book from "./Book"

class Search extends Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    searchResult: PropTypes.array,
    updateShelf: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  componentWillUnmount() {
    this.clearQuery()
  }

  updateQuery = (query) => {
    this.props.onSearch(query)
    this.setState(() => ({
      query: query.trim()
    }))
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  render() {
    const { query } = this.state
    const { searchResult, updateShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              searchResult && searchResult.length > 0 && searchResult.map((book) => (
                <li key={book.id}>
                  <Book book={book} updateShelf={updateShelf} />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
