import BookItem from './BookItem';

function BookList({ books = [], onBookClick }) {
    return (
        <ul className="space-y-4 p-4">
            {books.map(book => (
                <BookItem key={book.id} book={book} onClick={onBookClick} />
            ))}
        </ul>
    );
}

export default BookList;