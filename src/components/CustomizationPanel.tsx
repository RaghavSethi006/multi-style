import { useCustomizationStore } from '@/store/useCustomizationStore';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CustomizationPanel = () => {
  const { buttonConfig, updateButtonConfig, resetButtonConfig } = useCustomizationStore();

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Customize</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={resetButtonConfig}
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
          value={buttonConfig.text}
          onChange={(e) => updateButtonConfig({ text: e.target.value })}
          className="w-full px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast"
        />
      </div>

      {/* Font Settings */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Font Family</label>
        <select
          value={buttonConfig.fontFamily}
          onChange={(e) => updateButtonConfig({ fontFamily: e.target.value })}
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
            value={buttonConfig.fontSize}
            onChange={(e) => updateButtonConfig({ fontSize: Number(e.target.value) })}
            className="w-full px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast"
            min="10"
            max="32"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Font Weight</label>
          <select
            value={buttonConfig.fontWeight}
            onChange={(e) => updateButtonConfig({ fontWeight: Number(e.target.value) })}
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
            value={buttonConfig.backgroundColor}
            onChange={(e) => updateButtonConfig({ backgroundColor: e.target.value })}
            className="w-12 h-10 rounded-lg border border-input cursor-pointer"
          />
          <input
            type="text"
            value={buttonConfig.backgroundColor}
            onChange={(e) => updateButtonConfig({ backgroundColor: e.target.value })}
            className="flex-1 px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast font-mono text-sm"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium">Text Color</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={buttonConfig.textColor}
            onChange={(e) => updateButtonConfig({ textColor: e.target.value })}
            className="w-12 h-10 rounded-lg border border-input cursor-pointer"
          />
          <input
            type="text"
            value={buttonConfig.textColor}
            onChange={(e) => updateButtonConfig({ textColor: e.target.value })}
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
              value={buttonConfig.borderWidth}
              onChange={(e) => updateButtonConfig({ borderWidth: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast"
              min="0"
              max="10"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Color</label>
            <input
              type="color"
              value={buttonConfig.borderColor}
              onChange={(e) => updateButtonConfig({ borderColor: e.target.value })}
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
          value={buttonConfig.borderRadius}
          onChange={(e) => updateButtonConfig({ borderRadius: Number(e.target.value) })}
          className="w-full"
          min="0"
          max="48"
        />
        <div className="text-sm text-muted-foreground text-right">{buttonConfig.borderRadius}px</div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium">Padding</label>
        <input
          type="range"
          value={buttonConfig.padding}
          onChange={(e) => updateButtonConfig({ padding: Number(e.target.value) })}
          className="w-full"
          min="4"
          max="32"
        />
        <div className="text-sm text-muted-foreground text-right">{buttonConfig.padding}px</div>
      </div>

      {/* Size */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Width</label>
          <input
            type="number"
            value={buttonConfig.width}
            onChange={(e) => updateButtonConfig({ width: Number(e.target.value) })}
            className="w-full px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast"
            min="80"
            max="400"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Height</label>
          <input
            type="number"
            value={buttonConfig.height}
            onChange={(e) => updateButtonConfig({ height: Number(e.target.value) })}
            className="w-full px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast"
            min="32"
            max="80"
          />
        </div>
      </div>

      {/* Elevation */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Elevation</label>
        <input
          type="range"
          value={buttonConfig.elevation}
          onChange={(e) => updateButtonConfig({ elevation: Number(e.target.value) })}
          className="w-full"
          min="0"
          max="8"
        />
        <div className="text-sm text-muted-foreground text-right">Level {buttonConfig.elevation}</div>
      </div>

      {/* Animation */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Animation</label>
        <select
          value={buttonConfig.animation}
          onChange={(e) => updateButtonConfig({ animation: e.target.value as any })}
          className="w-full px-3 py-2 bg-surface border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-fast"
        >
          <option value="none">None</option>
          <option value="hover-glow">Hover Glow</option>
          <option value="pulse">Pulse</option>
          <option value="bounce">Bounce</option>
        </select>
      </div>

      {/* States */}
      <div className="space-y-3">
        <label className="block text-sm font-medium mb-2">States</label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={buttonConfig.hoverEffect}
            onChange={(e) => updateButtonConfig({ hoverEffect: e.target.checked })}
            className="w-5 h-5 rounded border-input text-primary focus:ring-primary"
          />
          <span className="text-sm">Hover Effect</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={buttonConfig.focusEffect}
            onChange={(e) => updateButtonConfig({ focusEffect: e.target.checked })}
            className="w-5 h-5 rounded border-input text-primary focus:ring-primary"
          />
          <span className="text-sm">Focus Effect</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={buttonConfig.disabledState}
            onChange={(e) => updateButtonConfig({ disabledState: e.target.checked })}
            className="w-5 h-5 rounded border-input text-primary focus:ring-primary"
          />
          <span className="text-sm">Disabled State</span>
        </label>
      </div>
    </div>
  );
};
