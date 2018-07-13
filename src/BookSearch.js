import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class BookSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      searchedBooks: []
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.searchBook = this.searchBook.bind(this);
  }

  updateQuery(event) {
    this.setState({ query: event.target.value });
    // delete the searchedBooks array if there is no input
    if( event.target.value === '') {
      this.setState({searchedBooks: []});
    }
  }

  searchBook(event) {
    const { myBooks } = this.props;
    const { query } = this.state;
    // call the API search function after pressing enter
    if (event.key === 'Enter') {
      BooksAPI.search(query.trim()).then((data) => {
        // if the query to API results in error, show no results
        if(data === undefined || data.error) {
          this.setState({searchedBooks: []});
          document.querySelector('.search-books-results').innerHTML = 'No results :(';
          return;
        }
        let resultBooks = [...data];
        // set the correct bookshelf for each book
        for(let i = 0; i < resultBooks.length; i++) {
          const isInMyBooks = myBooks.filter((item) => item.id === resultBooks[i].id);
          const shelf = isInMyBooks.length > 0 ? isInMyBooks[0].shelf : 'none';
          resultBooks[i].shelf = shelf;
        }
        this.setState({searchedBooks: data});
      });
    }
  }

  render() {
    const { query, searchedBooks } = this.state;

    return <div className='search-books'>
      <div className='search-books-bar'>
        <Link to='/' className='close-search' >Close</Link>
        <div className='search-books-input-wrapper'>
          <input type='text'
            placeholder='Search by title or author'
            value={query}
            onChange={(event) => this.updateQuery(event)}
            onKeyPress={(event) => this.searchBook(event)}
          />
        </div>
      </div>
      <div className='search-books-results'>
        <ol className='books-grid'>
          {/*** result of search goes here ***/}
          {searchedBooks.map((item) => (
            <li key={item.id}>
              <Book book={item}
                updateBookShelf={this.props.updateBookShelf}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>;
  }
}

BookSearch.propTypes = {
  myBooks: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};

export default BookSearch;
