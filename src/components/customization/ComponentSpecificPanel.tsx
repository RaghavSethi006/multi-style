import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { icons } from 'lucide-react';

const iconNames = Object.keys(icons).slice(0, 50);

export const ComponentSpecificPanel = () => {
  const { selectedComponent, componentConfig, updateComponentConfig } = useCustomizationStore();

  // Render different options based on component type
  const renderButtonOptions = () => (
    <div className="space-y-6">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Button Options</h4>
      
      {/* Icon */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Icon</Label>
        <select
          value={componentConfig.buttonIcon}
          onChange={(e) => updateComponentConfig({ buttonIcon: e.target.value })}
          className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">No Icon</option>
          {iconNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {componentConfig.buttonIcon && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Icon Position</Label>
          <div className="flex gap-2">
            <button
              onClick={() => updateComponentConfig({ buttonIconPosition: 'left' })}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                componentConfig.buttonIconPosition === 'left'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              Left
            </button>
            <button
              onClick={() => updateComponentConfig({ buttonIconPosition: 'right' })}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                componentConfig.buttonIconPosition === 'right'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              Right
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Loading State</Label>
        <Switch
          checked={componentConfig.buttonLoading}
          onCheckedChange={(checked) => updateComponentConfig({ buttonLoading: checked })}
        />
      </div>

      {/* Full Width */}
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Full Width</Label>
        <Switch
          checked={componentConfig.buttonFullWidth}
          onCheckedChange={(checked) => updateComponentConfig({ buttonFullWidth: checked })}
        />
      </div>
    </div>
  );

  const renderInputOptions = () => (
    <div className="space-y-6">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Input Options</h4>
      
      {/* Placeholder */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Placeholder</Label>
        <input
          type="text"
          value={componentConfig.placeholder}
          onChange={(e) => updateComponentConfig({ placeholder: e.target.value })}
          className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Label */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Label</Label>
        <input
          type="text"
          value={componentConfig.label}
          onChange={(e) => updateComponentConfig({ label: e.target.value })}
          className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Input Type */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Input Type</Label>
        <select
          value={componentConfig.inputType}
          onChange={(e) => updateComponentConfig({ inputType: e.target.value as any })}
          className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="text">Text</option>
          <option value="password">Password</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
          <option value="search">Search</option>
        </select>
      </div>

      {/* Validation State */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Validation State</Label>
        <select
          value={componentConfig.inputValidationState}
          onChange={(e) => updateComponentConfig({ inputValidationState: e.target.value as any })}
          className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="none">None</option>
          <option value="success">Success</option>
          <option value="error">Error</option>
        </select>
      </div>

      {/* Required */}
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Required</Label>
        <Switch
          checked={componentConfig.inputRequired}
          onCheckedChange={(checked) => updateComponentConfig({ inputRequired: checked })}
        />
      </div>
    </div>
  );

  const renderCardOptions = () => (
    <div className="space-y-6">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Card Options</h4>
      
      {/* Show Header */}
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Show Header</Label>
        <Switch
          checked={componentConfig.cardShowHeader}
          onCheckedChange={(checked) => updateComponentConfig({ cardShowHeader: checked })}
        />
      </div>

      {/* Show Footer */}
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Show Footer</Label>
        <Switch
          checked={componentConfig.cardShowFooter}
          onCheckedChange={(checked) => updateComponentConfig({ cardShowFooter: checked })}
        />
      </div>

      {/* Elevation */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Elevation</Label>
          <span className="text-sm text-muted-foreground">{componentConfig.cardElevation}</span>
        </div>
        <Slider
          value={[componentConfig.cardElevation]}
          onValueChange={([value]) => updateComponentConfig({ cardElevation: value })}
          min={0}
          max={5}
          step={1}
        />
      </div>
    </div>
  );

  const renderModalOptions = () => (
    <div className="space-y-6">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Modal Options</h4>
      
      {/* Overlay Opacity */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Overlay Opacity</Label>
          <span className="text-sm text-muted-foreground">{Math.round(componentConfig.modalOverlayOpacity * 100)}%</span>
        </div>
        <Slider
          value={[componentConfig.modalOverlayOpacity * 100]}
          onValueChange={([value]) => updateComponentConfig({ modalOverlayOpacity: value / 100 })}
          min={0}
          max={100}
          step={5}
        />
      </div>

      {/* Close on Overlay Click */}
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Close on Overlay Click</Label>
        <Switch
          checked={componentConfig.modalCloseOnOverlay}
          onCheckedChange={(checked) => updateComponentConfig({ modalCloseOnOverlay: checked })}
        />
      </div>

      {/* Animation Style */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Animation</Label>
        <select
          value={componentConfig.modalAnimation}
          onChange={(e) => updateComponentConfig({ modalAnimation: e.target.value as any })}
          className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="fade">Fade</option>
          <option value="slide">Slide</option>
          <option value="scale">Scale</option>
        </select>
      </div>
    </div>
  );

  // Determine which options to show based on selected component
  const getComponentOptions = () => {
    const componentType = selectedComponent.toLowerCase();
    
    if (componentType.includes('button')) {
      return renderButtonOptions();
    }
    if (componentType.includes('input') || componentType.includes('text field') || componentType.includes('textarea')) {
      return renderInputOptions();
    }
    if (componentType.includes('card')) {
      return renderCardOptions();
    }
    if (componentType.includes('modal') || componentType.includes('dialog')) {
      return renderModalOptions();
    }

    return (
      <div className="p-4 bg-muted/50 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          No component-specific options for {selectedComponent}
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {getComponentOptions()}
    </div>
  );
};
