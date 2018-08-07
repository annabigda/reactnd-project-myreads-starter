import React from 'react'
import Book from './Book'
import {DebounceInput} from 'react-debounce-input';
import { Link } from 'react-router-dom'

const Search = ({onSearch, onUpdateBook, books}) => {
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
             <DebounceInput
                    minLength={2}
                    debounceTimeout={300}
                    onChange={onSearch}
                    type="text"
                    placeholder="Search by title"/>

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {books.map(book => {
                    return <Book updateBook={onUpdateBook} key={book.id} book={book} />
                  })}
                </ol>
              </div>
            </div>
    )
}

export default Search
