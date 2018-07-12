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
  }

  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({myBooks: data});
      console.log(data);
    });
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
                <Shelf name='Currently Reading' books={this.state.myBooks.filter((book) => book.shelf === 'currentlyReading')}/>
                <Shelf name='Want to Read' books={this.state.myBooks.filter((book) => book.shelf === 'wantToRead')}/>
                <Shelf name='Read'books={this.state.myBooks.filter((book) => book.shelf === 'read')}/>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />

        <Route path='/search' render={() => (
          <BookSearch />
        )} />

      </div> // end the parent div
    );
  }
}

export default BooksApp;
