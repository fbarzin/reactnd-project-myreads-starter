import React, {Component} from 'react'
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'
import Book from "./Book"

class Search extends Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    searchResult: PropTypes.array,
    updateShelf: PropTypes.func.isRequired,
    noResult: PropTypes.bool
  }

  state = {
    query: ''
  }

  componentWillUnmount() {
    this.clearQuery()
  }

  updateQuery = (query) => {
    query.length > 0 && this.props.onSearch(query)
    this.setState(() => ({
      query: query
    }))
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  render() {
    const {query} = this.state
    const {searchResult, updateShelf, noResult} = this.props

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
          {
            noResult ?
              <p className='books-not-found'>Books not found</p> :
              <ol className="books-grid">
                {
                  searchResult && searchResult.length > 0 && searchResult.map((book) => (
                    <li key={book.id}>
                      <Book book={book} updateShelf={updateShelf}/>
                    </li>
                  ))
                }
              </ol>
          }
        </div>
      </div>
    )
  }
}

export default Search
