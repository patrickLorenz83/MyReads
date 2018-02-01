import React from 'react'
import * as BooksAPI from './BooksAPI'
import css from './App.css'
import SearchPage from "./SearchPage"
import { Link, Route } from 'react-router-dom'
import BookShelf from "./components/Bookshelf";
import { withRouter } from 'react-router'

class App extends React.Component {

    state = {
        books: []
    }

    /**
     * @description Get All books from the api and store them into the state.
     */
    getAllBooks = () => {
        BooksAPI.getAll().then(books => {
            this.setState({ books })
        })
    }

    /**
     * @description Updates the shelf of the book.
     * @param book - book to update
     * @param shelf - the value for the new shelf attribute
     */

    updateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
                this.getAllBooks()
                // this.props.history.push("/")
            }
        )
    }

    componentDidMount() {
        this.getAllBooks()
    }

    render() {
        return (
            <div className={ css.app }>
                <Route path="/search"
                       render={ () => <SearchPage onShelfChange={ (book, shelf) => this.updateShelf(book, shelf) }
                                                  books={ this.state.books }/> }/>
                <Route exact
                       path="/"
                       render={ () => (
                           <BookShelf books={ this.state.books }
                                      onShelfChange={ (book, shelf) => this.updateShelf(book, shelf) }/>
                       ) }/>
                <div className="open-search">
                    <Link to="/search"/>
                </div>
            </div>
        )
    }
}

export default withRouter(App)
