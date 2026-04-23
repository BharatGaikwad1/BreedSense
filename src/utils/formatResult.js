export function formatResult(data) {
  return {
    breedName: data.breed_name || 'Unknown Breed',
    animalType: data.animal_type || 'unknown',
    confidence: typeof data.confidence === 'number' ? data.confidence : 0,
    origin: data.origin || 'Unknown',
    description: data.description || 'No description available.',

    milkingCapacity: {
      dailyYield: data.milking_capacity?.daily_yield_liters ?? null,
      lactationPeriod: data.milking_capacity?.lactation_period_days ?? null,
      fatContent: data.milking_capacity?.fat_content_percent ?? null,
      annualYield: data.milking_capacity?.annual_yield_liters ?? null,
    },

    physicalAttributes: {
      averageWeight: data.physical_attributes?.average_weight_kg || null,
      color: data.physical_attributes?.color || null,
      horns: data.physical_attributes?.horns || null,
      lifespan: data.physical_attributes?.lifespan_years || null,
    },

    utility: {
      primaryUse: data.utility?.primary_use || null,
      adaptability: data.utility?.adaptability || null,
      temperament: data.utility?.temperament || null,
      diseaseResistance: data.utility?.disease_resistance || null,
    },

    environmentDetected: data.environment_detected || false,
    fieldsInfo: {
      terrainSuitability: data.fields_info?.terrain_suitability || null,
      feedRequirements: data.fields_info?.feed_requirements || null,
      housingNeeds: data.fields_info?.housing_needs || null,
    },
  };
}

export function getConfidenceLevel(confidence) {
  if (confidence >= 0.8) return { label: 'High', color: 'text-emerald-500', bg: 'bg-emerald-500' };
  if (confidence >= 0.6) return { label: 'Medium', color: 'text-amber-500', bg: 'bg-amber-500' };
  return { label: 'Low', color: 'text-red-500', bg: 'bg-red-500' };
}

export function formatPercentage(value) {
  if (value === null || value === undefined) return 'N/A';
  return `${(value * 100).toFixed(1)}%`;
}
