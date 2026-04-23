import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar/Navbar';
import useThemeStore from '@/store/useThemeStore';
import { Spinner } from '@/components/Loader/Loader';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const Encyclopedia = lazy(() => import('@/pages/Encyclopedia'));
const Compare = lazy(() => import('@/pages/Compare'));
const About = lazy(() => import('@/pages/About'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Spinner size="lg" />
    </div>
  );
}

export default function App() {
  const { initTheme, theme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/breeds" element={<Encyclopedia />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </main>

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: '!bg-card !text-card-foreground !border !border-border !shadow-lg',
          duration: 4000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  );
}
