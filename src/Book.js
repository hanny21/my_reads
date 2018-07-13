import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {
  render() {
    const { book, updateBookShelf } = this.props;
    // check if all fields are provided by API, set defaults
    book.title = book.title === undefined ? 'untitled' : book.title;
    book.authors = book.authors === undefined ? [] : book.authors;
    book.shelf = book.shelf === undefined ? 'none' : book.shelf;
    book.imageLinks = book.imageLinks === undefined ? [] : book.imageLinks;

    return <div className="book">
      <div className="book-top">
        <div className="book-cover"
          style={{ width: 128, height: 193, backgroundImage:  `url(${book.imageLinks.thumbnail})` }}>
        </div>
        <div className="book-shelf-changer">
          <select defaultValue={book.shelf}
            onChange={(event) => updateBookShelf(book, event.target.value)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors.map((author) => (<div key={author} >{author}</div>))}</div>
    </div>;
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};

export default Book;
