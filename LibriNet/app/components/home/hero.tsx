'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  BookOpen,
  Sparkles,
  Flame,
  BookMarked
} from "lucide-react";

export function Hero() {
  const [email, setEmail] = useState("");

  const book = {
    cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800"
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-primary/5" />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-24 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
              Discover Your Next
              <span className="block text-primary">Great Read</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              Eksploro mijëra libra, nga bestsellerët bashkëkohorë te klasikët e përjetshëm.
Gjej përshtatjen tënde ideale dhe nis udhëtimin tënd të leximit sot.
            </p>

            {/* Fun fact */}
            <p className="text-sm text-muted-foreground italic">
              Over <span className="text-primary font-semibold">10,000+</span> readers joined last month!
            </p>

            {/* NEW: Bookstore Benefits */}
            <div className="grid sm:grid-cols-2 gap-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-3">
                <BookOpen className="text-primary h-5 w-5" />
                50,000+ titles across all genres
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="text-yellow-500 h-5 w-5" />
                Smart recommendations just for you
              </div>
              <div className="flex items-center gap-3">
                <Flame className="text-orange-500 h-5 w-5" />
                Top-rated bestsellers weekly
              </div>
              <div className="flex items-center gap-3">
                <BookMarked className="text-emerald-500 h-5 w-5" />
                Free shipping over $25
              </div>
            </div>

            {/* NEW: Newsletter CTA */}
            <div className="mt-8 bg-secondary rounded-xl p-6 shadow-sm max-w-xl">
              <h3 className="text-lg font-semibold mb-2">Join our newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get weekly book picks, exclusive discounts, and updates from your favorite genres.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Subscribed with:", email);
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 py-5"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>

          {/* Book Covers */}
          <div className="relative hidden lg:block">
            <div className="relative h-[500px] w-full">
              <div className="absolute top-0 right-0 w-3/4 aspect-[3/4] rounded-lg shadow-2xl overflow-hidden rotate-3 bg-card">
                <img
                  src={
<<<<<<< HEAD
                    book.cover && (book.cover.startsWith("name") || book.cover.startsWith("/images"))
                      ? book.cover
                      : `/images/${book.cover || "default.jpg"}`
=======
                    book.cover && (book.cover.startsWith("http") || book.cover.startsWith("/uploads"))
                      ? book.cover
                      : `/uploads/${book.cover || "default.jpg"}`
>>>>>>> 6270e43a (added new file)
                  }
                  alt="Featured Book"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/4 -left-4 w-2/3 aspect-[3/4] rounded-lg shadow-2xl overflow-hidden -rotate-6 bg-card z-10">
                <img
                  src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800"
                  alt="Featured Book"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-1/4 w-2/3 aspect-[3/4] rounded-lg shadow-2xl overflow-hidden rotate-12 bg-card">
                <img
                  src="https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=800"
                  alt="Featured Book"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
