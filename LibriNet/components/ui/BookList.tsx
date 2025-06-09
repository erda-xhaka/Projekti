'use client';

import { BookCard } from '@/app/components/books/book-card';

interface BookType {
  _id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  cover?: string;
}

interface BookListProps {
  books: BookType[];
  viewMode?: 'grid' | 'list';
}

export function BookList({ books, viewMode = 'grid' }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No books found</h3>
        <p className="text-muted-foreground">Try changing your search criteria</p>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} variant="default" />
        ))}
      </div>
    );
  }

  // list mode
  return (
    <div className="space-y-4">
      {books.map((book) => (
        <div key={book._id} className="flex items-start gap-4 p-3 border rounded-lg">
          <img
            src={
              book.cover && book.cover.startsWith('http')
                ? book.cover
                : `http://localhost:5000/uploads/${book.cover}`
            }
            alt={`${book.title} by ${book.author}`}
            className="w-20 h-28 object-cover rounded-md"
          />
          <div className="flex-1">
            <h3 className="font-medium">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <div className="flex items-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={i < Math.floor(book.rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                  className={`w-4 h-4 ${
                    i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-muted-foreground'
                  }`}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                ({book.rating.toFixed(1)})
              </span>
            </div>
            <p className="font-medium mt-1">${book.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
