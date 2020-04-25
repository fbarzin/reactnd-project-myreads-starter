import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from "react-router-dom"
import Home from "./Home"
import Search from "./Search"

class BooksApp extends React.Component {

  searchBook = (query) => {
    console.log(query)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Home/>
        )}/>

        <Route path='/search' render={() => (
          <Search
            onSearch={this.searchBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
