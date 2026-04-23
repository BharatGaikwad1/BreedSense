/**
 * Formats the real API response from the BreedLens HuggingFace API.
 *
 * Real response shape (from /predict):
 *   breed_name, animal_type, confidence, description, origin (string or object),
 *   physical_traits { coat_color, body_size, hump, distinctive_features[] },
 *   milking_capacity { avg_milk_per_lactation_litres, range_litres, lactation_length_days,
 *                      avg_daily_yield_litres, fat_percentage, snf_percentage, peak_daily_yield_litres },
 *   temperament, primary_use, secondary_use, conservation_status,
 *   top5_predictions[], inference_time_ms, model_used
 */

export function formatResult(data) {
  // Handle origin — can be a string or an object { state, region, district }
  let originStr = 'Unknown';
  if (typeof data.origin === 'string') {
    originStr = data.origin;
  } else if (data.origin && typeof data.origin === 'object') {
    originStr = [data.origin.state, data.origin.region].filter(Boolean).join(', ');
  }

  // Milking capacity — map real API field names
  const mc = data.milking_capacity || {};

  // Physical traits — map real API field names
  const pt = data.physical_traits || data.physical_attributes || {};

  return {
    breedName: data.breed_name || 'Unknown Breed',
    animalType: data.animal_type || 'unknown',
    confidence: typeof data.confidence === 'number' ? data.confidence : 0,
    origin: originStr,
    description: data.description || 'No description available.',

    milkingCapacity: {
      dailyYield: mc.avg_daily_yield_litres ?? mc.daily_yield_liters ?? null,
      lactationPeriod: mc.lactation_length_days ?? mc.lactation_period_days ?? null,
      fatContent: mc.fat_percentage ?? mc.fat_content_percent ?? null,
      annualYield: mc.avg_milk_per_lactation_litres ?? mc.annual_yield_liters ?? null,
      peakYield: mc.peak_daily_yield_litres ?? null,
      range: mc.range_litres ?? null,
      snf: mc.snf_percentage ?? null,
    },

    physicalAttributes: {
      averageWeight: pt.body_size || pt.average_weight_kg || null,
      color: pt.coat_color || pt.color || null,
      horns: pt.distinctive_features
        ? pt.distinctive_features.join('; ')
        : pt.horns || null,
      lifespan: pt.lifespan_years || null,
      hump: pt.hump || null,
    },

    utility: {
      primaryUse: data.primary_use || data.utility?.primary_use || null,
      secondaryUse: data.secondary_use || null,
      adaptability: data.utility?.adaptability || null,
      temperament: data.temperament || data.utility?.temperament || null,
      diseaseResistance: data.utility?.disease_resistance || null,
      conservationStatus: data.conservation_status || null,
    },

    // Model info from real API
    top5: data.top5_predictions || [],
    inferenceTime: data.inference_time_ms || null,
    modelUsed: data.model_used || null,

    // Legacy fields (keep for backward compat with original spec)
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
