'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NewsletterSubscribe } from '@/app/components/NewsletterSubscribe';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Merr kategoritë nga API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="bg-muted/40 py-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Book Categories</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Explore our extensive collection organized by genres to help you find your next literary adventure.
            </p>
          </div>
        </div>
      </div>


      
      {/* Popular genres section */}
      <div className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Popular Genres</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Mystery & Thriller",
              "Romance",
              "Science Fiction",
              "Fantasy",
              "Biography",
              "History",
              "Self-Help",
              "Business",
              "Art & Photography",
              "Cookbooks",
              "Children's Books",
              "Poetry"
            ].map((genre) => (
              <Button 
                key={genre} 
                variant="outline" 
                className="justify-start h-auto py-3"
                asChild
              >
                <Link href={`/search?genre=${encodeURIComponent(genre)}`}>
                  {genre}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      
     {/* Trending Now */}
<div className="py-20 bg-background">
  <div className="container">
    <h2 className="text-3xl font-bold mb-12 text-center">Trending Now</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {[
        {
          title: "The Silent Patient",
          author: "Alex Michaelides",
          image: "https://images.unsplash.com/photo-1544717305-996b815c338c?q=80&w=800",
          link: "/books/the-silent-patient"
        },
        {
          title: "Atomic Habits",
          author: "James Clear",
          image: "https://images.unsplash.com/photo-1592496001020-fd3b8f122ddc?q=80&w=800",
          link: "/books/atomic-habits"
        },
        {
          title: "It Ends With Us",
          author: "Colleen Hoover",
          image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=800",
          link: "/books/it-ends-with-us"
        }
      ].map((book, index) => (
        <Link
          href={book.link}
          key={index}
          className="group block overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative aspect-[3/4]">
            <img
              src={book.image}
              alt={book.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-5">
              <h3 className="text-lg font-semibold text-white mb-1">{book.title}</h3>
              <p className="text-white/70 text-sm">{book.author}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</div>

      
      {/* Newsletter */}
      <div className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground mb-6">
              Stay updated with new releases and recommendations in your favorite categories.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
            <NewsletterSubscribe />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}