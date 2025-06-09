'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookCard } from '@/app/components/books/book-card';
<<<<<<< HEAD
=======
import { Button } from '@/components/ui/button';
>>>>>>> 6270e43a (added new file)

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string | string[];
  price: number;
  rating: number;
  cover: string;
}

export default function SearchPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const genre = searchParams.get('genre');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
<<<<<<< HEAD
        const url = genre
          ? `http://localhost:5000/api/books?genre=${encodeURIComponent(genre)}`
          : 'http://localhost:5000/api/books';

        const res = await fetch(url);
=======
        const res = await fetch('http://localhost:5000/api/books');
>>>>>>> 6270e43a (added new file)
        const data = await res.json();
        setBooks(data.data || []);
      } catch (error) {
        console.error('Failed to load books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
<<<<<<< HEAD
  }, [genre]);

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">{genre ? `Genre: ${genre}` : 'All Books'}</h1>

      {loading ? (
        <p>Loading books...</p>
      ) : books.length === 0 ? (
        <p>No books found for this genre.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
=======
  }, []);

  const filteredBooks = books.filter((book) => {
    if (!genre) return true;

    const bookGenres = Array.isArray(book.genre)
      ? book.genre.map((g) => g.toLowerCase().trim())
      : [book.genre?.toLowerCase().trim()];

    const searchGenre = genre.toLowerCase().trim();

    // Debug logs (mund t’i heqësh)
    // console.log('Book genres:', bookGenres);
    // console.log('Search genre:', searchGenre);

    return bookGenres.includes(searchGenre);

  });
  

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">
        {genre ? `Genre: ${genre}` : 'All Books'}
      </h1>

      {loading ? (
        <p>Loading books...</p>
      ) : filteredBooks.length === 0 ? (
        <p>No books found for this genre.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
>>>>>>> 6270e43a (added new file)
            <BookCard key={book._id} book={book} onAddToCart={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
