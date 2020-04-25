import React, {Component} from 'react'
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'

class Search extends Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    searchResult: PropTypes.object
  }

  state = {
    query: ''
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
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default Search
