const MAX_SIZE_MB = parseInt(import.meta.env.VITE_MAX_FILE_SIZE_MB || '10', 10);
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

export function validateImage(file) {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type "${file.type}". Please upload a JPG, PNG, or WEBP image.`,
    };
  }

  const maxBytes = MAX_SIZE_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `File size (${(file.size / 1024 / 1024).toFixed(1)}MB) exceeds the ${MAX_SIZE_MB}MB limit.`,
    };
  }

  return { valid: true, error: null };
}
