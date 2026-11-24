import { useCustomizationStore, type ComponentConfig } from '@/store/useCustomizationStore';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toColorPickerValue } from '@/lib/styleUtils';
import { HelpCircle } from 'lucide-react';

export const EffectsPanel = () => {
  const { componentConfig, updateComponentConfig } = useCustomizationStore();

  return (
    <div className="space-y-6">
      {/* Box Shadow */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium">Box Shadow</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" aria-label="Box shadow help" className="text-muted-foreground">
                  <HelpCircle size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Configure shadow effects</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label htmlFor="shadow-x" className="text-xs text-muted-foreground">
              X Offset
            </label>
            <input
              id="shadow-x"
              type="number"
              value={componentConfig.boxShadowX}
              onChange={(e) => updateComponentConfig({ boxShadowX: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="shadow-y" className="text-xs text-muted-foreground">
              Y Offset
            </label>
            <input
              id="shadow-y"
              type="number"
              value={componentConfig.boxShadowY}
              onChange={(e) => updateComponentConfig({ boxShadowY: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="shadow-blur" className="text-xs text-muted-foreground">
              Blur
            </label>
            <input
              id="shadow-blur"
              type="number"
              value={componentConfig.boxShadowBlur}
              onChange={(e) => updateComponentConfig({ boxShadowBlur: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              min={0}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="shadow-spread" className="text-xs text-muted-foreground">
              Spread
            </label>
            <input
              id="shadow-spread"
              type="number"
              value={componentConfig.boxShadowSpread}
              onChange={(e) => updateComponentConfig({ boxShadowSpread: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shadow-color-text" className="text-sm font-medium">
            Shadow Color
          </Label>
          <div className="flex gap-2">
            <input
              type="color"
              aria-label="Shadow color picker"
              value={toColorPickerValue(componentConfig.boxShadowColor, '#000000')}
              onChange={(e) => updateComponentConfig({ boxShadowColor: e.target.value })}
              className="w-12 h-10 rounded-lg border border-input cursor-pointer shrink-0"
            />
            <input
              id="shadow-color-text"
              type="text"
              value={componentConfig.boxShadowColor}
              onChange={(e) => updateComponentConfig({ boxShadowColor: e.target.value })}
              className="flex-1 min-w-0 px-3 py-2 bg-background border border-input rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="shadow-inset" className="text-sm font-medium">
            Inset Shadow
          </Label>
          <Switch
            id="shadow-inset"
            checked={componentConfig.boxShadowInset}
            onCheckedChange={(checked) => updateComponentConfig({ boxShadowInset: checked })}
          />
        </div>
      </div>

      {/* Glassmorphism */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="glass-toggle" className="text-sm font-medium">
              Glassmorphism
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" aria-label="Glassmorphism help" className="text-muted-foreground">
                    <HelpCircle size={14} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Apply frosted glass effect</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Switch
            id="glass-toggle"
            checked={componentConfig.glassmorphism}
            onCheckedChange={(checked) => updateComponentConfig({ glassmorphism: checked })}
          />
        </div>

        {componentConfig.glassmorphism && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Blur Amount</Label>
                <span className="text-sm text-muted-foreground">{componentConfig.glassBlur}px</span>
              </div>
              <Slider
                value={[componentConfig.glassBlur]}
                onValueChange={([value]) => updateComponentConfig({ glassBlur: value })}
                min={0}
                max={30}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Glass Opacity</Label>
                <span className="text-sm text-muted-foreground">{Math.round(componentConfig.glassOpacity * 100)}%</span>
              </div>
              <Slider
                value={[componentConfig.glassOpacity * 100]}
                onValueChange={([value]) => updateComponentConfig({ glassOpacity: value / 100 })}
                min={0}
                max={100}
                step={1}
              />
            </div>
          </>
        )}
      </div>

      {/* Gradient */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <Label htmlFor="gradient-toggle" className="text-sm font-medium">
            Use Gradient
          </Label>
          <Switch
            id="gradient-toggle"
            checked={componentConfig.useGradient}
            onCheckedChange={(checked) => updateComponentConfig({ useGradient: checked })}
          />
        </div>

        {componentConfig.useGradient && (
          <>
            <div className="space-y-2">
              <Label htmlFor="gradient-type" className="text-sm font-medium">
                Gradient Type
              </Label>
              <select
                id="gradient-type"
                value={componentConfig.gradientType}
                onChange={(e) =>
                  updateComponentConfig({ gradientType: e.target.value as 'linear' | 'radial' })
                }
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            </div>

            {componentConfig.gradientType === 'linear' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Angle</Label>
                  <span className="text-sm text-muted-foreground">{componentConfig.gradientAngle}°</span>
                </div>
                <Slider
                  value={[componentConfig.gradientAngle]}
                  onValueChange={([value]) => updateComponentConfig({ gradientAngle: value })}
                  min={0}
                  max={360}
                  step={1}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="gradient-start" className="text-sm font-medium">
                  Start Color
                </Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    aria-label="Gradient start color picker"
                    value={toColorPickerValue(componentConfig.gradientStart, '#3B82F6')}
                    onChange={(e) => updateComponentConfig({ gradientStart: e.target.value })}
                    className="w-10 h-10 rounded-lg border border-input cursor-pointer shrink-0"
                  />
                  <input
                    id="gradient-start"
                    type="text"
                    value={componentConfig.gradientStart}
                    onChange={(e) => updateComponentConfig({ gradientStart: e.target.value })}
                    className="flex-1 min-w-0 px-2 py-2 bg-background border border-input rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gradient-end" className="text-sm font-medium">
                  End Color
                </Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    aria-label="Gradient end color picker"
                    value={toColorPickerValue(componentConfig.gradientEnd, '#8B5CF6')}
                    onChange={(e) => updateComponentConfig({ gradientEnd: e.target.value })}
                    className="w-10 h-10 rounded-lg border border-input cursor-pointer shrink-0"
                  />
                  <input
                    id="gradient-end"
                    type="text"
                    value={componentConfig.gradientEnd}
                    onChange={(e) => updateComponentConfig({ gradientEnd: e.target.value })}
                    className="flex-1 min-w-0 px-2 py-2 bg-background border border-input rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Transition */}
      <div className="space-y-4 pt-4 border-t border-border">
        <Label className="text-sm font-medium">Transitions</Label>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Duration</Label>
            <span className="text-sm text-muted-foreground">{componentConfig.transitionDuration}ms</span>
          </div>
          <Slider
            value={[componentConfig.transitionDuration]}
            onValueChange={([value]) => updateComponentConfig({ transitionDuration: value })}
            min={0}
            max={1000}
            step={50}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transition-easing" className="text-sm font-medium">
            Easing
          </Label>
          <select
            id="transition-easing"
            value={componentConfig.transitionEasing}
            onChange={(e) =>
              updateComponentConfig({
                transitionEasing: e.target.value as ComponentConfig['transitionEasing'],
              })
            }
            className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="ease">Ease</option>
            <option value="linear">Linear</option>
            <option value="ease-in">Ease In</option>
            <option value="ease-out">Ease Out</option>
            <option value="ease-in-out">Ease In Out</option>
          </select>
        </div>
      </div>
    </div>
  );
};
