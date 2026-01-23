import { useCustomizationStore, PreviewBackground } from '@/store/useCustomizationStore';
import { StandardButton } from './StandardButton';
import { PreviewInput } from './preview/PreviewInput';
import { PreviewCard } from './preview/PreviewCard';
import { cn } from '@/lib/utils';
import { Monitor, Tablet, Smartphone, Sun, Moon, Grid3X3 } from 'lucide-react';
import { useState } from 'react';

type DeviceFrame = 'desktop' | 'tablet' | 'mobile';

export const PreviewArea = () => {
  const { selectedComponent, previewBackground, setPreviewBackground, activeState } = useCustomizationStore();
  const [deviceFrame, setDeviceFrame] = useState<DeviceFrame>('desktop');

  const backgroundClasses = {
    light: 'bg-white',
    dark: 'bg-gray-900',
    checkered: 'bg-[length:20px_20px] bg-[linear-gradient(45deg,#f0f0f0_25%,transparent_25%,transparent_75%,#f0f0f0_75%,#f0f0f0),linear-gradient(45deg,#f0f0f0_25%,transparent_25%,transparent_75%,#f0f0f0_75%,#f0f0f0)] bg-[position:0_0,10px_10px] bg-gray-100',
  };

  const deviceSizes = {
    desktop: 'w-full h-full',
    tablet: 'w-[768px] h-[1024px] max-h-full',
    mobile: 'w-[375px] h-[667px] max-h-full',
  };

  const renderComponent = () => {
    const componentType = selectedComponent.toLowerCase();

    if (componentType.includes('button')) {
      return <StandardButton />;
    }
    if (componentType.includes('input') || componentType.includes('text field')) {
      return <PreviewInput />;
    }
    if (componentType.includes('card')) {
      return <PreviewCard />;
    }

    return (
      <div className="text-center p-8 rounded-2xl bg-card border border-border shadow-lg">
        <div className="text-5xl mb-4">🚧</div>
        <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
        <p className="text-muted-foreground text-sm">
          {selectedComponent} preview is under development
        </p>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-muted/30">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Preview</span>
          {activeState !== 'default' && (
            <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
              {activeState} state
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Device Frames */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setDeviceFrame('desktop')}
              className={cn(
                'p-1.5 rounded transition-colors',
                deviceFrame === 'desktop' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              )}
              title="Desktop"
            >
              <Monitor size={16} />
            </button>
            <button
              onClick={() => setDeviceFrame('tablet')}
              className={cn(
                'p-1.5 rounded transition-colors',
                deviceFrame === 'tablet' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              )}
              title="Tablet"
            >
              <Tablet size={16} />
            </button>
            <button
              onClick={() => setDeviceFrame('mobile')}
              className={cn(
                'p-1.5 rounded transition-colors',
                deviceFrame === 'mobile' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              )}
              title="Mobile"
            >
              <Smartphone size={16} />
            </button>
          </div>

          {/* Background Toggle */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setPreviewBackground('light')}
              className={cn(
                'p-1.5 rounded transition-colors',
                previewBackground === 'light' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              )}
              title="Light background"
            >
              <Sun size={16} />
            </button>
            <button
              onClick={() => setPreviewBackground('dark')}
              className={cn(
                'p-1.5 rounded transition-colors',
                previewBackground === 'dark' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              )}
              title="Dark background"
            >
              <Moon size={16} />
            </button>
            <button
              onClick={() => setPreviewBackground('checkered')}
              className={cn(
                'p-1.5 rounded transition-colors',
                previewBackground === 'checkered' ? 'bg-background shadow-sm' : 'hover:bg-background/50'
              )}
              title="Checkered background"
            >
              <Grid3X3 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Canvas */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div
          className={cn(
            'rounded-xl shadow-lg border border-border overflow-hidden transition-all',
            deviceSizes[deviceFrame],
            backgroundClasses[previewBackground]
          )}
        >
          <div className="w-full h-full flex items-center justify-center p-8">
            {renderComponent()}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-card border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          Customize properties in the left panel • Changes update live
        </p>
      </div>
    </div>
  );
};
