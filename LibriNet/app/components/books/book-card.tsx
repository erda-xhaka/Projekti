'use client';

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rating } from "@/app/components/ui/rating";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
<<<<<<< HEAD
import { getCoverUrl } from '@/app/utils/getCoverUrl'; // Sigurohu që ky është rruga e saktë
=======
>>>>>>> 6270e43a (added new file)

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
<<<<<<< HEAD
  averageRating: number;
  ratingCount: number;
=======
  rating: number;
>>>>>>> 6270e43a (added new file)
  category: string | { _id: string; name: string };
  cover: string;
  description?: string;
}

interface BookCardProps {
  book: Book;
  variant?: 'default' | 'horizontal';
}

export function BookCard({ book, variant = "default" }: BookCardProps) {
  const { addToCart } = useCart();
  const isHorizontal = variant === "horizontal";

<<<<<<< HEAD
  const categoryName = typeof book.category === 'string'
    ? book.category
    : book.category?.name;
=======
  // Trajtojmë kategorinë për të siguruar që është një string, jo një objekt
  const categoryName = typeof book.category === 'string' ? book.category : book.category?.name;
>>>>>>> 6270e43a (added new file)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.cover,
      quantity: 1
    });
  };

<<<<<<< HEAD
  const coverUrl = getCoverUrl(book.cover);
=======
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Wishlist logic here
  };
>>>>>>> 6270e43a (added new file)

  return (
    <Card 
      className={`group overflow-hidden h-full transition-all hover:shadow-lg ${
        isHorizontal ? "flex flex-row" : "flex flex-col"
      }`}
    >
      <Link 
        href={`/books/${book._id}`}
        className={`relative block ${isHorizontal ? "w-1/3 md:w-1/4" : "aspect-[3/4]"}`}
      >
        <div className="relative h-full w-full">
<<<<<<< HEAD
          {/* Recommended: next/image */}
          <Image
            src={coverUrl}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </Link>

=======
          <Image
            src={book.cover || '/images/book-placeholder.jpg'}
            alt={`${book.title} by ${book.author}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={isHorizontal ? "(max-width: 768px) 33vw, 25vw" : "(max-width: 768px) 50vw, 33vw"}
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full shadow-sm"
          onClick={handleAddToWishlist}
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </Link>
      
>>>>>>> 6270e43a (added new file)
      <div className={`flex flex-col ${isHorizontal ? "flex-1" : "flex-grow"}`}>
        <CardContent className="flex-1 pt-4">
          {categoryName && (
            <Badge variant="secondary" className="mb-2">
              {categoryName}
            </Badge>
          )}
<<<<<<< HEAD

=======
          
>>>>>>> 6270e43a (added new file)
          <div className="space-y-1">
            <Link href={`/books/${book._id}`}>
              <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors line-clamp-2">
                {book.title}
              </h3>
            </Link>
<<<<<<< HEAD
=======
            
>>>>>>> 6270e43a (added new file)
            <p className="text-muted-foreground text-sm line-clamp-1">
              by {book.author}
            </p>
          </div>
<<<<<<< HEAD

          <div className="mt-3 flex items-center gap-2">
            <Rating value={book.averageRating || 0} />
            <span className="text-sm text-muted-foreground">
              ({book.ratingCount || 0})
            </span>
          </div>

          {book.ratingCount > 5 && book.averageRating > 4.0 && (
            <Badge variant="destructive" className="mt-2">Popular</Badge>
          )}

=======
          
          <div className="mt-3 flex items-center gap-2">
            <Rating value={book.rating} />
            <span className="text-sm text-muted-foreground">
              ({book.rating?.toFixed(1)})
            </span>
          </div>
          
>>>>>>> 6270e43a (added new file)
          <div className="mt-4">
            <p className="text-lg font-bold text-primary">
              ${book.price?.toFixed(2)}
            </p>
          </div>
<<<<<<< HEAD

=======
          
>>>>>>> 6270e43a (added new file)
          {isHorizontal && book.description && (
            <p className="text-sm text-muted-foreground line-clamp-3 mt-3">
              {book.description}
            </p>
          )}
        </CardContent>

        <CardFooter className="pt-0 pb-4">
          <Button 
            className="w-full gap-2"
            onClick={handleAddToCart}
            aria-label={`Add ${book.title} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
