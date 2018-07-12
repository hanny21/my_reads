import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Shelf extends React.Component {

  render() {
    return <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.map((item) => (<li key={item.id}><Book  book={item}/></li>))}          
        </ol>
      </div>
    </div>;
  }
}

Shelf.propTypes = {
  name: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
};

export default Shelf;