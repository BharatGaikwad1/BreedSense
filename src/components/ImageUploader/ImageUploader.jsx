import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, X, Image as ImageIcon, Send, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { validateImage } from '@/utils/validators';
import { useImageCompressor } from '@/hooks/useImageCompressor';
import CameraModal from './CameraModal';
import { cn } from '@/lib/utils';

export default function ImageUploader({ onSubmit, isLoading, cooldownUntil }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const { compress, isCompressing } = useImageCompressor();

  const isCoolingDown = cooldownUntil && Date.now() < cooldownUntil;

  const handleFile = useCallback((selectedFile) => {
    setError(null);
    const validation = validateImage(selectedFile);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFile(acceptedFiles[0]);
      }
    },
    [handleFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
    disabled: isLoading,
  });

  const handleCameraCapture = (capturedFile) => {
    handleFile(capturedFile);
    setShowCamera(false);
  };

  const handleSubmit = async () => {
    if (!file || isLoading || isCoolingDown) return;

    try {
      const compressed = await compress(file);
      onSubmit(compressed, preview);
    } catch (err) {
      setError('Failed to process image. Please try again.');
    }
  };

  const clearSelection = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (preview) URL.revokeObjectURL(preview);
  };

  return (
    <>
      <div className="w-full max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                {...getRootProps()}
                className={cn(
                  'relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300',
                  isDragActive
                    ? 'border-primary bg-primary/5 scale-[1.02] shadow-lg shadow-primary/10'
                    : 'border-border hover:border-primary/50 hover:bg-primary/[0.02]',
                  isLoading && 'opacity-50 pointer-events-none'
                )}
              >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center gap-4">
                  <div
                    className={cn(
                      'w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300',
                      isDragActive
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <Upload className="w-7 h-7" />
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      {isDragActive ? 'Drop your image here' : 'Drag & drop an image'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      or click to browse • JPG, PNG, WEBP up to 10MB
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ImageIcon className="w-4 h-4" />
                      Browse Files
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCamera(true);
                      }}
                    >
                      <Camera className="w-4 h-4" />
                      Use Camera
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Image preview */}
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg group">
                <img
                  src={preview}
                  alt="Selected preview"
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Clear button */}
                <button
                  onClick={clearSelection}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                  disabled={isLoading}
                >
                  <X className="w-4 h-4" />
                </button>

                {/* File info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-white text-sm font-medium truncate max-w-[200px]">
                    {file.name}
                  </span>
                  <span className="text-white/70 text-xs">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={clearSelection}
                  disabled={isLoading}
                >
                  <X className="w-4 h-4" />
                  Change Image
                </Button>
                <Button
                  className="flex-1 gap-2 gradient-primary text-white border-0 hover:opacity-90"
                  onClick={handleSubmit}
                  disabled={isLoading || isCompressing || isCoolingDown}
                >
                  {isCompressing ? (
                    <>Processing...</>
                  ) : isLoading ? (
                    <>Analyzing...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Identify Breed
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg p-3"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Camera modal */}
      {showCamera && (
        <CameraModal
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </>
  );
}
