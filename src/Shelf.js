import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Shelf extends React.Component {
  render() {
    const { name, books, updateBookShelf } = this.props;
    return <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((item) => (
            <li key={item.id}>
              <Book book={item}
                updateBookShelf={updateBookShelf}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>;
  }
}

Shelf.propTypes = {
  name: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};

export default Shelf;
