import React from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

class Search extends React.Component {
  render() {
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
                      <input onChange={this.props.onSearch} type="text" placeholder="Search by title or author"/>

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {this.props.books.map(book => {
                    return <Book updateBook={this.props.onUpdateBook} key={book.id} book={book} />
                  })}
                </ol>
              </div>
            </div>
    )
  }
}

export default Search
