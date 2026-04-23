import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, X, SwitchCamera, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCamera } from '@/hooks/useCamera';

export default function CameraModal({ onCapture, onClose }) {
  const { videoRef, isActive, error, startCamera, stopCamera, capture, switchCamera } =
    useCamera();

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  const handleCapture = async () => {
    const file = await capture();
    if (file) {
      stopCamera();
      onCapture(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2 text-white">
          <Camera className="w-5 h-5" />
          <span className="font-medium">Take Photo</span>
        </div>
        <button
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Video */}
      <div className="flex-1 relative overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
            <div>
              <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Camera Unavailable</p>
              <p className="text-sm text-white/70">{error}</p>
              <Button
                variant="outline"
                className="mt-4 text-white border-white/30 hover:bg-white/10"
                onClick={onClose}
              >
                Go Back
              </Button>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        )}

        {/* Guide overlay */}
        {isActive && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-8 border-2 border-white/30 rounded-2xl" />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-white/60 text-xs">Center the animal in the frame</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {isActive && (
        <div className="flex items-center justify-center gap-8 p-6 pb-8">
          <button
            onClick={switchCamera}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <SwitchCamera className="w-5 h-5" />
          </button>

          <button
            onClick={handleCapture}
            className="w-18 h-18 rounded-full border-4 border-white flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95"
          >
            <Circle className="w-14 h-14 text-white fill-white/90" />
          </button>

          <div className="w-12" />
        </div>
      )}
    </motion.div>
  );
}
