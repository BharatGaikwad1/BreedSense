import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, BookOpen, Milk } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BreedCard from '@/components/BreedCard/BreedCard';
import breeds from '@/data/breeds';

const ANIMAL_TYPES = ['all', 'cow', 'buffalo'];
const PRIMARY_USES = ['all', 'Dairy', 'Draft', 'Dual-purpose'];
const ORIGINS = ['all', ...new Set(breeds.map((b) => b.origin))];

export default function Encyclopedia() {
  const [search, setSearch] = useState('');
  const [animalType, setAnimalType] = useState('all');
  const [primaryUse, setPrimaryUse] = useState('all');
  const [origin, setOrigin] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(null);

  const filtered = useMemo(() => {
    return breeds.filter((breed) => {
      const matchesSearch =
        search === '' ||
        breed.breed_name.toLowerCase().includes(search.toLowerCase()) ||
        breed.origin.toLowerCase().includes(search.toLowerCase()) ||
        breed.description.toLowerCase().includes(search.toLowerCase());

      const matchesType = animalType === 'all' || breed.animal_type === animalType;

      const matchesUse =
        primaryUse === 'all' ||
        breed.utility?.primary_use
          ?.toLowerCase()
          .includes(primaryUse.toLowerCase());

      const matchesOrigin = origin === 'all' || breed.origin === origin;

      return matchesSearch && matchesType && matchesUse && matchesOrigin;
    });
  }, [search, animalType, primaryUse, origin]);

  const activeFilterCount = [animalType, primaryUse, origin].filter((f) => f !== 'all').length;

  const clearFilters = () => {
    setAnimalType('all');
    setPrimaryUse('all');
    setOrigin('all');
    setSearch('');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="relative overflow-hidden bg-muted/30">
        <div className="absolute top-10 right-10 w-48 h-48 bg-emerald-400/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">Breed Encyclopedia</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Explore our comprehensive database of {breeds.length} Indian cattle breeds.
              Search, filter, and learn about each breed's characteristics.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search breeds by name, origin..."
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            className="gap-2 shrink-0"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="p-4 rounded-xl border border-border bg-card space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Filter by</span>
                  {activeFilterCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs gap-1">
                      <X className="w-3 h-3" /> Clear all
                    </Button>
                  )}
                </div>

                {/* Animal Type */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Animal Type</label>
                  <div className="flex flex-wrap gap-2">
                    {ANIMAL_TYPES.map((type) => (
                      <Button
                        key={type}
                        variant={animalType === type ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setAnimalType(type)}
                        className="capitalize text-xs"
                      >
                        {type === 'all' ? 'All' : type === 'cow' ? '🐄 Cow' : '🐃 Buffalo'}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Primary Use */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Primary Use</label>
                  <div className="flex flex-wrap gap-2">
                    {PRIMARY_USES.map((use) => (
                      <Button
                        key={use}
                        variant={primaryUse === use ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPrimaryUse(use)}
                        className="text-xs"
                      >
                        {use === 'all' ? 'All' : use}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Origin */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block">Origin</label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full sm:w-64 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {ORIGINS.map((o) => (
                      <option key={o} value={o}>
                        {o === 'all' ? 'All Origins' : o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {breeds.length} breeds
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg font-medium text-muted-foreground">No breeds found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((breed, index) => (
              <BreedCard
                key={breed.breed_name}
                breed={breed}
                index={index}
                onClick={() => setSelectedBreed(breed)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Breed Detail Modal */}
      <Dialog open={!!selectedBreed} onOpenChange={() => setSelectedBreed(null)}>
        {selectedBreed && (
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={selectedBreed.animal_type === 'cow' ? 'success' : 'info'}>
                  {selectedBreed.animal_type === 'cow' ? '🐄 Cow' : '🐃 Buffalo'}
                </Badge>
                <Badge variant="outline">{selectedBreed.utility?.primary_use}</Badge>
              </div>
              <DialogTitle className="text-2xl">{selectedBreed.breed_name}</DialogTitle>
              <DialogDescription className="text-sm">{selectedBreed.origin}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedBreed.description}
              </p>

              <Tabs defaultValue="milking">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="milking">🥛 Milking</TabsTrigger>
                  <TabsTrigger value="physical">📏 Physical</TabsTrigger>
                  <TabsTrigger value="utility">🔧 Utility</TabsTrigger>
                </TabsList>

                <TabsContent value="milking" className="mt-3">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Daily Yield', value: `${selectedBreed.milking_capacity.daily_yield_liters} L/day` },
                      { label: 'Lactation', value: `${selectedBreed.milking_capacity.lactation_period_days} days` },
                      { label: 'Fat Content', value: `${selectedBreed.milking_capacity.fat_content_percent}%` },
                      { label: 'Annual Yield', value: `${selectedBreed.milking_capacity.annual_yield_liters} L/year` },
                    ].map((item) => (
                      <div key={item.label} className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-semibold mt-0.5">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="physical" className="mt-3">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Weight', value: selectedBreed.physical_attributes.average_weight_kg + ' kg' },
                      { label: 'Color', value: selectedBreed.physical_attributes.color },
                      { label: 'Horns', value: selectedBreed.physical_attributes.horns },
                      { label: 'Lifespan', value: selectedBreed.physical_attributes.lifespan_years + ' years' },
                    ].map((item) => (
                      <div key={item.label} className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-semibold mt-0.5">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="utility" className="mt-3">
                  <div className="space-y-3">
                    {[
                      { label: 'Primary Use', value: selectedBreed.utility.primary_use },
                      { label: 'Adaptability', value: selectedBreed.utility.adaptability },
                      { label: 'Temperament', value: selectedBreed.utility.temperament },
                      { label: 'Disease Resistance', value: selectedBreed.utility.disease_resistance },
                    ].map((item) => (
                      <div key={item.label} className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-semibold mt-0.5">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
