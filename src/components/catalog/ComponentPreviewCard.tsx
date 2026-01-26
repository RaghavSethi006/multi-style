import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MiniPreview } from './MiniPreview';

interface ComponentPreviewCardProps {
  componentName: string;
  categoryName: string;
  categoryId: string;
  onCustomize: () => void;
}

export const ComponentPreviewCard = ({
  componentName,
  categoryName,
  categoryId,
  onCustomize,
}: ComponentPreviewCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/30">
      {/* Mini Preview Area */}
      <div className="relative h-36 bg-muted/30 flex items-center justify-center overflow-hidden border-b border-border">
        <MiniPreview componentName={componentName} />
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <CardContent className="p-4">
        {/* Category Badge */}
        <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-secondary text-secondary-foreground mb-2">
          {categoryName}
        </span>

        {/* Component Name */}
        <h3 className="text-base font-semibold text-foreground mb-3">{componentName}</h3>

        {/* Customize Button */}
        <Button
          onClick={onCustomize}
          variant="default"
          size="sm"
          className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground"
        >
          Customize
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
};
