import { categories } from '@/data/categories';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const { selectedCategory, selectedComponent, setSelectedCategory, setSelectedComponent } =
    useCustomizationStore();

  return (
    <aside className="w-64 bg-card border-r border-border h-screen overflow-y-auto elevation-1">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Components
        </h2>
        <nav className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.name;

            return (
              <div key={category.id} className="space-y-1">
                <button
                  onClick={() => setSelectedCategory(category.name)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth text-sm font-medium',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  )}
                >
                  <Icon size={20} />
                  <span>{category.name}</span>
                </button>

                {isActive && (
                  <div className="ml-8 space-y-0.5 mt-1">
                    {category.components.map((component) => (
                      <button
                        key={component.id}
                        onClick={() =>
                          component.available && setSelectedComponent(component.name)
                        }
                        disabled={!component.available}
                        className={cn(
                          'w-full text-left px-3 py-2 rounded-md text-sm transition-fast',
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
        </nav>
      </div>
    </aside>
  );
};
