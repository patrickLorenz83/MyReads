import React from 'react'
import BookshelfRow from "./BookshelfRow";
import PropTypes from 'prop-types'

const Bookshelf = ({ books, onShelfChange }) => {

    const bookshelves = [
        {
            id: "currentlyReading",
            title: "Currently Reading"
        },
        {
            id: "wantToRead",
            title: "Want to Read"
        },
        {
            id: "read",
            title: "Read"
        }
    ]

    /**
     * @description Filters the book related to the shelf type
     * @param type - the shelf type
     * @returns {*} returns a filtered collection of books
     */
     const filterBooks = (type) => {
        return books && books.filter((book) => book.shelf === type)
    }

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                { books && (
                    <div>
                        { bookshelves.map(bookshelf => (
                            <BookshelfRow key={ bookshelf.id }
                                          title={ bookshelf.title }
                                          books={ filterBooks(bookshelf.id) }
                                          onShelfChange={ onShelfChange }
                            />
                        )) }
                    </div>
                ) }
            </div>
        </div>
    )
}

Bookshelf.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
}

export default Bookshelf