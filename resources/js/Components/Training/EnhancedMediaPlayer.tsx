// resources/js/Components/Training/EnhancedMediaPlayer.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  SkipBack, SkipForward, ChevronLeft, ChevronRight,
  Download, ZoomIn, ZoomOut, RotateCw, AlertCircle, BookOpen
} from 'lucide-react';

interface EnhancedMediaPlayerProps {
  type: 'video' | 'youtube' | 'text' | 'slide';
  url?: string;
  content?: string;
  slides?: string[];
  title: string;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
}

export default function EnhancedMediaPlayer({
  type,
  url,
  content,
  slides,
  title,
  onComplete,
  onProgress
}: EnhancedMediaPlayerProps) {
  const renderPlayer = () => {
    switch (type) {
      case 'youtube':
        return url ? <YouTubePlayer url={url} onProgress={onProgress} /> : <NoContent />;

      case 'video':
        return url ? (
          <VideoPlayer
            url={url}
            onComplete={onComplete}
            onProgress={onProgress}
          />
        ) : <NoContent />;

      case 'slide':
        return slides && slides.length > 0 ? (
          <SlideViewer slides={slides} onProgress={onProgress} />
        ) : <NoContent message="No slides available" />;

      case 'text':
        return content ? (
          <TextViewer content={content} title={title} />
        ) : <NoContent message="No content available" />;

      default:
        return <NoContent />;
    }
  };

  return (
    <div className="w-full h-full bg-black">
      {renderPlayer()}
    </div>
  );
}

// No Content Placeholder
function NoContent({ message = 'No content available' }: { message?: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900 dark:bg-gray-950 text-white">
      <div className="text-center">
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-600" />
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
}

// YouTube Player Component
function YouTubePlayer({ url, onProgress }: { url: string; onProgress?: (progress: number) => void }) {
  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(url);

  useEffect(() => {
    // Track progress for YouTube videos (simplified)
    const interval = setInterval(() => {
      if (onProgress) {
        // Note: Accurate YouTube progress tracking requires YouTube IFrame API
        onProgress(50); // Placeholder
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [onProgress]);

  if (!videoId) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 dark:bg-gray-950 text-white">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <p className="text-lg">Invalid YouTube URL</p>
          <p className="text-sm text-gray-400 mt-2">Please check the video URL</p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      className="w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

// Video Player Component
function VideoPlayer({
  url,
  onComplete,
  onProgress
}: {
  url: string;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, []);

  const skip = useCallback((seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  }, []);

  const changePlaybackRate = useCallback((rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
      setShowSpeedMenu(false);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (onProgress && duration > 0) {
        const progressPercent = (videoRef.current.currentTime / duration) * 100;
        onProgress(progressPercent);
      }
    }
  }, [duration, onProgress]);

  const handleVideoEnd = useCallback(() => {
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
            setIsLoading(false);
          }
        }}
        onEnded={handleVideoEnd}
        onClick={togglePlay}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
      />

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Center Play Button */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={togglePlay}
          className="pointer-events-auto w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
        >
          {isPlaying ? (
            <Pause className="w-10 h-10 text-white" />
          ) : (
            <Play className="w-10 h-10 text-white ml-2" />
          )}
        </button>
      </div>

      {/* Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 mb-4 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%, #4b5563 100%)`
          }}
        />

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <button onClick={togglePlay} className="hover:text-blue-400 transition-colors">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            <button onClick={() => skip(-10)} className="hover:text-blue-400 transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button onClick={() => skip(10)} className="hover:text-blue-400 transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 group/volume">
              <button onClick={toggleMute} className="hover:text-blue-400 transition-colors">
                {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/volume:w-20 transition-all h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Playback Speed */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="hover:text-blue-400 transition-colors text-sm font-medium"
              >
                {playbackRate}x
              </button>
              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg p-2 space-y-1">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                    <button
                      key={rate}
                      onClick={() => changePlaybackRate(rate)}
                      className={`block w-full text-left px-3 py-1 rounded hover:bg-gray-700 ${
                        playbackRate === rate ? 'text-blue-400' : ''
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={toggleFullscreen} className="hover:text-blue-400 transition-colors">
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Slide Viewer Component
function SlideViewer({ slides, onProgress }: { slides: string[]; onProgress?: (progress: number) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (onProgress) {
      const progress = ((currentSlide + 1) / slides.length) * 100;
      onProgress(progress);
    }
  }, [currentSlide, slides.length, onProgress]);

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const resetView = () => {
    setZoom(1);
    setRotation(0);
  };

  return (
    <div className="w-full h-full bg-gray-900 dark:bg-gray-950 flex flex-col">
      {/* Slide Display */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-8">
        <img
          src={slides[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="max-w-full max-h-full object-contain transition-all duration-300"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`
          }}
        />
      </div>

      {/* Controls */}
      <div className="bg-gray-800 dark:bg-gray-900 border-t border-gray-700 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-white text-sm font-medium">
              {currentSlide + 1} / {slides.length}
            </span>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="p-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Zoom & Rotate Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-white text-sm font-medium min-w-16 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleRotate}
              className="p-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg transition-colors ml-2"
            >
              <RotateCw className="w-5 h-5" />
            </button>
            <button
              onClick={resetView}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Download */}
          <a
            href={slides[currentSlide]}
            download
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

// Text Viewer Component
function TextViewer({ content, title }: { content: string; title: string }) {
  const [fontSize, setFontSize] = useState(16);

  return (
    <div className="w-full h-full overflow-auto bg-white dark:bg-gray-900">
      {/* Controls */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFontSize(prev => Math.max(prev - 2, 12))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ZoomOut className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400 min-w-12 text-center">
            {fontSize}px
          </span>
          <button
            onClick={() => setFontSize(prev => Math.min(prev + 2, 24))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ZoomIn className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div
          className="prose dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
          style={{ fontSize: `${fontSize}px` }}
        >
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
