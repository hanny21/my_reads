import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {

  render() {
    const { book } = this.props;
    return <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url'+ `(${book.imageLinks.thumbnail})` }}></div>
        <div className="book-shelf-changer">
          <select>
            <option value="move" disabled>Move to...</option>
            <option selected={book.shelf === 'currentlyReading'} value="currentlyReading">Currently Reading</option>
            <option selected={book.shelf === 'wantToRead'} value="wantToRead">Want to Read</option>
            <option selected={book.shelf === 'read'} value="read">Read</option>
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
};

export default Book;
