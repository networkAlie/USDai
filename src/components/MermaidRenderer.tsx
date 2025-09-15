'use client';

import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCcw, Maximize, Download, Copy, Search } from 'lucide-react';
import mermaid from 'mermaid';

// Initialize Mermaid with better configuration for dark theme support
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'loose',
  themeVariables: {
    primaryColor: '#3b82f6',
    primaryTextColor: '#1f2937',
    primaryBorderColor: '#2563eb',
    lineColor: '#6b7280',
    secondaryColor: '#f3f4f6',
    tertiaryColor: '#ffffff',
    background: '#ffffff',
    mainBkg: '#ffffff',
    secondBkg: '#f8fafc',
    tertiaryBkg: '#f1f5f9'
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
    diagramPadding: 8,
    nodeSpacing: 30,
    rankSpacing: 40,
    useMaxWidth: false
  },
  sequence: {
    diagramMarginX: 50,
    diagramMarginY: 10,
    actorMargin: 50,
    width: 150,
    height: 65,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    mirrorActors: true,
    bottomMarginAdj: 1,
    useMaxWidth: true,
    rightAngles: false,
    showSequenceNumbers: false
  }
});

interface MermaidRendererProps {
  code: string;
  onRender?: (svg: string) => void;
  title?: string;
  className?: string;
  enableZoom?: boolean;
  showControls?: boolean;
  darkMode?: boolean;
}

