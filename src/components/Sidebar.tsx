import { useState, useEffect, useMemo } from 'react';
import { categories } from '@/data/categories';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { cn } from '@/lib/utils';
import { ChevronDown, Search } from 'lucide-react';

interface SidebarProps {
  onSelectComponent?: () => void;
  className?: string;
}

export const Sidebar = ({ onSelectComponent, className }: SidebarProps) => {
  const {
    selectedCategory,
    selectedComponent,
    setSelectedCategory,
    selectComponentWithCategory,
  } = useCustomizationStore();
  const [filterText, setFilterText] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([selectedCategory]);

  useEffect(() => {
    setExpandedCategories((prev) =>
      prev.includes(selectedCategory) ? prev : [...prev, selectedCategory]
    );
  }, [selectedCategory]);

  const filteredCategories = useMemo(() => {
    const query = filterText.trim().toLowerCase();
    if (!query) return categories;
    return categories
      .map((cat) => {
        const categoryMatches = cat.name.toLowerCase().includes(query);
        const matchingComponents = categoryMatches
          ? cat.components
          : cat.components.filter((c) => c.name.toLowerCase().includes(query));
        return { ...cat, components: matchingComponents };
      })
      .filter((cat) => cat.components.length > 0);
  }, [filterText]);

  const toggleCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <aside
      className={cn(
        'w-64 bg-card border-r border-border h-full overflow-y-auto elevation-1 shrink-0',
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Components
          </h2>
          <span className="text-xs text-muted-foreground">
            {categories.reduce((acc, c) => acc + c.components.filter((x) => x.available).length, 0)}
          </span>
        </div>

        <div className="relative mb-3">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter components..."
            aria-label="Filter components in sidebar"
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <nav aria-label="Component categories" className="space-y-1">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            const isActiveCategory = selectedCategory === category.name;
            const isExpanded =
              Boolean(filterText.trim()) || expandedCategories.includes(category.name);

            return (
              <div key={category.id} className="space-y-1">
                <button
                  type="button"
                  onClick={() => toggleCategory(category.name)}
                  aria-expanded={isExpanded}
                  className={cn(
                    'w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg transition-smooth text-sm font-medium',
                    isActiveCategory
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  )}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Icon size={18} className="shrink-0" />
                    <span className="truncate">{category.name}</span>
                  </span>
                  <ChevronDown
                    size={14}
                    className={cn(
                      'shrink-0 transition-transform',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </button>

                {isExpanded && (
                  <div className="ml-6 space-y-0.5 mt-1 border-l border-border pl-2">
                    {category.components.map((component) => (
                      <button
                        key={component.id}
                        type="button"
                        onClick={() => {
                          if (!component.available) return;
                          selectComponentWithCategory(component.name, category.name);
                          onSelectComponent?.();
                        }}
                        disabled={!component.available}
                        className={cn(
                          'w-full text-left px-2.5 py-1.5 rounded-md text-sm transition-fast',
                          selectedComponent === component.name
                            ? 'bg-primary/10 text-primary font-medium'
                            : component.available
                              ? 'text-muted-foreground hover:bg-muted hover:text-foreground'
                              : 'text-muted-foreground/40 cursor-not-allowed'
                        )}
                      >
                        {component.name}
                        {!component.available && (
                          <span className="ml-2 text-xs">(Soon)</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {filteredCategories.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">
              No components match "{filterText}"
            </p>
          )}
        </nav>
      </div>
    </aside>
  );
};
