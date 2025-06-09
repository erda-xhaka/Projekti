'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

type RateBookProps = {
  bookTitle: string;
};

export function RateBook({ bookTitle }: RateBookProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleRate = async (rating: number) => {
    setSelectedRating(rating);

    const res = await fetch(`/api/books/by-title/${encodeURIComponent(bookTitle)}`);
    const data = await res.json();

    if (!data.success) {
      alert('Libri nuk u gjet!');
      return;
    }

    const bookId = data.data._id;

    const response = await fetch(`/api/books/${bookId}/rating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating }),
    });

    if (response.ok) {
      setSubmitted(true);
    } else {
      alert('Dështoi vlerësimi.');
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={20}
          onClick={() => handleRate(i + 1)}
          className={`cursor-pointer ${selectedRating && i < selectedRating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}
            ${submitted ? 'pointer-events-none' : ''}`}
        />
      ))}
      {submitted && <span className="ml-2 text-sm text-green-600">Faleminderit për vlerësimin!</span>}
    </div>
  );
}
