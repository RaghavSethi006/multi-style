import { useCustomizationStore } from '@/store/useCustomizationStore';
import { StandardButton } from './StandardButton';

export const PreviewArea = () => {
  const { selectedComponent } = useCustomizationStore();

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-surface/50 p-12">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">{selectedComponent}</h2>
        <p className="text-muted-foreground">Live Preview</p>
      </div>

      <div className="min-h-[400px] flex items-center justify-center">
        {selectedComponent === 'Standard Button' ? (
          <StandardButton />
        ) : (
          <div className="text-center p-12 rounded-2xl bg-card elevation-2 border border-border">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">
              This component is under development
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 text-sm text-muted-foreground text-center">
        <p>Make changes in the customization panel to see live updates</p>
      </div>
    </div>
  );
};
