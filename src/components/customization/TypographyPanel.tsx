import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

const fontFamilies = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Raleway',
  'Playfair Display',
  'Source Code Pro',
  'Georgia',
  'Arial',
  'Times New Roman',
];

const fontWeights = [
  { value: 100, label: 'Thin' },
  { value: 200, label: 'Extra Light' },
  { value: 300, label: 'Light' },
  { value: 400, label: 'Regular' },
  { value: 500, label: 'Medium' },
  { value: 600, label: 'Semibold' },
  { value: 700, label: 'Bold' },
  { value: 800, label: 'Extra Bold' },
  { value: 900, label: 'Black' },
];

export const TypographyPanel = () => {
  const { componentConfig, updateComponentConfig } = useCustomizationStore();

  return (
    <div className="space-y-6">
      {/* Text Content */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Text Content</Label>
        <input
          type="text"
          value={componentConfig.text}
          onChange={(e) => updateComponentConfig({ text: e.target.value })}
          className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Font Family */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Font Family</Label>
        <select
          value={componentConfig.fontFamily}
          onChange={(e) => updateComponentConfig({ fontFamily: e.target.value })}
          className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {fontFamilies.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Font Size</Label>
          <span className="text-sm text-muted-foreground">{componentConfig.fontSize}px</span>
        </div>
        <Slider
          value={[componentConfig.fontSize]}
          onValueChange={([value]) => updateComponentConfig({ fontSize: value })}
          min={8}
          max={72}
          step={1}
        />
      </div>

      {/* Font Weight */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Font Weight</Label>
        <select
          value={componentConfig.fontWeight}
          onChange={(e) => updateComponentConfig({ fontWeight: Number(e.target.value) })}
          className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {fontWeights.map((weight) => (
            <option key={weight.value} value={weight.value}>
              {weight.value} - {weight.label}
            </option>
          ))}
        </select>
      </div>

      {/* Font Style */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Font Style</Label>
        <ToggleGroup
          type="single"
          value={componentConfig.fontStyle}
          onValueChange={(value: 'normal' | 'italic') => value && updateComponentConfig({ fontStyle: value })}
          className="justify-start"
        >
          <ToggleGroupItem value="normal" className="px-4">Normal</ToggleGroupItem>
          <ToggleGroupItem value="italic" className="px-4 italic">Italic</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Line Height */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Line Height</Label>
          <span className="text-sm text-muted-foreground">{componentConfig.lineHeight}</span>
        </div>
        <Slider
          value={[componentConfig.lineHeight * 10]}
          onValueChange={([value]) => updateComponentConfig({ lineHeight: value / 10 })}
          min={10}
          max={30}
          step={1}
        />
      </div>

      {/* Letter Spacing */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Letter Spacing</Label>
          <span className="text-sm text-muted-foreground">{componentConfig.letterSpacing}px</span>
        </div>
        <Slider
          value={[componentConfig.letterSpacing + 10]}
          onValueChange={([value]) => updateComponentConfig({ letterSpacing: value - 10 })}
          min={0}
          max={20}
          step={0.5}
        />
      </div>

      {/* Text Alignment */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Text Alignment</Label>
        <ToggleGroup
          type="single"
          value={componentConfig.textAlign}
          onValueChange={(value: 'left' | 'center' | 'right' | 'justify') => value && updateComponentConfig({ textAlign: value })}
          className="justify-start"
        >
          <ToggleGroupItem value="left"><AlignLeft size={18} /></ToggleGroupItem>
          <ToggleGroupItem value="center"><AlignCenter size={18} /></ToggleGroupItem>
          <ToggleGroupItem value="right"><AlignRight size={18} /></ToggleGroupItem>
          <ToggleGroupItem value="justify"><AlignJustify size={18} /></ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Text Transform */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Text Transform</Label>
        <select
          value={componentConfig.textTransform}
          onChange={(e) => updateComponentConfig({ textTransform: e.target.value as any })}
          className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="none">None</option>
          <option value="uppercase">UPPERCASE</option>
          <option value="lowercase">lowercase</option>
          <option value="capitalize">Capitalize</option>
        </select>
      </div>

      {/* Text Decoration */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Text Decoration</Label>
        <select
          value={componentConfig.textDecoration}
          onChange={(e) => updateComponentConfig({ textDecoration: e.target.value as any })}
          className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="none">None</option>
          <option value="underline">Underline</option>
          <option value="overline">Overline</option>
          <option value="line-through">Strikethrough</option>
        </select>
      </div>
    </div>
  );
};
