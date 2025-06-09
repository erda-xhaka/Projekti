'use client';

import { useEffect, useState } from 'react';
import { Hero } from './components/home/hero';
import { Categories } from './components/home/categories';
import { FeaturedBooks } from './components/home/featured-books';
import { Testimonials } from './components/home/testimonials';
import { NewsletterSubscribe } from '@/app/components/NewsletterSubscribe';

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  image: string;
}

interface Category {
  _id: string;
  name: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [topGenres, setTopGenres] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooksAndTopGenres = async () => {
      setLoading(true);
      setError(null);

      try {
        const booksResponse = await fetch('http://localhost:5000/api/books');
        const booksData = await booksResponse.json();
        if (booksData.success) {
          setBooks(booksData.data);
        }

        const genresResponse = await fetch('http://localhost:5000/api/categories/top-genres');
        const genresData = await genresResponse.json();
        if (genresData.success) {
          setTopGenres(genresData.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unexpected error');
      } finally {
        setLoading(false);
      }
    };

    fetchBooksAndTopGenres();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero />
        <Categories
          categories={topGenres}
          title="Zhanret më të lexuara"
          showSeeAllButton={true}
        />
        <FeaturedBooks books={books} loading={loading} error={error} />
        <Testimonials />
      </div>

      <section className="py-24 bg-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground">
              Qëndro i përditësuar me tituj të rinj, intervista me autorë dhe oferta ekskluzive.
            </p>
            <NewsletterSubscribe />
          </div>
        </div>
      </section>
    </div>
  );
}
