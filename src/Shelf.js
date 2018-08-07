import React from 'react'
import Book from './Book'

const Shelf = ({title, onUpdateBook, books}) => {
    return (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.map(book => {
                    return <Book updateBook={onUpdateBook} key={book.id} book={book} />
                  })}
                </ol>
              </div>
            </div>
    )
}

export default Shelf
