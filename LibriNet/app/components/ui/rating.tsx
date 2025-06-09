'use client';

import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  value: number;
  className?: string;
}

export function Rating({ value, className = "" }: RatingProps) {
  // Validate and clamp the value between 0 and 5
  const safeValue = Math.max(0, Math.min(5, Number(value) || 0));
  const fullStars = Math.floor(safeValue);
  const hasHalfStar = safeValue % 1 >= 0.5;

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
}