import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const colorPalettes = [
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-blue-500 to-indigo-600',
  'from-purple-500 to-violet-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-blue-600',
  'from-lime-500 to-green-600',
  'from-fuchsia-500 to-purple-600',
];

function getGradient(name) {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colorPalettes[hash % colorPalettes.length];
}

export default function BreedCard({ breed, onClick, index = 0 }) {
  const gradient = getGradient(breed.breed_name);
  const initials = breed.breed_name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className="rounded-xl border border-border bg-card overflow-hidden card-hover">
        {/* Gradient header with initials */}
        <div className={cn('h-36 bg-gradient-to-br flex items-center justify-center relative', gradient)}>
          <span className="text-4xl font-bold text-white/90 select-none">{initials}</span>
          {/* Decorative circles */}
          <div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-white/10" />
          <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-white/10" />
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant={breed.animal_type === 'cow' ? 'success' : 'info'} className="text-[10px]">
              {breed.animal_type === 'cow' ? '🐄 Cow' : '🐃 Buffalo'}
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              {breed.primary_use || breed.utility?.primary_use || 'Dairy'}
            </Badge>
          </div>

          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
            {breed.breed_name}
          </h3>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {typeof breed.origin === 'object' ? breed.origin?.state || 'Unknown' : breed.origin}
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {breed.description}
          </p>

          {(breed.milking_capacity?.avg_daily_yield_litres || breed.milking_capacity?.daily_yield_liters) && (
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                🥛 {breed.milking_capacity.avg_daily_yield_litres || breed.milking_capacity.daily_yield_liters} L/day
                {(breed.milking_capacity.fat_percentage || breed.milking_capacity.fat_content_percent) &&
                  ` • ${breed.milking_capacity.fat_percentage || breed.milking_capacity.fat_content_percent}% fat`}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
