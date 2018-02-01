import React from 'react'
import PropTypes from 'prop-types'
import Book from "./Book";

const BookshelfRow = ({ title, books, onShelfChange }) => {

    const booksComponents = books && books.map(book => (
        <li key={ book.id }>
            <Book book={ book }
                  onShelfChange={ onShelfChange }
            />
        </li>
    ))

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ title }</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    { booksComponents }
                </ol>
            </div>
        </div>
    )
}

BookshelfRow.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
}

export default BookshelfRow