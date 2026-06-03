import { useAppStore } from '../../store/useAppStore'
import {
  OWNERSHIP_LABEL, COMPETITION_LABEL, TIMING_LABEL, CATEGORY_LABEL, FLOW_LABEL, ACTIVITY_LABEL,
  OWNERSHIP_COLOR, COMPETITION_COLOR, TIMING_COLOR, FLOW_COLOR,
  type Ownership, type Competition, type Timing, type CapabilityCategory, type FlowType, type ActivityKind,
} from '../../data/architectureData'
import { AGES } from '../../data/architectureData'

const OWNERSHIPS: Ownership[] = ['overseas', 'japan', 'precedent_science']
const COMPETITIONS: Competition[] = ['competition', 'partial', 'cooperation']
const TIMINGS: Timing[] = ['earliest', 'early_infra', 'mid_long']
const CATEGORIES: CapabilityCategory[] = [
  'exploration', 'science', 'communication', 'positioning', 'power',
  'transport', 'resource_isru', 'construction', 'food', 'habitation', 'life_support',
]
const FLOWS: FlowType[] = [
  'comm', 'positioning', 'power', 'material', 'water', 'gas',
  'cargo', 'resource', 'sample', 'food', 'co2', 'resupply', 'mobility',
]
const ACTIVITIES: ActivityKind[] = ['science_unmanned', 'science_manned', 'propellant', 'tourism']

function FilterChip({ label, color, active, onClick }: {
  label: string; color?: string; active: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[10px] px-1.5 py-0.5 rounded border transition-all duration-100 ${
        active ? 'opacity-100' : 'opacity-40 hover:opacity-70'
      }`}
      style={{
        borderColor: color || '#4b5563',
        color: active ? (color || '#e2e8f0') : '#9ca3af',
        background: active ? (color ? color + '22' : '#1f2937') : 'transparent',
      }}
    >
      {label}
    </button>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{title}</div>
      <div className="flex flex-wrap gap-1">{children}</div>
    </div>
  )
}

export function FilterPanel() {
  const {
    ageIndex, setAgeIndex,
    activityFilter, setActivityFilter,
    filterOwnership, toggleOwnership,
    filterCompetition, toggleCompetition,
    filterTiming, toggleTiming,
    filterCategory, toggleCategory,
    filterFlow, toggleFlow,
    clearFilters,
  } = useAppStore()

  const hasFilters = filterOwnership.length + filterCompetition.length + filterTiming.length +
    filterCategory.length + filterFlow.length > 0 || activityFilter !== null

  return (
    <div className="p-3 overflow-y-auto h-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-300">フィルタ・凡例</span>
        {hasFilters && (
          <button onClick={clearFilters} className="text-[10px] text-red-400 hover:text-red-300">リセット</button>
        )}
      </div>

      {/* Age slider */}
      <div className="mb-4">
        <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">時代スライダー</div>
        <input
          type="range" min={1} max={5} value={ageIndex}
          onChange={e => setAgeIndex(Number(e.target.value))}
          className="w-full accent-blue-500"
        />
        <div className="mt-1 p-2 bg-gray-900 rounded text-[10px]">
          <div className="text-blue-300 font-semibold">{AGES[ageIndex - 1].name}</div>
          <div className="text-gray-400">{AGES[ageIndex - 1].period}</div>
          <div className="text-gray-400 mt-0.5">人数: {AGES[ageIndex - 1].population}</div>
          <div className="text-gray-400">拠点: {AGES[ageIndex - 1].hub}</div>
          <div className="text-gray-400">滞在: {AGES[ageIndex - 1].stay}</div>
        </div>
      </div>

      {/* Activity scenario */}
      <Section title="活動シナリオ">
        {ACTIVITIES.map(a => (
          <FilterChip
            key={a}
            label={ACTIVITY_LABEL[a]}
            color="#3d7ed6"
            active={activityFilter === a}
            onClick={() => setActivityFilter(activityFilter === a ? null : a)}
          />
        ))}
      </Section>

      {/* Ownership */}
      <Section title="帰属">
        {OWNERSHIPS.map(o => (
          <FilterChip
            key={o} label={OWNERSHIP_LABEL[o]}
            color={OWNERSHIP_COLOR[o]}
            active={filterOwnership.includes(o)}
            onClick={() => toggleOwnership(o)}
          />
        ))}
      </Section>

      {/* Competition */}
      <Section title="協調・競争">
        {COMPETITIONS.map(c => (
          <FilterChip
            key={c} label={COMPETITION_LABEL[c]}
            color={COMPETITION_COLOR[c]}
            active={filterCompetition.includes(c)}
            onClick={() => toggleCompetition(c)}
          />
        ))}
      </Section>

      {/* Timing */}
      <Section title="実装時期">
        {TIMINGS.map(t => (
          <FilterChip
            key={t} label={TIMING_LABEL[t]}
            color={TIMING_COLOR[t]}
            active={filterTiming.includes(t)}
            onClick={() => toggleTiming(t)}
          />
        ))}
      </Section>

      {/* Category */}
      <Section title="ケーパビリティ">
        {CATEGORIES.map(c => (
          <FilterChip
            key={c} label={CATEGORY_LABEL[c]}
            active={filterCategory.includes(c)}
            onClick={() => toggleCategory(c)}
          />
        ))}
      </Section>

      {/* Flow */}
      <Section title="フロー種別">
        {FLOWS.map(f => (
          <FilterChip
            key={f} label={FLOW_LABEL[f]}
            color={FLOW_COLOR[f]}
            active={filterFlow.includes(f)}
            onClick={() => toggleFlow(f)}
          />
        ))}
      </Section>
    </div>
  )
}
