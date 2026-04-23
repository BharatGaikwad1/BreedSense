import { useCallback, useState } from 'react';
import imageCompression from 'browser-image-compression';

export function useImageCompressor() {
  const [isCompressing, setIsCompressing] = useState(false);

  const compress = useCallback(async (file) => {
    // Skip compression for small files (< 1MB)
    if (file.size < 1024 * 1024) {
      return file;
    }

    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: file.type,
      };

      const compressed = await imageCompression(file, options);
      return compressed;
    } catch (error) {
      console.error('Compression failed, using original:', error);
      return file;
    } finally {
      setIsCompressing(false);
    }
  }, []);

  return { compress, isCompressing };
}
