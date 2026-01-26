import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { categories } from '@/data/categories';
import { useCustomizationStore, componentDefaults, defaultComponentConfig } from '@/store/useCustomizationStore';
import { cn } from '@/lib/utils';
import { Search, Filter, ArrowRight, Sparkles, Bookmark, Package, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ComponentPreviewCard } from '@/components/catalog/ComponentPreviewCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type SortOption = 'name' | 'category' | 'newest';
type UseCaseFilter = 'all' | 'input' | 'action' | 'navigation' | 'feedback' | 'display' | 'layout';

const useCaseMapping: Record<string, UseCaseFilter> = {
  'text': 'display',
  'buttons': 'action',
  'lists': 'display',
  'forms': 'input',
  'selectors': 'input',
  'navigation': 'navigation',
  'cards': 'layout',
  'feedback': 'feedback',
  'data': 'display',
  'media': 'display',
  'advanced': 'action',
};

const Home = () => {
  const navigate = useNavigate();
  const { setSelectedCategory, setSelectedComponent } = useCustomizationStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [useCaseFilter, setUseCaseFilter] = useState<UseCaseFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('category');

  // Flatten all components with their category info
  const allComponents = useMemo(() => {
    return categories.flatMap((category) =>
      category.components
        .filter((c) => c.available)
        .map((component) => ({
          ...component,
          category: category.name,
          categoryId: category.id,
          useCase: useCaseMapping[category.id] || 'display',
        }))
    );
  }, []);

  // Filter and sort components
  const filteredComponents = useMemo(() => {
    let result = allComponents;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((c) => c.categoryId === categoryFilter);
    }

    // Use case filter
    if (useCaseFilter !== 'all') {
      result = result.filter((c) => c.useCase === useCaseFilter);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      return 0;
    });

    return result;
  }, [allComponents, searchQuery, categoryFilter, useCaseFilter, sortBy]);

  const handleCustomize = (componentName: string, categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedComponent(componentName);
    navigate('/playground');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="px-6 py-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles size={16} />
            <span>50+ Components • Multiple Frameworks • Instant Export</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Component Catalog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Browse, preview, and customize production-ready UI components. Export clean code for React, Vue, Angular, and more.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button onClick={() => navigate('/templates')} variant="outline" size="lg" className="gap-2">
              <Bookmark size={18} />
              Saved Templates
            </Button>
            <Button onClick={() => navigate('/frameworks')} variant="outline" size="lg" className="gap-2">
              <Package size={18} />
              My Frameworks
            </Button>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                {categoryFilter === 'all' ? 'All Categories' : categories.find(c => c.id === categoryFilter)?.name}
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setCategoryFilter('all')}>
                All Categories
              </DropdownMenuItem>
              {categories.map((cat) => (
                <DropdownMenuItem key={cat.id} onClick={() => setCategoryFilter(cat.id)}>
                  {cat.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Use Case Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                Use Case: {useCaseFilter.charAt(0).toUpperCase() + useCaseFilter.slice(1)}
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setUseCaseFilter('all')}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUseCaseFilter('input')}>Input</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUseCaseFilter('action')}>Action</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUseCaseFilter('navigation')}>Navigation</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUseCaseFilter('feedback')}>Feedback</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUseCaseFilter('display')}>Display</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUseCaseFilter('layout')}>Layout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy('name')}>Name</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('category')}>Category</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {/* Component Grid */}
      <section className="flex-1 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComponents.map((component) => (
              <ComponentPreviewCard
                key={`${component.categoryId}-${component.id}`}
                componentName={component.name}
                categoryName={component.category}
                categoryId={component.categoryId}
                onCustomize={() => handleCustomize(component.name, component.category)}
              />
            ))}
          </div>

          {filteredComponents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No components found</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
