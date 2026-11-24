import { Search, Moon, Sun, Sparkles, X } from 'lucide-react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCustomizationStore, Framework } from '@/store/useCustomizationStore';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/', label: 'Catalog' },
  { to: '/playground', label: 'Playground' },
  { to: '/templates', label: 'Templates' },
  { to: '/frameworks', label: 'Frameworks' },
];

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { selectedFramework, setSelectedFramework, selectComponentWithCategory } =
    useCustomizationStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const searchableComponents = useMemo(
    () =>
      categories.flatMap((cat) =>
        cat.components
          .filter((c) => c.available)
          .map((comp) => ({
            id: `${cat.id}-${comp.id}`,
            name: comp.name,
            category: cat.name,
          }))
      ),
    []
  );

  const searchResults = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return searchableComponents.slice(0, 8);
    return searchableComponents
      .filter(
        (item) =>
          item.name.toLowerCase().includes(trimmed) ||
          item.category.toLowerCase().includes(trimmed)
      )
      .slice(0, 10);
  }, [searchQuery, searchableComponents]);

  const handleSelectSearchItem = (name: string, category: string) => {
    selectComponentWithCategory(name, category);
    setSearchQuery('');
    setSearchOpen(false);
    navigate('/playground');
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setSearchOpen(true);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        searchResults.length > 0 ? (prev + 1) % searchResults.length : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        searchResults.length > 0
          ? (prev - 1 + searchResults.length) % searchResults.length
          : 0
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = searchResults[highlightedIndex] ?? searchResults[0];
      if (target) {
        handleSelectSearchItem(target.name, target.category);
      }
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
    }
  };

  const frameworks: { value: Framework; label: string }[] = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'streamlit', label: 'Streamlit' },
    { value: 'tkinter', label: 'Tkinter' },
    { value: 'winui3', label: 'WinUI 3' },
  ];

  return (
    <header className="h-16 bg-card border-b border-border elevation-2 sticky top-0 z-50">
      <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 min-w-0">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity shrink-0"
          >
            <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary to-secondary shrink-0">
              <Sparkles className="text-white" size={18} />
            </div>
            <div className="text-left hidden sm:block">
              <span className="block text-base md:text-lg font-bold text-foreground leading-tight">
                Universal Component Customizer
              </span>
              <p className="text-xs text-muted-foreground">Design. Preview. Export.</p>
            </div>
          </button>

          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <div ref={searchContainerRef} className="relative hidden md:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              size={16}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setHighlightedIndex(0);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Jump to component..."
              aria-label="Search components"
              aria-expanded={searchOpen}
              aria-controls="header-component-search-results"
              role="combobox"
              aria-autocomplete="list"
              className="pl-9 pr-8 py-2 w-56 lg:w-64 bg-surface rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-fast"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}

            {searchOpen && (
              <div
                id="header-component-search-results"
                role="listbox"
                className="absolute right-0 mt-1.5 w-72 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50 max-h-80 overflow-y-auto"
              >
                {searchResults.length > 0 ? (
                  searchResults.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={idx === highlightedIndex}
                      onClick={() => handleSelectSearchItem(item.name, item.category)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      className={cn(
                        'w-full px-3 py-2 text-left flex items-center justify-between text-sm transition-colors',
                        idx === highlightedIndex
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground hover:bg-muted'
                      )}
                    >
                      <span className="font-medium truncate">{item.name}</span>
                      <span className="text-xs text-muted-foreground ml-2 shrink-0">
                        {item.category}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-4 text-sm text-muted-foreground text-center">
                    No matching components
                  </div>
                )}
              </div>
            )}
          </div>

          <select
            aria-label="Target export framework"
            value={selectedFramework}
            onChange={(e) => setSelectedFramework(e.target.value as Framework)}
            className="px-3 py-2 bg-surface rounded-lg border border-input text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-fast cursor-pointer"
          >
            {frameworks.map((fw) => (
              <option key={fw.value} value={fw.value}>
                {fw.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-surface hover:bg-muted transition-fast"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
