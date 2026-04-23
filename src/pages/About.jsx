import { motion } from 'framer-motion';
import { Info, Upload, Cpu, FileText, Heart, ScanLine, BookOpen, GitCompare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import breeds from '@/data/breeds';

const steps = [
  {
    icon: Upload,
    title: 'Upload Image',
    description: 'Drag & drop, browse, or use your camera to capture an image of a cow or buffalo.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Cpu,
    title: 'AI Analysis',
    description: 'Our advanced machine learning model analyzes the image and identifies the breed with high accuracy.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: FileText,
    title: 'Detailed Results',
    description: 'Get comprehensive breed information including milking capacity, physical traits, origin, and more.',
    color: 'from-amber-500 to-orange-500',
  },
];

const techStack = [
  'React 18', 'Vite', 'Tailwind CSS', 'Zustand', 'Framer Motion',
  'Axios', 'Radix UI', 'Lucide Icons',
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function About() {
  const cowCount = breeds.filter((b) => b.animal_type === 'cow').length;
  const buffaloCount = breeds.filter((b) => b.animal_type === 'buffalo').length;

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="relative overflow-hidden bg-muted/30">
        <div className="absolute top-10 right-10 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <Info className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">About BreedSense</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              An AI-powered platform for instant cattle breed recognition and comprehensive breed information.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* How it works */}
        <motion.section variants={containerVariants} initial="hidden" animate="show">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-center mb-8">
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div key={step.title} variants={itemVariants}>
                <Card className="h-full card-hover text-center">
                  <CardContent className="pt-8 pb-6 px-6">
                    <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold text-muted-foreground mb-3">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Supported Breeds */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-center mb-8">
            Supported Breeds
          </motion.h2>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <Card className="text-center card-hover">
              <CardContent className="pt-6 pb-4">
                <p className="text-3xl font-bold text-gradient">{breeds.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Breeds</p>
              </CardContent>
            </Card>
            <Card className="text-center card-hover">
              <CardContent className="pt-6 pb-4">
                <p className="text-3xl font-bold text-emerald-500">{cowCount}</p>
                <p className="text-sm text-muted-foreground mt-1">🐄 Cow Breeds</p>
              </CardContent>
            </Card>
            <Card className="text-center card-hover">
              <CardContent className="pt-6 pb-4">
                <p className="text-3xl font-bold text-blue-500">{buffaloCount}</p>
                <p className="text-sm text-muted-foreground mt-1">🐃 Buffalo Breeds</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {breeds.map((breed) => (
              <Badge
                key={breed.breed_name}
                variant={breed.animal_type === 'cow' ? 'success' : 'info'}
                className="text-xs"
              >
                {breed.breed_name}
              </Badge>
            ))}
          </motion.div>
        </motion.section>

        {/* Features */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-center mb-8">
            Key Features
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: ScanLine, title: 'AI Recognition', desc: 'Upload any cattle image for instant breed identification' },
              { icon: BookOpen, title: 'Breed Encyclopedia', desc: 'Browse detailed information about 20+ breeds' },
              { icon: GitCompare, title: 'Side-by-Side Compare', desc: 'Compare any two breeds across all attributes' },
              { icon: Upload, title: 'Multi-Input', desc: 'Drag & drop, file browser, or live camera capture' },
              { icon: Heart, title: 'Session History', desc: 'Review your last 10 predictions in the current session' },
              { icon: FileText, title: 'Export & Share', desc: 'Download breed cards as PNG or share results' },
            ].map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="h-full card-hover">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
            Built With
          </motion.h2>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs px-3 py-1">
                {tech}
              </Badge>
            ))}
          </motion.div>
        </motion.section>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Made with <Heart className="w-3.5 h-3.5 inline text-red-500 fill-red-500" /> for the cattle farming community.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            BreedSense © {new Date().getFullYear()} — All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
