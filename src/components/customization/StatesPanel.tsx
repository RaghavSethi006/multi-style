import { useCustomizationStore, ComponentState } from '@/store/useCustomizationStore';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const states: { value: ComponentState; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'hover', label: 'Hover' },
  { value: 'active', label: 'Active' },
  { value: 'focus', label: 'Focus' },
  { value: 'disabled', label: 'Disabled' },
];

export const StatesPanel = () => {
  const { activeState, setActiveState, componentConfig, updateStateStyles } = useCustomizationStore();
  
  const currentStateStyles = activeState === 'default' 
    ? null 
    : componentConfig.stateStyles[activeState];

  return (
    <div className="space-y-6">
      {/* State Selector */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Component State</Label>
        <div className="flex flex-wrap gap-2">
          {states.map((state) => (
            <button
              key={state.value}
              onClick={() => setActiveState(state.value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                activeState === state.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {state.label}
            </button>
          ))}
        </div>
      </div>

      {activeState === 'default' ? (
        <div className="p-4 bg-muted/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            Default state uses the main appearance settings.
            Select another state to customize its appearance.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Override styles for the <span className="font-medium text-foreground">{activeState}</span> state. 
            Leave empty to inherit from default.
          </p>

          {/* Background Override */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Background Override</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={currentStateStyles?.backgroundColor || componentConfig.backgroundColor}
                onChange={(e) => updateStateStyles(activeState, { backgroundColor: e.target.value })}
                className="w-12 h-10 rounded-lg border border-input cursor-pointer"
              />
              <input
                type="text"
                value={currentStateStyles?.backgroundColor || ''}
                onChange={(e) => updateStateStyles(activeState, { backgroundColor: e.target.value })}
                placeholder="Inherit from default"
                className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Text Color Override */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Text Color Override</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={currentStateStyles?.textColor || componentConfig.textColor}
                onChange={(e) => updateStateStyles(activeState, { textColor: e.target.value })}
                className="w-12 h-10 rounded-lg border border-input cursor-pointer"
              />
              <input
                type="text"
                value={currentStateStyles?.textColor || ''}
                onChange={(e) => updateStateStyles(activeState, { textColor: e.target.value })}
                placeholder="Inherit from default"
                className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Border Color Override */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Border Color Override</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={currentStateStyles?.borderColor || componentConfig.borderColor}
                onChange={(e) => updateStateStyles(activeState, { borderColor: e.target.value })}
                className="w-12 h-10 rounded-lg border border-input cursor-pointer"
              />
              <input
                type="text"
                value={currentStateStyles?.borderColor || ''}
                onChange={(e) => updateStateStyles(activeState, { borderColor: e.target.value })}
                placeholder="Inherit from default"
                className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Shadow Override */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Shadow Override</Label>
            <input
              type="text"
              value={currentStateStyles?.boxShadow || ''}
              onChange={(e) => updateStateStyles(activeState, { boxShadow: e.target.value })}
              placeholder="e.g., 0 0 0 3px rgba(59, 130, 246, 0.3)"
              className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Clear state overrides */}
          <button
            onClick={() => updateStateStyles(activeState, {
              backgroundColor: '',
              textColor: '',
              borderColor: '',
              boxShadow: '',
            })}
            className="w-full px-4 py-2 text-sm font-medium text-destructive border border-destructive/30 rounded-lg hover:bg-destructive/10 transition-colors"
          >
            Clear All Overrides
          </button>
        </div>
      )}
    </div>
  );
};
