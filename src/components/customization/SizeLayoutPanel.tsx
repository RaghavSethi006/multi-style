import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Lock, Unlock } from 'lucide-react';
import { useState } from 'react';

export const SizeLayoutPanel = () => {
  const { componentConfig, updateComponentConfig } = useCustomizationStore();
  const [lockPadding, setLockPadding] = useState(true);
  const [lockMargin, setLockMargin] = useState(true);

  const handlePaddingChange = (side: string, value: number) => {
    if (lockPadding) {
      updateComponentConfig({
        paddingTop: value,
        paddingRight: value,
        paddingBottom: value,
        paddingLeft: value,
      });
    } else {
      updateComponentConfig({ [side]: value });
    }
  };

  const handleMarginChange = (side: string, value: number) => {
    if (lockMargin) {
      updateComponentConfig({
        marginTop: value,
        marginRight: value,
        marginBottom: value,
        marginLeft: value,
      });
    } else {
      updateComponentConfig({ [side]: value });
    }
  };

  return (
    <div className="space-y-6">
      {/* Width */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Width</Label>
        <div className="flex gap-2">
          <select
            value={componentConfig.width.includes('px') || componentConfig.width.includes('%') ? 'custom' : componentConfig.width}
            onChange={(e) => {
              const val = e.target.value;
              if (val !== 'custom') {
                updateComponentConfig({ width: val });
              }
            }}
            className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="auto">Auto</option>
            <option value="100%">Full Width</option>
            <option value="custom">Custom</option>
          </select>
          {(componentConfig.width.includes('px') || componentConfig.width.includes('%')) && (
            <input
              type="text"
              value={componentConfig.width}
              onChange={(e) => updateComponentConfig({ width: e.target.value })}
              className="w-24 px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g., 200px"
            />
          )}
        </div>
      </div>

      {/* Height */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Height</Label>
        <div className="flex gap-2">
          <select
            value={componentConfig.height.includes('px') || componentConfig.height.includes('%') ? 'custom' : componentConfig.height}
            onChange={(e) => {
              const val = e.target.value;
              if (val !== 'custom') {
                updateComponentConfig({ height: val });
              }
            }}
            className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="auto">Auto</option>
            <option value="100%">Full Height</option>
            <option value="custom">Custom</option>
          </select>
          {(componentConfig.height.includes('px') || componentConfig.height.includes('%')) && (
            <input
              type="text"
              value={componentConfig.height}
              onChange={(e) => updateComponentConfig({ height: e.target.value })}
              className="w-24 px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g., 48px"
            />
          )}
        </div>
      </div>

      {/* Padding */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Padding</Label>
          <button
            onClick={() => setLockPadding(!lockPadding)}
            className="p-1.5 rounded hover:bg-muted transition-colors"
            title={lockPadding ? 'Unlock sides' : 'Lock sides'}
          >
            {lockPadding ? <Lock size={16} /> : <Unlock size={16} />}
          </button>
        </div>
        
        {lockPadding ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>All sides</span>
              <span>{componentConfig.paddingTop}px</span>
            </div>
            <Slider
              value={[componentConfig.paddingTop]}
              onValueChange={([value]) => handlePaddingChange('paddingTop', value)}
              min={0}
              max={64}
              step={1}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Top</span>
              <input
                type="number"
                value={componentConfig.paddingTop}
                onChange={(e) => handlePaddingChange('paddingTop', Number(e.target.value))}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                min={0}
                max={64}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Right</span>
              <input
                type="number"
                value={componentConfig.paddingRight}
                onChange={(e) => handlePaddingChange('paddingRight', Number(e.target.value))}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                min={0}
                max={64}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Bottom</span>
              <input
                type="number"
                value={componentConfig.paddingBottom}
                onChange={(e) => handlePaddingChange('paddingBottom', Number(e.target.value))}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                min={0}
                max={64}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Left</span>
              <input
                type="number"
                value={componentConfig.paddingLeft}
                onChange={(e) => handlePaddingChange('paddingLeft', Number(e.target.value))}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                min={0}
                max={64}
              />
            </div>
          </div>
        )}
      </div>

      {/* Margin */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Margin</Label>
          <button
            onClick={() => setLockMargin(!lockMargin)}
            className="p-1.5 rounded hover:bg-muted transition-colors"
            title={lockMargin ? 'Unlock sides' : 'Lock sides'}
          >
            {lockMargin ? <Lock size={16} /> : <Unlock size={16} />}
          </button>
        </div>
        
        {lockMargin ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>All sides</span>
              <span>{componentConfig.marginTop}px</span>
            </div>
            <Slider
              value={[componentConfig.marginTop]}
              onValueChange={([value]) => handleMarginChange('marginTop', value)}
              min={0}
              max={64}
              step={1}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Top</span>
              <input
                type="number"
                value={componentConfig.marginTop}
                onChange={(e) => handleMarginChange('marginTop', Number(e.target.value))}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                min={0}
                max={64}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Right</span>
              <input
                type="number"
                value={componentConfig.marginRight}
                onChange={(e) => handleMarginChange('marginRight', Number(e.target.value))}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                min={0}
                max={64}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Bottom</span>
              <input
                type="number"
                value={componentConfig.marginBottom}
                onChange={(e) => handleMarginChange('marginBottom', Number(e.target.value))}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                min={0}
                max={64}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Left</span>
              <input
                type="number"
                value={componentConfig.marginLeft}
                onChange={(e) => handleMarginChange('marginLeft', Number(e.target.value))}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                min={0}
                max={64}
              />
            </div>
          </div>
        )}
      </div>

      {/* Gap */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Gap (for flex/grid)</Label>
          <span className="text-sm text-muted-foreground">{componentConfig.gap}px</span>
        </div>
        <Slider
          value={[componentConfig.gap]}
          onValueChange={([value]) => updateComponentConfig({ gap: value })}
          min={0}
          max={48}
          step={1}
        />
      </div>
    </div>
  );
};
