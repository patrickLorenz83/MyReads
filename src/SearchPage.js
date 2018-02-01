import React, { Component } from 'react'
import * as BooksAPI from "./BooksAPI";
import Book from "./components/Book";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchPage extends Component {

    static propTypes = {
        onShelfChange: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    }

    state = {
        query: '',
        result: []
    }

    /**
     * @description Search for the books related to the state query value
     * @param {string} query - the search query
     */
    handleSearch = (query) => {
        this.state.query && BooksAPI.search(query).then(result => {
            this.setState({ result })
        }).catch(error => console.log("error while searching: ", error));
    }

    /**
     * @description Search for the book in the bookshelf and updating the shelf field of the search result book to
     * show the correct selection in the option
     * @param {object} book - the book from the search result
     */
    checkBookshelfId = (book) => {
        const existingBook = this.props.books.filter(search => search.id === book.id)
        existingBook && existingBook.length > 0 ? book.shelf = existingBook[ 0 ].shelf : book.shelf = "none"
    }

    render() {
        return <div className="search-books">
            <div className="search-books-bar">
                <Link to="/"
                      className="close-search"/>
                <div className="search-books-input-wrapper">
                    { /*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */ }
                    <input type="text"
                           placeholder="Search by title or author"
                           onInput={ (event) => {
                               event.preventDefault()
                               var query = event.target.value.trim()
                               this.setState({ query })
                               this.handleSearch(query)
                           } }
                    />

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    { this.state.result && !this.state.result.error && this.state.result.map(book => {
                            this.checkBookshelfId(book)
                            return (
                                <Book key={ book.id }
                                      book={ book }
                                      onShelfChange={ this.props.onShelfChange }
                                />
                            )
                        }
                    ) }
                </ol>
            </div>
        </div>
    }
}

export default SearchPage