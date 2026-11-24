import { useState } from 'react';
import { Header } from '@/components/Header';
import { PageComponentPalette } from '@/components/page-maker/PageComponentPalette';
import { PageCanvas } from '@/components/page-maker/PageCanvas';
import { PageInspector } from '@/components/page-maker/PageInspector';
import { PageExportDialog } from '@/components/page-maker/PageExportDialog';

const PageMaker = () => {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />

      <div className="flex-1 flex min-h-0 overflow-hidden">
        <PageComponentPalette />
        <PageCanvas onOpenExport={() => setExportOpen(true)} />
        <PageInspector />
      </div>

      <PageExportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
};

export default PageMaker;
