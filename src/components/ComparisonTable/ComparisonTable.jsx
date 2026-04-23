import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function CompareValue({ label, val1, val2 }) {
  const isDifferent = val1 !== val2;
  return (
    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
      <td className="py-3 px-4 text-sm font-medium text-muted-foreground w-1/3">{label}</td>
      <td className={cn('py-3 px-4 text-sm', isDifferent && 'font-medium text-foreground')}>
        {val1 || '—'}
      </td>
      <td className={cn('py-3 px-4 text-sm', isDifferent && 'font-medium text-foreground')}>
        {val2 || '—'}
      </td>
    </tr>
  );
}

export default function ComparisonTable({ breed1, breed2 }) {
  if (!breed1 || !breed2) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg font-medium">Select two breeds to compare</p>
        <p className="text-sm mt-1">Use the dropdowns above to pick breeds</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50">
            <th className="py-3 px-4 text-left text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Attribute
            </th>
            <th className="py-3 px-4 text-left">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{breed1.breed_name}</span>
                <Badge variant={breed1.animal_type === 'cow' ? 'success' : 'info'} className="text-[10px]">
                  {breed1.animal_type}
                </Badge>
              </div>
            </th>
            <th className="py-3 px-4 text-left">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{breed2.breed_name}</span>
                <Badge variant={breed2.animal_type === 'cow' ? 'success' : 'info'} className="text-[10px]">
                  {breed2.animal_type}
                </Badge>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-primary/5">
            <td colSpan={3} className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-primary">
              General
            </td>
          </tr>
          <CompareValue label="Origin" val1={breed1.origin} val2={breed2.origin} />
          <CompareValue label="Primary Use" val1={breed1.utility?.primary_use} val2={breed2.utility?.primary_use} />
          <CompareValue label="Temperament" val1={breed1.utility?.temperament} val2={breed2.utility?.temperament} />
          <CompareValue label="Adaptability" val1={breed1.utility?.adaptability} val2={breed2.utility?.adaptability} />

          <tr className="bg-primary/5">
            <td colSpan={3} className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-primary">
              Milking Capacity
            </td>
          </tr>
          <CompareValue
            label="Daily Yield"
            val1={breed1.milking_capacity?.daily_yield_liters ? `${breed1.milking_capacity.daily_yield_liters} L` : null}
            val2={breed2.milking_capacity?.daily_yield_liters ? `${breed2.milking_capacity.daily_yield_liters} L` : null}
          />
          <CompareValue
            label="Lactation Period"
            val1={breed1.milking_capacity?.lactation_period_days ? `${breed1.milking_capacity.lactation_period_days} days` : null}
            val2={breed2.milking_capacity?.lactation_period_days ? `${breed2.milking_capacity.lactation_period_days} days` : null}
          />
          <CompareValue
            label="Fat Content"
            val1={breed1.milking_capacity?.fat_content_percent ? `${breed1.milking_capacity.fat_content_percent}%` : null}
            val2={breed2.milking_capacity?.fat_content_percent ? `${breed2.milking_capacity.fat_content_percent}%` : null}
          />
          <CompareValue
            label="Annual Yield"
            val1={breed1.milking_capacity?.annual_yield_liters ? `${breed1.milking_capacity.annual_yield_liters} L` : null}
            val2={breed2.milking_capacity?.annual_yield_liters ? `${breed2.milking_capacity.annual_yield_liters} L` : null}
          />

          <tr className="bg-primary/5">
            <td colSpan={3} className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-primary">
              Physical Attributes
            </td>
          </tr>
          <CompareValue label="Weight" val1={breed1.physical_attributes?.average_weight_kg} val2={breed2.physical_attributes?.average_weight_kg} />
          <CompareValue label="Color" val1={breed1.physical_attributes?.color} val2={breed2.physical_attributes?.color} />
          <CompareValue label="Horns" val1={breed1.physical_attributes?.horns} val2={breed2.physical_attributes?.horns} />
          <CompareValue label="Lifespan" val1={breed1.physical_attributes?.lifespan_years ? `${breed1.physical_attributes.lifespan_years} years` : null} val2={breed2.physical_attributes?.lifespan_years ? `${breed2.physical_attributes.lifespan_years} years` : null} />

          <tr className="bg-primary/5">
            <td colSpan={3} className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-primary">
              Disease & Resistance
            </td>
          </tr>
          <CompareValue label="Disease Resistance" val1={breed1.utility?.disease_resistance} val2={breed2.utility?.disease_resistance} />
        </tbody>
      </table>
    </div>
  );
}
