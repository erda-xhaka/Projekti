'use client';

import React from 'react';
import Link from 'next/link';
import { Book } from '@/app/types';
import { BookCard } from '@/app/components/books/book-card';
import { Button } from '@/components/ui/button';

interface FeaturedBooksProps {
  books: Book[];
  loading?: boolean;
  error?: string | null;
}

<<<<<<< HEAD
export const FeaturedBooks: React.FC<FeaturedBooksProps> = ({
  books,
  loading = false,
  error = null,
}) => {
  const featuredBooks = books.slice(0, 8);
=======
export const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ books, loading = false, error = null }) => {
  const featuredBooks = books.slice(0, 8); // shfaq vetëm 6
>>>>>>> 6270e43a (added new file)

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
<<<<<<< HEAD
        <h2 className="text-3xl font-bold">Librat e përzgjedhur</h2>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-10">
          Loading books...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">
          Failed to load books: {error}
        </div>
      ) : featuredBooks.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">
          No featured books available.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/books" passHref>
              <Button as="a" variant="default" size="lg" className="px-8 rounded-full shadow-lg">
                See All Books
              </Button>
            </Link>
          </div>
        </>
=======
        <h2 className="text-3xl font-bold">Featured Books</h2>
       
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-10">Loading books...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">Failed to load books: {error}</div>
      ) : featuredBooks.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">No featured books available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
         <Link href="/books">
          <div className="flex justify-center mt-8">
            <Link href="/books">
              <Button variant="default" size="lg" className="px-8 rounded-full shadow-lg">
               See All Books
              </Button>
            </Link>
          </div>
        </Link>
        </div>
        
>>>>>>> 6270e43a (added new file)
      )}
    </section>
  );
};
