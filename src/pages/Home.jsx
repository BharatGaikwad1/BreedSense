import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen, ScanLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import ResultCard from '@/components/ResultCard/ResultCard';
import RecentPredictions from '@/components/RecentPredictions/RecentPredictions';
import { LoadingOverlay } from '@/components/Loader/Loader';
import usePredictionStore from '@/store/usePredictionStore';
import { predict } from '@/services/predictionService';
import toast from 'react-hot-toast';

export default function Home() {
  const {
    currentResult,
    currentImage,
    isLoading,
    cooldownUntil,
    setPredictionLoading,
    setPredictionResult,
    setPredictionError,
    setCooldown,
    clearCurrentResult,
  } = usePredictionStore();

  const [showUploader, setShowUploader] = useState(true);

  const handleSubmit = useCallback(
    async (imageFile, previewUrl) => {
      setPredictionLoading();
      setShowUploader(false);

      try {
        const result = await predict(imageFile);
        setPredictionResult(result, previewUrl);
        toast.success(`Identified: ${result.breedName}`, {
          icon: '🐄',
          duration: 4000,
        });
      } catch (error) {
        if (error.response?.status === 429) {
          const cooldownMs = (error.cooldownSeconds || 30) * 1000;
          setCooldown(Date.now() + cooldownMs);
          toast.error(`Rate limited. Please wait ${error.cooldownSeconds || 30}s`, {
            icon: '⏳',
          });
        } else {
          toast.error(error.serverMessage || 'Failed to identify breed. Please try again.');
        }
        setPredictionError(error.serverMessage || error.message);
        setShowUploader(true);
      }
    },
    [setPredictionLoading, setPredictionResult, setPredictionError, setCooldown]
  );

  const handleNewPrediction = () => {
    clearCurrentResult();
    setShowUploader(true);
  };

  const handleHistorySelect = (entry) => {
    usePredictionStore.setState({
      currentResult: entry.result,
      currentImage: entry.imageUrl,
    });
    setShowUploader(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-hero dark:gradient-hero-dark opacity-[0.06]" />
        <div className="absolute top-20 -right-20 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Breed Recognition
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Identify Any{' '}
              <span className="text-gradient">Cattle Breed</span>{' '}
              Instantly
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Upload a photo of any cow or buffalo and get detailed breed information including
              milking capacity, physical traits, origin, and more — powered by advanced AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 w-full sm:w-auto px-4 sm:px-0">
              <a href="#upload-section" className="w-full sm:w-auto">
                <Button size="lg" className="gap-2 w-full sm:w-auto gradient-primary text-white border-0 hover:opacity-90 shadow-lg shadow-emerald-500/20">
                  <ScanLine className="w-5 h-5" />
                  Identify Now
                </Button>
              </a>
              <Link to="/breeds" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                  <BookOpen className="w-5 h-5" />
                  Browse Breeds
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-16"
          >
            {[
              { value: '20+', label: 'Breeds Supported' },
              { value: '95%', label: 'Accuracy' },
              { value: '<3s', label: 'Response Time' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upload / Result Section */}
      <section id="upload-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-8"
        >
          {isLoading && <LoadingOverlay message="Analyzing your image with AI..." />}

          {showUploader && !isLoading && (
            <ImageUploader
              onSubmit={handleSubmit}
              isLoading={isLoading}
              cooldownUntil={cooldownUntil}
            />
          )}

          {currentResult && !isLoading && (
            <div className="space-y-6">
              <ResultCard result={currentResult} imageUrl={currentImage} />
              <div className="text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleNewPrediction}
                  className="gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  Try Another Image
                </Button>
              </div>
            </div>
          )}

          <RecentPredictions onSelect={handleHistorySelect} />
        </motion.div>
      </section>
    </div>
  );
}
