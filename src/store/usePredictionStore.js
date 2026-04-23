import { create } from 'zustand';

const usePredictionStore = create((set, get) => ({
  // Current prediction
  currentResult: null,
  currentImage: null,
  isLoading: false,
  error: null,

  // History (last 10)
  history: [],

  // Compare selections
  compareBreeds: [null, null],

  // Rate limit
  cooldownUntil: null,

  setPredictionLoading: () =>
    set({ isLoading: true, error: null, currentResult: null }),

  setPredictionResult: (result, imageUrl) =>
    set((state) => {
      const entry = {
        id: Date.now(),
        result,
        imageUrl,
        timestamp: new Date().toISOString(),
      };
      const newHistory = [entry, ...state.history].slice(0, 10);
      return {
        currentResult: result,
        currentImage: imageUrl,
        isLoading: false,
        error: null,
        history: newHistory,
      };
    }),

  setPredictionError: (error) =>
    set({ error, isLoading: false, currentResult: null }),

  clearCurrentResult: () =>
    set({ currentResult: null, currentImage: null, error: null }),

  selectForComparison: (index, breed) =>
    set((state) => {
      const newCompare = [...state.compareBreeds];
      newCompare[index] = breed;
      return { compareBreeds: newCompare };
    }),

  clearComparison: () =>
    set({ compareBreeds: [null, null] }),

  setCooldown: (until) =>
    set({ cooldownUntil: until }),

  clearHistory: () =>
    set({ history: [] }),

  getHistoryEntry: (id) => {
    return get().history.find((entry) => entry.id === id);
  },
}));

export default usePredictionStore;
