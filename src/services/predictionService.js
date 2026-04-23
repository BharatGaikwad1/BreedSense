import api from './api';
import { formatResult } from '@/utils/formatResult';

export async function predict(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await api.post('/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 60000, // prediction can take up to 60s on cold-start HF Spaces
  });

  // Debug: log raw response to help diagnose data mapping issues
  console.log('[BreedSense] Raw API response:', JSON.stringify(response.data, null, 2));

  return formatResult(response.data.prediction);
}
