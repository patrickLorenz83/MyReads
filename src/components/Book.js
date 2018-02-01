import React from 'react'
import PropTypes from 'prop-types'

const Book = ({ book, onShelfChange }) => {

    const imageStyle = book.imageLinks && book.imageLinks.thumbnail ? {
        width: 128,
        height: 193,
        backgroundImage: `url("${book.imageLinks.thumbnail}"`
    } : {
        width: 128,
        height: 193,
        background: "white"
    }

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover"
                     style={ imageStyle }/>
                <div className="book-shelf-changer">
                    <select onChange={ event => onShelfChange(book, event.target.value) }
                            value={ book.shelf }>
                        <option value="none"
                                disabled>Move to...
                        </option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{ book.title }</div>
            { book.authors && book.authors.map((author) => (
                <div key={ author }
                     className="book-authors">{ author }</div>
            )) }

        </div>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
}

export default Book