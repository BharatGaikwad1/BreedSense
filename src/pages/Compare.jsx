import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ComparisonTable from '@/components/ComparisonTable/ComparisonTable';
import breeds from '@/data/breeds';
import { cn } from '@/lib/utils';

export default function Compare() {
  const [breed1Id, setBreed1Id] = useState('');
  const [breed2Id, setBreed2Id] = useState('');

  const breed1 = breeds.find((b) => b.breed_name === breed1Id) || null;
  const breed2 = breeds.find((b) => b.breed_name === breed2Id) || null;

  const swapBreeds = () => {
    setBreed1Id(breed2Id);
    setBreed2Id(breed1Id);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="relative overflow-hidden bg-muted/30">
        <div className="absolute top-10 left-10 w-48 h-48 bg-teal-400/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <GitCompare className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">Compare Breeds</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Select two breeds to compare side-by-side across all attributes including
              milking capacity, physical traits, and utility.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Selectors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-8"
        >
          <div className="flex-1 w-full">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              First Breed
            </label>
            <select
              value={breed1Id}
              onChange={(e) => setBreed1Id(e.target.value)}
              className={cn(
                'w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors',
                !breed1Id && 'text-muted-foreground'
              )}
            >
              <option value="">Select a breed...</option>
              <optgroup label="🐄 Cows">
                {breeds
                  .filter((b) => b.animal_type === 'cow')
                  .map((b) => (
                    <option key={b.breed_name} value={b.breed_name}>
                      {b.breed_name} — {b.origin}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="🐃 Buffaloes">
                {breeds
                  .filter((b) => b.animal_type === 'buffalo')
                  .map((b) => (
                    <option key={b.breed_name} value={b.breed_name}>
                      {b.breed_name} — {b.origin}
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={swapBreeds}
            disabled={!breed1Id && !breed2Id}
            className="shrink-0 mt-5 sm:mt-5"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </Button>

          <div className="flex-1 w-full">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Second Breed
            </label>
            <select
              value={breed2Id}
              onChange={(e) => setBreed2Id(e.target.value)}
              className={cn(
                'w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors',
                !breed2Id && 'text-muted-foreground'
              )}
            >
              <option value="">Select a breed...</option>
              <optgroup label="🐄 Cows">
                {breeds
                  .filter((b) => b.animal_type === 'cow')
                  .map((b) => (
                    <option key={b.breed_name} value={b.breed_name}>
                      {b.breed_name} — {b.origin}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="🐃 Buffaloes">
                {breeds
                  .filter((b) => b.animal_type === 'buffalo')
                  .map((b) => (
                    <option key={b.breed_name} value={b.breed_name}>
                      {b.breed_name} — {b.origin}
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ComparisonTable breed1={breed1} breed2={breed2} />
        </motion.div>
      </div>
    </div>
  );
}
