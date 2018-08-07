import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Switch, Route, Link } from 'react-router-dom'
import './App.css'
import Search from './Search'
import Shelf from './Shelf'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount() {
    // Retrive all the books
    BooksAPI.getAll()
      .then((books) => this.setState({books: books}))
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

  // Add or update book to the shelves
  updateBook(book, shelf) {
    BooksAPI.update(book, shelf)
      .then(() => {
        this.setState(previousState => {
          let books = previousState.books;
          for(let i = 0; i < books.length; i++) {
            if (book.id === books[i].id) {
              books[i].shelf = shelf;
              // Book is already there
              return {books: books};
            }
          }
          // this is a new book
          book.shelf = shelf;
          books.push(book);
          return {books: books};
        }
        )
      })
  }

  onSearch(e) {
    if (e.target.value !== '') {
      BooksAPI
        .search(e.target.value)
        .then(books => {
          if (!books || books.error) {
            this.setState({searchBooks: []})
          } else {
            this.setState({searchBooks: books})
          }
        })
    } else {
      // Set books to empty array
      this.setState({searchBooks: []})
    }
  }

  searchBooks() {
    return this.state.searchBooks.map(book => {
      for (let i = 0; i < this.state.books.length; i++) {
        if (this.state.books[i].id === book.id) {
          book.shelf = this.state.books[i].shelf;
        }
      }
      return book;
    })
  }

  render() {
  return (
    <div className="app">
    <Switch>
      <Route exact path='/search' render={() => <Search books={this.searchBooks()}
                                                        onUpdateBook={this.updateBook.bind(this)}
                                                        onSearch={this.onSearch.bind(this)} />} />
      <Route exact path='/' render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf title='Currently Reading'
                     books={this.currentlyReading()}
                     onUpdateBook={this.updateBook.bind(this)}
                     />
              <Shelf title='Want to Read'
                     books={this.wantToRead()}
                     onUpdateBook={this.updateBook.bind(this)}
                     />
              <Shelf title='Read'
                     books={this.read()}
                     onUpdateBook={this.updateBook.bind(this)}
                     />

            </div>
          </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>
        )} />
      <Route render={() => (<img alt="404 Page not found" src="https://www.hover.com/wp-content/uploads/2015/08/creative-404-pages-3-worrydream.jpg" style={{width: "100%"}} />)} />
    </Switch>
    </div>
  )
  }
}

export default BooksApp
