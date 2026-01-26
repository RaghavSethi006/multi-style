import { Search, Moon, Sun, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCustomizationStore, Framework } from '@/store/useCustomizationStore';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { selectedFramework, setSelectedFramework } = useCustomizationStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const frameworks: { value: Framework; label: string }[] = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'streamlit', label: 'Streamlit' },
    { value: 'tkinter', label: 'Tkinter' },
    { value: 'winui3', label: 'WinUI 3' },
  ];

  const isPlayground = location.pathname === '/playground';

  return (
    <header className="h-16 bg-card border-b border-border elevation-2 sticky top-0 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary">
            <Sparkles className="text-white" size={20} />
          </div>
          <div className="text-left">
            <h1 className="text-lg font-bold text-foreground">
              Universal Component Customizer
            </h1>
            <p className="text-xs text-muted-foreground">Design. Preview. Export.</p>
          </div>
        </button>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search components..."
              className="pl-10 pr-4 py-2 w-64 bg-surface rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-fast"
            />
          </div>

          <select
            value={selectedFramework}
            onChange={(e) => setSelectedFramework(e.target.value as Framework)}
            className="px-4 py-2 bg-surface rounded-lg border border-input text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-fast cursor-pointer"
          >
            {frameworks.map((fw) => (
              <option key={fw.value} value={fw.value}>
                {fw.label}
              </option>
            ))}
          </select>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-surface hover:bg-muted transition-fast"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};
