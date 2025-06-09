<<<<<<< HEAD
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

=======
// Ndrysho interface-in dhe renderimin
>>>>>>> 6270e43a (added new file)
interface Category {
  _id: string;
  name: string;
}

interface CategoriesProps {
  categories: Category[];
  title?: string;
  showSeeAllButton?: boolean;
}

<<<<<<< HEAD
export function Categories({ categories, title, showSeeAllButton }: CategoriesProps) {
  return (
    <section className="my-12">
      {title && <h2 className="text-3xl font-extrabold mb-8 text-center">{title}</h2>}
<div className="flex flex-wrap justify-center gap-6">
  {categories.map((cat) => (
    <Button
      key={cat._id}
      variant="outline"
      asChild
      className="w-60 h-20 text-xl font-semibold rounded-lg transition-colors hover:bg-primary hover:text-white flex items-center justify-center text-center"
    >
      <Link href={`/search?genre=${encodeURIComponent(cat.name)}`}>
        {cat.name}
      </Link>
    </Button>
  ))}
</div>


      {showSeeAllButton && (
        <div className="mt-8 text-center">
          <Link
            href="/categories"
            className="text-primary underline font-semibold hover:text-primary/80 transition-colors"
          >
            See all genres
          </Link>
        </div>
      )}
    </section>
  );
}
=======
export const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center">Categories</h2>
      <div className="flex flex-wrap justify-center mt-6 gap-4">
        {categories.map((category) => (
          <Link 
            key={category._id} 
            href={`/categories/${category._id}`}
            className="category-card bg-primary/10 p-4 rounded-md cursor-pointer hover:bg-primary/20 transition-colors"
          >
            <h3 className="text-lg font-semibold">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};
>>>>>>> 6270e43a (added new file)
