import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, Link, Unlink } from 'lucide-react';

export const AppearancePanel = () => {
  const { componentConfig, updateComponentConfig } = useCustomizationStore();

  const handleRadiusChange = (value: number) => {
    if (componentConfig.linkBorderRadius) {
      updateComponentConfig({
        borderRadius: value,
        borderTopLeftRadius: value,
        borderTopRightRadius: value,
        borderBottomLeftRadius: value,
        borderBottomRightRadius: value,
      });
    } else {
      updateComponentConfig({ borderRadius: value });
    }
  };

  return (
    <div className="space-y-6">
      {/* Background Color */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium">Background Color</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle size={14} className="text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>Set the component's background color</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
            className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Text Color */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Text Color</Label>
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
            className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Border Color */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Border Color</Label>
        <div className="flex gap-2">
          <input
            type="color"
            value={componentConfig.borderColor}
            onChange={(e) => updateComponentConfig({ borderColor: e.target.value })}
            className="w-12 h-10 rounded-lg border border-input cursor-pointer"
          />
          <input
            type="text"
            value={componentConfig.borderColor}
            onChange={(e) => updateComponentConfig({ borderColor: e.target.value })}
            className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Border Width */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Border Width</Label>
          <span className="text-sm text-muted-foreground">{componentConfig.borderWidth}px</span>
        </div>
        <Slider
          value={[componentConfig.borderWidth]}
          onValueChange={([value]) => updateComponentConfig({ borderWidth: value })}
          min={0}
          max={10}
          step={1}
        />
      </div>

      {/* Border Style */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Border Style</Label>
        <select
          value={componentConfig.borderStyle}
          onChange={(e) => updateComponentConfig({ borderStyle: e.target.value as any })}
          className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
          <option value="none">None</option>
        </select>
      </div>

      {/* Border Radius */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Border Radius</Label>
          <button
            onClick={() => updateComponentConfig({ linkBorderRadius: !componentConfig.linkBorderRadius })}
            className="p-1.5 rounded hover:bg-muted transition-colors"
            title={componentConfig.linkBorderRadius ? 'Unlink corners' : 'Link corners'}
          >
            {componentConfig.linkBorderRadius ? <Link size={16} /> : <Unlink size={16} />}
          </button>
        </div>
        
        {componentConfig.linkBorderRadius ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>All corners</span>
              <span>{componentConfig.borderRadius}px</span>
            </div>
            <Slider
              value={[componentConfig.borderRadius]}
              onValueChange={([value]) => handleRadiusChange(value)}
              min={0}
              max={48}
              step={1}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Top Left</span>
              <input
                type="number"
                value={componentConfig.borderTopLeftRadius}
                onChange={(e) => updateComponentConfig({ borderTopLeftRadius: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                min={0}
                max={48}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Top Right</span>
              <input
                type="number"
                value={componentConfig.borderTopRightRadius}
                onChange={(e) => updateComponentConfig({ borderTopRightRadius: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                min={0}
                max={48}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Bottom Left</span>
              <input
                type="number"
                value={componentConfig.borderBottomLeftRadius}
                onChange={(e) => updateComponentConfig({ borderBottomLeftRadius: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                min={0}
                max={48}
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Bottom Right</span>
              <input
                type="number"
                value={componentConfig.borderBottomRightRadius}
                onChange={(e) => updateComponentConfig({ borderBottomRightRadius: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                min={0}
                max={48}
              />
            </div>
          </div>
        )}
      </div>

      {/* Opacity */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Opacity</Label>
          <span className="text-sm text-muted-foreground">{Math.round(componentConfig.opacity * 100)}%</span>
        </div>
        <Slider
          value={[componentConfig.opacity * 100]}
          onValueChange={([value]) => updateComponentConfig({ opacity: value / 100 })}
          min={0}
          max={100}
          step={1}
        />
      </div>

      {/* Visibility */}
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Visible</Label>
        <Switch
          checked={componentConfig.visible}
          onCheckedChange={(checked) => updateComponentConfig({ visible: checked })}
        />
      </div>
    </div>
  );
};
