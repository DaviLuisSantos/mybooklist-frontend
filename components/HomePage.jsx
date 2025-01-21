import BookSearch from './BookSearch/BookSearch';

function HomePage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">My Book List</h1>
            <div className="mb-6">
                <BookSearch />
            </div>
        </div>
    );
}

export default HomePage;