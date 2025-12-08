import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download,
  Maximize, Minimize, RotateCw, Grid, List, FileText,
  Image as ImageIcon, File, Loader2, AlertCircle, Eye
} from 'lucide-react';

interface DocumentSlidePlayerProps {
  type: 'slide' | 'document' | 'pdf';
  slides?: string[];
  documentUrl?: string;
  resources?: {
    slides?: string[];
    documents?: Array<{
      name: string;
      url: string;
      type: string;
    }>;
  };
  title: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

export default function DocumentSlidePlayer({
  type,
  slides,
  documentUrl,
  resources,
  title,
  onProgress,
  onComplete
}: DocumentSlidePlayerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get slide sources from either direct prop or resources
  const slidesSources = slides || resources?.slides || [];
  const totalSlides = slidesSources.length;

  // Track progress
  useEffect(() => {
    if (onProgress && totalSlides > 0) {
      const progress = ((currentSlide + 1) / totalSlides) * 100;
      onProgress(progress);
    }
  }, [currentSlide, totalSlides, onProgress]);

  // Auto-complete when reaching last slide
  useEffect(() => {
    if (currentSlide === totalSlides - 1 && totalSlides > 0 && onComplete) {
      // Mark as complete when user reaches the last slide
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, totalSlides, onComplete]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setViewMode('single');
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  }, []);

  const handleRotate = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setRotation(0);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const downloadCurrent = useCallback(() => {
    if (slidesSources[currentSlide]) {
      const link = document.createElement('a');
      link.href = slidesSources[currentSlide];
      link.download = `slide-${currentSlide + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [currentSlide, slidesSources]);

  const downloadAll = useCallback(() => {
    slidesSources.forEach((slide, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = slide;
        link.download = `slide-${index + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 500);
    });
  }, [slidesSources]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide, toggleFullscreen]);

  if (totalSlides === 0 && !documentUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 dark:bg-gray-950">
        <div className="text-center p-8">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold text-white mb-2">No Content Available</h3>
          <p className="text-gray-400">No slides or documents found for this lecture</p>
        </div>
      </div>
    );
  }

  // Render PDF Document
  if (type === 'pdf' && documentUrl) {
    return <PDFViewer url={documentUrl} title={title} onProgress={onProgress} />;
  }

  // Render Document (embedded viewer)
  if (type === 'document' && documentUrl) {
    return <DocumentViewer url={documentUrl} title={title} onProgress={onProgress} />;
  }

  // Render Slides
  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gray-900 dark:bg-gray-950 flex flex-col"
    >
      {/* Header Controls */}
      <div className="bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-gray-400" />
          <span className="text-white font-medium text-sm">{title}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'single' ? 'grid' : 'single')}
            className="p-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg transition-colors"
            title={viewMode === 'single' ? 'Grid View' : 'Single View'}
          >
            {viewMode === 'single' ? <Grid className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'single' ? (
          // Single Slide View
          <div className="h-full flex items-center justify-center p-8">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                <div className="text-center">
                  <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
                  <p className="text-white text-lg">{error}</p>
                </div>
              </div>
            )}

            <img
              src={slidesSources[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="max-w-full max-h-full object-contain transition-all duration-300 select-none"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
              }}
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError('Failed to load slide');
              }}
              draggable={false}
            />
          </div>
        ) : (
          // Grid View
          <div className="h-full overflow-y-auto p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {slidesSources.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative aspect-video bg-gray-800 dark:bg-gray-900 rounded-lg overflow-hidden group hover:ring-2 hover:ring-blue-500 transition-all ${
                    currentSlide === index ? 'ring-2 ring-blue-600' : ''
                  }`}
                >
                  <img
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-semibold">View</span>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="bg-gray-800 dark:bg-gray-900 border-t border-gray-700 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              title="Previous Slide (←)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-white text-sm font-medium min-w-20 text-center">
                {currentSlide + 1} / {totalSlides}
              </span>
              <div className="hidden md:block w-48 bg-gray-700 dark:bg-gray-800 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="p-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              title="Next Slide (→)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Zoom & Rotate Controls */}
          {viewMode === 'single' && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleZoomOut}
                className="p-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="text-white text-sm font-medium min-w-16 text-center">
                {Math.round(zoom * 100)}%
              </span>

              <button
                onClick={handleZoomIn}
                className="p-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={handleRotate}
                className="p-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg transition-colors ml-2"
                title="Rotate"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <button
                onClick={resetView}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          )}

          {/* Download */}
          <div className="flex items-center space-x-2">
            <button
              onClick={downloadCurrent}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              title="Download Current Slide"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={downloadAll}
              className="hidden md:block px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
              title="Download All Slides"
            >
              Download All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// PDF Viewer Component
function PDFViewer({ url, title, onProgress }: { url: string; title: string; onProgress?: (progress: number) => void }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (onProgress) {
      onProgress(50); // PDF viewed
    }
  }, [onProgress]);

  return (
    <div className="w-full h-full bg-gray-900 dark:bg-gray-950 flex flex-col">
      <div className="bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <File className="w-5 h-5 text-red-500" />
          <span className="text-white font-medium text-sm">{title}</span>
        </div>
        <a
          href={url}
          download
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          title="Download PDF"
        >
          <Download className="w-4 h-4" />
        </a>
      </div>

      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        )}

        {error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
              <p className="text-white text-lg mb-4">Unable to display PDF</p>
              <a
                href={url}
                download
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        ) : (
          <iframe
            src={`${url}#toolbar=1&navpanes=1&scrollbar=1`}
            className="w-full h-full"
            title={title}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
          />
        )}
      </div>
    </div>
  );
}

// Document Viewer Component (for Word, PowerPoint, etc.)
function DocumentViewer({ url, title, onProgress }: { url: string; title: string; onProgress?: (progress: number) => void }) {
  const [loading, setLoading] = useState(true);
  const [viewerUrl, setViewerUrl] = useState('');

  useEffect(() => {
    // Use Google Docs Viewer or Microsoft Office Online
    const encodedUrl = encodeURIComponent(url);
    setViewerUrl(`https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`);

    if (onProgress) {
      onProgress(50);
    }
  }, [url, onProgress]);

  return (
    <div className="w-full h-full bg-gray-900 dark:bg-gray-950 flex flex-col">
      <div className="bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-500" />
          <span className="text-white font-medium text-sm">{title}</span>
        </div>
        <a
          href={url}
          download
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          title="Download Document"
        >
          <Download className="w-4 h-4" />
        </a>
      </div>

      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        )}

        <iframe
          src={viewerUrl}
          className="w-full h-full"
          title={title}
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
