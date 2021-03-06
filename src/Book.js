import React from 'react'

class Book extends React.Component {
  onChange(e) {
    const shelf = e.target.value;
    this.props.updateBook(this.props.book, shelf)
  }

  bookImage() {
    if (this.props.book.imageLinks) {
      return this.props.book.imageLinks.thumbnail;
    } else {
      return 'http://via.placeholder.com/128x193?text=No%20Cover'
    }
  }

  render() {
    return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${this.bookImage()}")` }}></div>
          <div className="book-shelf-changer">
            <select value={this.props.book.shelf || "none"} onChange={this.onChange.bind(this)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors && this.props.book.authors[0]}</div>
      </div>
    </li>
    )
    }
}

export default Book
