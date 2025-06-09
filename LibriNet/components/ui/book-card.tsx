'use client';
<<<<<<< HEAD

import { useCart } from '@/app/context/CartContext';

interface BookCardProps {
  book: {
    _id: string;
    title: string;
    author: string;
    price: number;
    cover: string;
    averageRating?: number;
    ratingCount?: number;
  };
}

export function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-48 object-cover rounded-t-md"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{book.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{book.author}</p>

        {/* Shfaq mesataren e rating dhe numrin e votave */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => {
              const starValue = i + 1;
              return (
                <svg
                  key={i}
                  className={`w-4 h-4 fill-current ${
                    starValue <= Math.round(book.averageRating || 0) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.563-.955L10 0l2.947 5.955 6.563.955-4.755 4.635 1.123 6.545z" />
                </svg>
              );
            })}
          </div>
          <span className="text-sm text-gray-600">
            {book.averageRating?.toFixed(1) || '0.0'} ({book.ratingCount || 0} vota)
          </span>
        </div>

        {/* Komponenti për vlerësim */}
        <RateBook bookId={book._id} />

        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold">${book.price.toFixed(2)}</span>
          <button
            onClick={() =>
              addToCart({
                id: book._id,
                title: book.title,
                author: book.author,
                price: book.price,
                image: book.cover,
              })
            }
=======
import { useCart } from '@/app/context/CartContext';
export function BookCard({ book }: { book: any }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden">
      <img src={book.cover} alt={book.title} className="w-20 h-28 object-cover rounded-md" style={{ width: "100%", objectFit: "cover" }}/>
      <div className="p-4">
        <h3 className="font-bold">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold">${book.price}</span>
          <button
            onClick={() => addToCart({
              id: book.id,
              title: book.title,
              author: book.author,
              price: book.price,
              image: book.image
            })}
>>>>>>> 6270e43a (added new file)
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 6270e43a (added new file)
