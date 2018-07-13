import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Shelf';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      myBooks: []
    };
    this.updateBookShelf = this.updateBookShelf.bind(this);
  }

  showBooks() {
    BooksAPI.getAll().then((data) => {
      this.setState({myBooks: data});
    });
  }

  componentDidMount() {
    this.showBooks();
  }

  updateBookShelf(book, newShelf) {
    /* TODO add condition when newShelf is 'none', delete the book from the state */
    let myNewBooks = [...this.state.myBooks];
    const index = myNewBooks.findIndex((element) => {
      return element.id === book.id;
    });
    if ((index === -1) && (newShelf !== 'none')) {
      book.shelf = newShelf;
      myNewBooks.push(book);
    } else {
      if (newShelf !== 'none') {
        myNewBooks[index].shelf = newShelf;
        BooksAPI.update(book, newShelf);
      } else {
        myNewBooks.splice(index, 1);
      }
    }
    this.setState({myBooks: myNewBooks});
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf name='Currently Reading'
                  updateBookShelf={this.updateBookShelf}
                  books={this.state.myBooks.filter((book) => book.shelf === 'currentlyReading')}
                />
                <Shelf name='Want to Read'
                  updateBookShelf={this.updateBookShelf}
                  books={this.state.myBooks.filter((book) => book.shelf === 'wantToRead')}
                />
                <Shelf name='Read'
                  updateBookShelf={this.updateBookShelf}
                  books={this.state.myBooks.filter((book) => book.shelf === 'read')}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />

        <Route path='/search' render={() => (
          <BookSearch
            myBooks={this.state.myBooks}
            updateBookShelf={this.updateBookShelf}
          />
        )} />

      </div> // end the parent div
    );
  }
}

export default BooksApp;
