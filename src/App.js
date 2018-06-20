import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class Book extends React.Component {
  onChange(e) {
    const shelf = e.target.value;
    console.log(this)
    this.props.updateBook(this.props.book, shelf)
  }
  render() {
    return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select value={this.props.book.shelf} onChange={this.onChange.bind(this)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors[0]}</div>
      </div>
    </li>
    )
    }
}


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => console.log(books) || this.setState({books: books}))
  }

  currentlyReading() {
    return this.state.books.filter(book => {
      return book.shelf === "currentlyReading";
    })
  }

  wantToRead() {
    return this.state.books.filter(book => {
      return book.shelf === "wantToRead";
    })
  }

  read() {
    return this.state.books.filter(book => {
      return book.shelf === "read";
    })
  }

  updateBook(book, shelf) {
      BooksAPI.update(book, shelf)
      .then(() => {
        let books = this.state.books;
        for(var i = 0; i < books.length; i++) {
          if (book.id === books[i].id) {
            books[i].shelf = shelf;
          }
        }
        this.setState({books: books});
      })

  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.currentlyReading().map(book => {
                        return <Book updateBook={this.updateBook.bind(this)} key={book.id} book={book} />
                      })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.wantToRead().map(book => {
                        return <Book updateBook={this.updateBook.bind(this)} key={book.id} book={book} />
                      })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.read().map(book => {
                        return <Book updateBook={this.updateBook.bind(this)} key={book.id} book={book} />
                      })}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
