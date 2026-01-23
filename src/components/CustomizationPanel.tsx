import { useCustomizationStore } from '@/store/useCustomizationStore';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CustomizationPanel = () => {
  const { componentConfig, updateComponentConfig, resetComponentConfig } = useCustomizationStore();

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Customize</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={resetComponentConfig}
          className="gap-2"
        >
          <RotateCcw size={16} />
          Reset
        </Button>
      </div>

      {/* Text Content */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Button Text</label>
        <input
          type="text"
          value={componentConfig.text}
          onChange={(e) => updateComponentConfig({ text: e.target.value })}
          className="w-full px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast"
        />
      </div>

      {/* Font Settings */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Font Family</label>
        <select
          value={componentConfig.fontFamily}
          onChange={(e) => updateComponentConfig({ fontFamily: e.target.value })}
          className="w-full px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast"
        >
          <option value="Inter">Inter</option>
          <option value="Roboto">Roboto</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Font Size</label>
          <input
            type="number"
            value={componentConfig.fontSize}
            onChange={(e) => updateComponentConfig({ fontSize: Number(e.target.value) })}
            className="w-full px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast"
            min="10"
            max="32"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Font Weight</label>
          <select
            value={componentConfig.fontWeight}
            onChange={(e) => updateComponentConfig({ fontWeight: Number(e.target.value) })}
            className="w-full px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast"
          >
            <option value="300">Light</option>
            <option value="400">Regular</option>
            <option value="500">Medium</option>
            <option value="600">Semibold</option>
            <option value="700">Bold</option>
          </select>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Background Color</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={componentConfig.backgroundColor}
            onChange={(e) => updateComponentConfig({ backgroundColor: e.target.value })}
            className="w-12 h-10 rounded-lg border border-input cursor-pointer"
          />
          <input
            type="text"
            value={componentConfig.backgroundColor}
            onChange={(e) => updateComponentConfig({ backgroundColor: e.target.value })}
            className="flex-1 px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast font-mono text-sm"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium">Text Color</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={componentConfig.textColor}
            onChange={(e) => updateComponentConfig({ textColor: e.target.value })}
            className="w-12 h-10 rounded-lg border border-input cursor-pointer"
          />
          <input
            type="text"
            value={componentConfig.textColor}
            onChange={(e) => updateComponentConfig({ textColor: e.target.value })}
            className="flex-1 px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast font-mono text-sm"
          />
        </div>
      </div>

      {/* Border */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Border</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Width</label>
            <input
              type="number"
              value={componentConfig.borderWidth}
              onChange={(e) => updateComponentConfig({ borderWidth: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast"
              min="0"
              max="10"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Color</label>
            <input
              type="color"
              value={componentConfig.borderColor}
              onChange={(e) => updateComponentConfig({ borderColor: e.target.value })}
              className="w-full h-10 rounded-lg border border-input cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Shape */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Border Radius</label>
        <input
          type="range"
          value={componentConfig.borderRadius}
          onChange={(e) => updateComponentConfig({ borderRadius: Number(e.target.value) })}
          className="w-full"
          min="0"
          max="48"
        />
        <div className="text-sm text-muted-foreground text-right">{componentConfig.borderRadius}px</div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium">Padding</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Vertical</label>
            <input
              type="number"
              value={componentConfig.paddingTop}
              onChange={(e) => {
                const value = Number(e.target.value);
                updateComponentConfig({ paddingTop: value, paddingBottom: value });
              }}
              className="w-full px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast"
              min="0"
              max="48"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Horizontal</label>
            <input
              type="number"
              value={componentConfig.paddingLeft}
              onChange={(e) => {
                const value = Number(e.target.value);
                updateComponentConfig({ paddingLeft: value, paddingRight: value });
              }}
              className="w-full px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast"
              min="0"
              max="48"
            />
          </div>
        </div>
      </div>

      {/* States */}
      <div className="space-y-3">
        <label className="block text-sm font-medium mb-2">States</label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={componentConfig.hoverEffect}
            onChange={(e) => updateComponentConfig({ hoverEffect: e.target.checked })}
            className="w-5 h-5 rounded border-input text-primary focus:ring-primary"
          />
          <span className="text-sm">Hover Effect</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={componentConfig.focusEffect}
            onChange={(e) => updateComponentConfig({ focusEffect: e.target.checked })}
            className="w-5 h-5 rounded border-input text-primary focus:ring-primary"
          />
          <span className="text-sm">Focus Effect</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={componentConfig.disabledState}
            onChange={(e) => updateComponentConfig({ disabledState: e.target.checked })}
            className="w-5 h-5 rounded border-input text-primary focus:ring-primary"
          />
          <span className="text-sm">Disabled State</span>
        </label>
      </div>
    </div>
  );
};
