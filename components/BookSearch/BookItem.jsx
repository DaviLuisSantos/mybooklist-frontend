function BookItem({ book, onClick }) {
    return (
        <li
            className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={() => onClick(book)}
        >
            {book.cover && (
                <img src={book.cover} alt={`${book.title} cover`} className="w-16 h-24 object-cover rounded-md shadow-md" />
            )}
            <div className="flex-1">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{book.title}</h2>
                <p className="italic text-gray-600 dark:text-gray-400">{book.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">{book.genre}</p>
            </div>
        </li>
    );
}

export default BookItem;