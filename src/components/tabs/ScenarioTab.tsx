import { AGES } from '../../data/architectureData'
import { SCENARIO_DATA } from '../../data/scenario'
import { useAppStore } from '../../store/useAppStore'

const AGE_COLORS = ['#6b7280', '#3d7ed6', '#f0883e', '#d83933', '#9c6b3f']

export function ScenarioTab() {
  const { ageIndex, setAgeIndex } = useAppStore()

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-white">貢献シナリオ（p.14）</h2>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>時代:</span>
          {AGES.map((a, i) => (
            <button
              key={a.id}
              onClick={() => setAgeIndex(a.id)}
              className={`px-2 py-0.5 rounded text-[10px] border transition-all ${
                ageIndex === a.id ? 'text-white border-current' : 'opacity-40 border-gray-700'
              }`}
              style={{ color: ageIndex === a.id ? AGE_COLORS[i] : undefined,
                borderColor: ageIndex === a.id ? AGE_COLORS[i] : undefined }}
            >
              {a.name}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline header */}
      <div className="min-w-[900px]">
        <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] gap-0.5 mb-2">
          <div />
          {AGES.map((a, i) => (
            <div
              key={a.id}
              className="text-center text-[10px] py-1 rounded font-semibold"
              style={{ background: ageIndex >= a.id ? AGE_COLORS[i] + '33' : '#1f2937',
                color: AGE_COLORS[i] }}
            >
              {a.name}<br />
              <span className="font-normal text-gray-400">{a.period}</span>
            </div>
          ))}
        </div>

        {SCENARIO_DATA.map(item => (
          <div
            key={item.category}
            className="grid grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] gap-0.5 mb-0.5"
          >
            <div className="flex items-center text-[10px] font-semibold text-gray-300 pr-2 justify-end">
              {item.label}
            </div>
            {item.phases.map((phase, i) => (
              <div
                key={i}
                className={`p-2 rounded text-[10px] leading-tight transition-all ${
                  ageIndex === i + 1 ? 'ring-1 ring-blue-500' : ''
                }`}
                style={{
                  background: ageIndex >= i + 1 ? AGE_COLORS[i] + '22' : '#0f1724',
                  color: ageIndex >= i + 1 ? '#e2e8f0' : '#4b5563',
                  borderLeft: `2px solid ${ageIndex >= i + 1 ? AGE_COLORS[i] : '#1f2937'}`,
                }}
              >
                {phase}
              </div>
            ))}
          </div>
        ))}

        {/* Age detail row */}
        <div className="mt-4 p-3 bg-gray-900 rounded border border-gray-800">
          <div className="text-xs font-semibold text-blue-300 mb-2">
            現在の選択: {AGES[ageIndex - 1].name}
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-400">
            <div><span className="text-gray-300">ISECG:</span> {AGES[ageIndex - 1].isecgPhase}</div>
            <div><span className="text-gray-300">LunA-10時代:</span> {AGES[ageIndex - 1].lunaAge}</div>
            <div><span className="text-gray-300">人数:</span> {AGES[ageIndex - 1].population}</div>
            <div><span className="text-gray-300">活動者:</span> {AGES[ageIndex - 1].actors}</div>
            <div><span className="text-gray-300">拠点:</span> {AGES[ageIndex - 1].hub}</div>
            <div><span className="text-gray-300">滞在:</span> {AGES[ageIndex - 1].stay}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
