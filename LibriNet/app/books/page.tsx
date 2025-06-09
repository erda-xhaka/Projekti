'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, LayoutGrid, List as ListIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookCard } from '@/app/components/books/book-card';
import { useCart } from '@/app/context/CartContext';


interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  cover: string;
  createdAt?: string; // Optional, if you have this in your DB
}

const ITEMS_PER_PAGE = 6;

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('price');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const { addToCart } = useCart();

  const categories = ['all', 'best seller', 'new book', 'recommended', 'popular'];

useEffect(() => {
  const fetchBooks = async () => {
    setLoading(true);
    try {
<<<<<<< HEAD
    const res = await fetch(`http://localhost:5000/api/books`);
=======
      const res = await fetch(`http://localhost:5000/api/books`);
>>>>>>> 6270e43a (added new file)
      if (!res.ok) throw new Error('Failed to fetch books');
      const data = await res.json();
      setBooks(data.data || []);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  fetchBooks();
}, []);

  const filterByCategory = (book: Book) => {
    const createdDate = book.createdAt ? new Date(book.createdAt) : new Date(parseInt(book._id.substring(0, 8), 16) * 1000);
    const isNew = createdDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    switch (selectedCategory) {
      case 'best seller':
        return book.rating >= 4.5;
      case 'new book':
        return isNew;
      case 'recommended':
        return book.rating >= 4;
      case 'popular':
        return book.price < 20;
      default:
        return true;
    }
  };

  const filteredBooks = books
    .filter(book =>
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       book.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
      filterByCategory(book)
    )
    .sort((a, b) => (sortBy === 'price' ? a.price - b.price : b.rating - a.rating));

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddToCart = (book: Book) => {
    addToCart({
      id: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.cover,
      quantity: 1
    });
  };

  if (loading) return <div className="p-8 text-center">Loading books...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="py-12">
      <div className="container">
        <div className="mb-8 space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Books Collection</h1>
          <p className="text-muted-foreground">Eksploro librat më të njohur të zgjedhur nga lexuesit dhe kritikët.</p>
          <p className="text-muted-foreground">Explore top books selected by readers and critics alike.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books by title or author..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'price' | 'rating')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price (Low to High)</SelectItem>
              <SelectItem value="rating">Rating (High to Low)</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <ListIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Featured Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'ghost'}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className="w-full justify-start text-muted-foreground hover:bg-muted/50 capitalize"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Books */}
        {paginatedBooks.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search</p>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
            }
          >
            {paginatedBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                variant={viewMode === 'list' ? 'horizontal' : 'default'}
                onAddToCart={() => handleAddToCart(book)}
              />
            ))}
          </div>
        )}


{/* Pagination */}
{totalPages > 1 && (
  <div className="mt-10 flex justify-center items-center gap-2">
    <Button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      variant="outline"
    >
      Previous
    </Button>
    
    {/* Always show first page */}
    <Button
      variant={currentPage === 1 ? 'default' : 'ghost'}
      onClick={() => setCurrentPage(1)}
    >
      1
    </Button>
    
    {/* Show ellipsis if current page is far from start */}
    {currentPage > 3 && <span className="px-2">...</span>}
    
    {/* Middle pages */}
    {Array.from({ length: Math.min(totalPages - 2, 3) }, (_, i) => {
      let pageNum;
      if (currentPage < 3) {
        pageNum = i + 2; // Show 2,3,4 when on early pages
      } else if (currentPage > totalPages - 2) {
        pageNum = totalPages - 3 + i; // Show last pages when near end
      } else {
        pageNum = currentPage - 1 + i; // Show current page and neighbors
      }
      
      if (pageNum > 1 && pageNum < totalPages) {
        return (
          <Button
            key={pageNum}
            variant={currentPage === pageNum ? 'default' : 'ghost'}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </Button>
        );
      }
      return null;
    })}
    
    {/* Show ellipsis if current page is far from end */}
    {currentPage < totalPages - 2 && <span className="px-2">...</span>}
    
    {/* Always show last page if not same as first */}
    {totalPages > 1 && (
      <Button
        variant={currentPage === totalPages ? 'default' : 'ghost'}
        onClick={() => setCurrentPage(totalPages)}
      >
        {totalPages}
      </Button>
    )}
    
    <Button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      variant="outline"
    >
      Next
    </Button>
  </div>
)}
      

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center items-center gap-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? 'default' : 'ghost'}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
