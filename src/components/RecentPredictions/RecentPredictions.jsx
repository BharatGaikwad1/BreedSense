import { motion } from 'framer-motion';
import usePredictionStore from '@/store/usePredictionStore';
import { cn } from '@/lib/utils';

export default function RecentPredictions({ onSelect }) {
  const { history } = usePredictionStore();

  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        Recent Predictions
      </h3>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {history.slice(0, 5).map((entry, index) => (
          <motion.button
            key={entry.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(entry)}
            className={cn(
              'shrink-0 w-20 group'
            )}
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-border hover:border-primary/50 transition-colors shadow-sm">
              {entry.imageUrl ? (
                <img
                  src={entry.imageUrl}
                  alt={entry.result.breedName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                  No img
                </div>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 truncate text-center group-hover:text-foreground transition-colors">
              {entry.result.breedName}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
