'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  placeholder?: string;
}

export function SearchBar({ 
  onSearch, 
  initialQuery = '', 
  placeholder = 'Search books by title, author...' 
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isTyping, setIsTyping] = useState(false);

  // Kërkim automatik me debounce (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isTyping) {
        onSearch(query);
        setIsTyping(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, isTyping, onSearch]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="w-full relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsTyping(true);
        }}
        onKeyUp={handleKeyPress}
        className="pl-9 pr-12"
      />
      {query && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
          onClick={() => {
            setQuery('');
            onSearch('');
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </Button>
      )}
    </div>
  );
}