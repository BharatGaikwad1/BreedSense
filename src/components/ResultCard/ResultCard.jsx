import { motion } from 'framer-motion';
import { MapPin, Milk, Weight, Leaf, Shield, Heart, Thermometer, Wheat, Home as HomeIcon, AlertTriangle, Download, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { getConfidenceLevel, formatPercentage } from '@/utils/formatResult';
import { cn } from '@/lib/utils';
import { toPng } from 'html-to-image';
import { useRef } from 'react';

function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-sm text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function ResultCard({ result, imageUrl }) {
  const cardRef = useRef(null);

  if (!result) return null;

  const confidence = getConfidenceLevel(result.confidence);
  const confidencePercent = Math.round(result.confidence * 100);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 0.95, backgroundColor: '#0f172a' });
      const link = document.createElement('a');
      link.download = `${result.breedName.replace(/\s/g, '_')}_info.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const handleShare = async () => {
    const text = `${result.breedName} (${result.animalType}) — ${result.origin}\nConfidence: ${confidencePercent}%\n\nIdentified with BreedSense AI`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'BreedSense Result', text });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-2xl mx-auto"
    >
      <Card ref={cardRef} className="overflow-hidden shadow-xl border-primary/10">
        {/* Hero section */}
        <motion.div variants={itemVariants} className="relative">
          {imageUrl && (
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <img src={imageUrl} alt={result.breedName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            </div>
          )}

          <div className={cn('px-6', imageUrl ? '-mt-16 relative z-10' : 'pt-6')}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={result.animalType === 'cow' ? 'success' : 'info'}>
                    {result.animalType === 'cow' ? '🐄 Cow' : '🐃 Buffalo'}
                  </Badge>
                  <Badge variant="outline" className={confidence.color}>
                    {confidencePercent}% {confidence.label}
                  </Badge>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {result.breedName}
                </h2>
                <div className="flex items-center gap-1.5 mt-1 text-muted-foreground text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  {result.origin}
                </div>
              </div>

              <div className="flex gap-1.5">
                <Button variant="ghost" size="icon" onClick={handleDownload} title="Download">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleShare} title="Share">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Confidence bar */}
        <motion.div variants={itemVariants} className="px-6 pt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground font-medium">Prediction Confidence</span>
            <span className={cn('font-bold', confidence.color)}>{confidencePercent}%</span>
          </div>
          <Progress value={confidencePercent} indicatorClassName={confidence.bg} className="h-2" />
        </motion.div>

        {/* Low confidence warning */}
        {result.confidence < 0.6 && (
          <motion.div variants={itemVariants} className="mx-6 mt-3 flex items-center gap-2 text-sm bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg p-3">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            Low confidence — try uploading a clearer, well-lit image for better results.
          </motion.div>
        )}

        {/* Description */}
        <motion.div variants={itemVariants}>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{result.description}</p>
          </CardContent>
        </motion.div>

        {/* Tabbed sections */}
        <motion.div variants={itemVariants}>
          <CardContent className="pt-0">
            <Tabs defaultValue="milking" className="w-full">
              <TabsList className="w-full grid grid-cols-3 lg:grid-cols-4">
                <TabsTrigger value="milking">🥛 Milking</TabsTrigger>
                <TabsTrigger value="physical">📏 Physical</TabsTrigger>
                <TabsTrigger value="utility">🔧 Utility</TabsTrigger>
                {result.environmentDetected && (
                  <TabsTrigger value="environment">🌿 Environment</TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="milking" className="mt-4">
                <div className="space-y-0">
                  <InfoRow icon={Milk} label="Daily Yield" value={result.milkingCapacity.dailyYield ? `${result.milkingCapacity.dailyYield} liters/day` : null} />
                  <InfoRow icon={Leaf} label="Lactation Period" value={result.milkingCapacity.lactationPeriod ? `${result.milkingCapacity.lactationPeriod} days` : null} />
                  <InfoRow icon={Thermometer} label="Fat Content" value={result.milkingCapacity.fatContent ? `${result.milkingCapacity.fatContent}%` : null} />
                  <InfoRow icon={Milk} label="Annual Yield" value={result.milkingCapacity.annualYield ? `${result.milkingCapacity.annualYield} liters/year` : null} />
                </div>
              </TabsContent>

              <TabsContent value="physical" className="mt-4">
                <div className="space-y-0">
                  <InfoRow icon={Weight} label="Average Weight" value={result.physicalAttributes.averageWeight} />
                  <InfoRow icon={Heart} label="Coat Color" value={result.physicalAttributes.color} />
                  <InfoRow icon={Shield} label="Horn Type" value={result.physicalAttributes.horns} />
                  <InfoRow icon={Leaf} label="Lifespan" value={result.physicalAttributes.lifespan ? `${result.physicalAttributes.lifespan} years` : null} />
                </div>
              </TabsContent>

              <TabsContent value="utility" className="mt-4">
                <div className="space-y-0">
                  <InfoRow icon={Shield} label="Primary Use" value={result.utility.primaryUse} />
                  <InfoRow icon={Thermometer} label="Adaptability" value={result.utility.adaptability} />
                  <InfoRow icon={Heart} label="Temperament" value={result.utility.temperament} />
                  <InfoRow icon={Shield} label="Disease Resistance" value={result.utility.diseaseResistance} />
                </div>
              </TabsContent>

              {result.environmentDetected && (
                <TabsContent value="environment" className="mt-4">
                  <div className="space-y-0">
                    <InfoRow icon={MapPin} label="Terrain Suitability" value={result.fieldsInfo.terrainSuitability} />
                    <InfoRow icon={Wheat} label="Feed Requirements" value={result.fieldsInfo.feedRequirements} />
                    <InfoRow icon={HomeIcon} label="Housing Needs" value={result.fieldsInfo.housingNeeds} />
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}
