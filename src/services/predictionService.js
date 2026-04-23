import api from './api';
import { formatResult } from '@/utils/formatResult';

export async function predict(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await api.post('/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return formatResult(response.data);
}