const MermaidRenderer: React.FC<MermaidRendererProps> = ({
  code,
  onRender,
  title = '',
  className = '',
  enableZoom = true,
  showControls = true,
  darkMode = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Update Mermaid theme based on dark mode
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: darkMode ? 'dark' : 'base',
      securityLevel: 'loose',
      themeVariables: darkMode ? {
        primaryColor: '#60a5fa',
        primaryTextColor: '#f1f5f9',
        primaryBorderColor: '#3b82f6',
        lineColor: '#94a3b8',
        secondaryColor: '#334155',
        tertiaryColor: '#1e293b',
        background: '#0f172a',
        mainBkg: '#1e293b',
        secondBkg: '#334155',
        tertiaryBkg: '#475569'
      } : {
        primaryColor: '#3b82f6',
        primaryTextColor: '#1f2937',
        primaryBorderColor: '#2563eb',
        lineColor: '#6b7280',
        secondaryColor: '#f3f4f6',
        tertiaryColor: '#ffffff',
        background: '#ffffff',
        mainBkg: '#ffffff',
        secondBkg: '#f8fafc',
        tertiaryBkg: '#f1f5f9'
      },
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        diagramPadding: 8,
        nodeSpacing: 30,
        rankSpacing: 40,
        useMaxWidth: false
      }
    });
  }, [darkMode]);

  // Render Mermaid diagram
  useEffect(() => {
    let isMounted = true;
    
    const renderDiagram = async () => {
      if (!code.trim()) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const id = `mermaid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, code);
        
        if (!isMounted) return;
        
        // Enhance SVG with better styling and responsive sizing
        const enhancedSvg = renderedSvg
          .replace('<svg', '<svg style="width: 100%; height: 100%; max-width: none;"')
          .replace(/font-family="[^"]*"/g, 'font-family="Inter, system-ui, sans-serif"');
        
        setSvg(enhancedSvg);
        setIsLoading(false);
        onRender?.(enhancedSvg);
        
        // Update container with rendered SVG
        if (containerRef.current) {
          containerRef.current.innerHTML = enhancedSvg;
        }
      } catch (err) {
        if (!isMounted) return;
        const errorMessage = err instanceof Error ? err.message : 'Unknown rendering error';
        setError(errorMessage);
        setIsLoading(false);
        
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="flex items-center justify-center h-64 text-red-500 dark:text-red-400">
              <div class="text-center">
                <div class="text-lg font-semibold mb-2">Rendering Error</div>
                <div class="text-sm opacity-80">${errorMessage}</div>
              </div>
            </div>
          `;
        }
      }
    };

    renderDiagram();
    
    return () => {
      isMounted = false;
    };
  }, [code, onRender, darkMode]);

  // Copy functions
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You can add a toast notification here
    } catch (err) {
      // Handle copy error silently
    }
  }, []);

  const copySvg = useCallback(() => {
    copyToClipboard(svg);
  }, [svg, copyToClipboard]);


  // Download function
  const downloadSvg = useCallback(() => {
    if (!svg) return;
    
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'diagram'}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [svg, title]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  // Search functionality
  const highlightSearchTerm = useCallback((svgContent: string, term: string) => {
    if (!term) return svgContent;
    
    const regex = new RegExp(`(${term})`, 'gi');
    return svgContent.replace(regex, '<mark class="bg-yellow-300 dark:bg-yellow-600">$1</mark>');
  }, []);

  const displaySvg = useMemo(() => {
    if (!svg) return '';
    return searchTerm ? highlightSearchTerm(svg, searchTerm) : svg;
  }, [svg, searchTerm, highlightSearchTerm]);

  const ControlButton = ({ onClick, icon: Icon, label, className: buttonClassName = '' }: {
    onClick: () => void;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg bg-white/80 dark:bg-dark-800/80 border border-gray-200 dark:border-dark-600 
                 hover:bg-white dark:hover:bg-dark-700 transition-all-smooth backdrop-blur-sm
                 flex items-center justify-center group ${buttonClassName}`}
      title={label}
    >
      <Icon className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-primary-600" />
    </button>
  );

  const MermaidContent = () => (
    <div className={`mermaid-container w-full h-full ${className} ${darkMode ? 'dark' : ''}`}>
      {isLoading && (
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          <div className="animate-pulse-soft">Rendering diagram...</div>
        </div>
      )}
      
      {error && (
        <div className="flex items-center justify-center h-64 text-red-500 dark:text-red-400">
          <div className="text-center">
            <div className="text-lg font-semibold mb-2">Rendering Error</div>
            <div className="text-sm opacity-80">{error}</div>
          </div>
        </div>
      )}

      {!isLoading && !error && (
        <div 
          ref={containerRef}
          className="w-full h-full flex items-center justify-center"
          style={{ padding: '40px' }}
          dangerouslySetInnerHTML={{ __html: displaySvg }}
        />
      )}
      
      {showControls && !isLoading && !error && (
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <div className="flex gap-2">
            <ControlButton onClick={copySvg} icon={Copy} label="Copy SVG" />
            <ControlButton onClick={downloadSvg} icon={Download} label="Download SVG" />
            <ControlButton onClick={toggleFullscreen} icon={Maximize} label="Fullscreen" />
          </div>
          
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1 text-sm rounded-lg bg-white/80 dark:bg-dark-800/80 
                         border border-gray-200 dark:border-dark-600 backdrop-blur-sm
                         focus:outline-none focus:ring-2 focus:ring-primary-500 w-32"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (!enableZoom) {
    return <MermaidContent />;
  }

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-dark-900' : 'w-full h-full'}`}>
      <TransformWrapper
        initialScale={0.6}
        minScale={0.2}
        maxScale={5}
        wheel={{ step: 0.1 }}
        pinch={{ step: 5 }}
        doubleClick={{ disabled: false, step: 0.5 }}
        limitToBounds={false}
        centerOnInit={true}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute top-4 left-4 flex gap-2 z-20">
              <ControlButton onClick={() => zoomIn()} icon={ZoomIn} label="Zoom In" />
              <ControlButton onClick={() => zoomOut()} icon={ZoomOut} label="Zoom Out" />
              <ControlButton onClick={() => resetTransform()} icon={RotateCcw} label="Reset View" />
            </div>
            
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
              contentStyle={{ width: '100%', height: '100%' }}
            >
              <MermaidContent />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
      
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 z-30 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default MermaidRenderer;