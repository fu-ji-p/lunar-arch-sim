import {
  NODES, EDGES, AGES, MARKET, FUND_ITEMS, TECH_STRATEGY, ACTIVITIES,
  OWNERSHIP_LABEL, COMPETITION_LABEL, TIMING_LABEL, FLOW_LABEL, FLOW_COLOR,
  CATEGORY_LABEL,
} from '../../data/architectureData'
import { useAppStore } from '../../store/useAppStore'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'

export function NodeDetailPanel() {
  const { selectedNodeId, setSelectedNode } = useAppStore()
  const node = selectedNodeId ? NODES.find(n => n.id === selectedNodeId) : null

  if (!node) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-xs p-4 text-center">
        <div>
          <div className="text-2xl mb-2">🌙</div>
          <div>ノードをクリックすると<br />詳細情報を表示します</div>
        </div>
      </div>
    )
  }

  const inEdges = EDGES.filter(e => e.target === node.id)
  const outEdges = EDGES.filter(e => e.source === node.id)

  const ageEntry = AGES.find(a => {
    if (node.timing === 'earliest' || node.timing === 'none') return a.id === 1
    if (node.timing === 'early_infra') return a.id === 2
    if (node.timing === 'mid_long') return a.id === 3
    return a.id === 1
  })

  const marketEntry = node.marketSegment ? MARKET.find(m => m.segment === node.marketSegment) : null
  const marketData = MARKET.map(m => ({
    name: m.label, value: m.sizeOku,
    fill: m.segment === node.marketSegment ? '#3d7ed6' : '#1f2937',
  }))

  const fundItems = node.fundItemIds
    ? FUND_ITEMS.filter(f => node.fundItemIds!.includes(f.id))
    : []

  const techItems: string[] = []
  if (node.techStrategyKeys) {
    node.techStrategyKeys.forEach(k => {
      const items = TECH_STRATEGY[k]
      if (items) techItems.push(...items)
    })
  }

  return (
    <div className="overflow-y-auto h-full text-[11px]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-semibold text-white text-sm leading-tight">{node.label}</div>
            <div className="text-gray-400 mt-0.5">
              {CATEGORY_LABEL[node.category]}
              {node.subCategory && ` / ${node.subCategory}`}
            </div>
          </div>
          <button
            onClick={() => setSelectedNode(null)}
            className="text-gray-500 hover:text-gray-300 text-lg leading-none"
          >×</button>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge color="#9aa4b2">{OWNERSHIP_LABEL[node.ownership]}</Badge>
          {node.competition !== 'none' && (
            <Badge color={getBadgeColor('competition', node.competition)}>{COMPETITION_LABEL[node.competition]}</Badge>
          )}
          {node.timing !== 'none' && (
            <Badge color={getBadgeColor('timing', node.timing)}>{TIMING_LABEL[node.timing]}</Badge>
          )}
        </div>
      </div>

      <div className="p-3 space-y-4">
        {/* Note */}
        {node.note && (
          <div className="text-gray-400 italic border-l-2 border-gray-700 pl-2">{node.note}</div>
        )}

        {/* Functions */}
        <Section title="機能（ポート）">
          <ul className="space-y-1">
            {node.functions.map(fn => (
              <li key={fn.id} className="text-gray-300 flex items-start gap-1">
                <span className="text-blue-500 mt-0.5">▸</span>
                {fn.label}
              </li>
            ))}
          </ul>
        </Section>

        {/* Connections */}
        <Section title="接続フロー">
          {inEdges.length > 0 && (
            <div className="mb-2">
              <div className="text-gray-500 text-[10px] mb-1">← 入力</div>
              {inEdges.map(e => {
                const src = NODES.find(n => n.id === e.source)
                return (
                  <EdgeRow key={e.id} label={FLOW_LABEL[e.type]} color={FLOW_COLOR[e.type]}
                    peer={src?.label || e.source} note={e.note} />
                )
              })}
            </div>
          )}
          {outEdges.length > 0 && (
            <div>
              <div className="text-gray-500 text-[10px] mb-1">→ 出力</div>
              {outEdges.map(e => {
                const tgt = NODES.find(n => n.id === e.target)
                return (
                  <EdgeRow key={e.id} label={FLOW_LABEL[e.type]} color={FLOW_COLOR[e.type]}
                    peer={tgt?.label || e.target} note={e.note} />
                )
              })}
            </div>
          )}
        </Section>

        {/* Supports activities */}
        <Section title="支援する月面活動 (p.8)">
          <div className="flex flex-wrap gap-1">
            {ACTIVITIES.map(a => {
              const active = node.supports.includes(a.id)
              return (
                <span
                  key={a.id}
                  className={`px-1.5 py-0.5 rounded text-[10px] border ${
                    active ? 'border-blue-500 text-blue-300 bg-blue-900/30' : 'border-gray-700 text-gray-600'
                  }`}
                >
                  {a.label}
                </span>
              )
            })}
          </div>
          {node.supports.map(sid => {
            const act = ACTIVITIES.find(a => a.id === sid)
            return act ? (
              <div key={sid} className="mt-1 text-gray-500 text-[10px] pl-1 border-l border-gray-700">
                <span className="text-gray-300">{act.label}:</span> {act.desc}
              </div>
            ) : null
          })}
        </Section>

        {/* Market */}
        {marketEntry && (
          <Section title={`市場規模 (p.11) — ${marketEntry.label}`}>
            <div className="text-white font-semibold text-base mb-2">
              約{marketEntry.sizeOku.toLocaleString()}億円/年
              <span className="text-gray-500 text-[10px] ml-1">（Jet Age想定・単年）</span>
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <BarChart data={marketData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#6b7280' }} />
                <YAxis tick={{ fontSize: 8, fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{ background: '#111827', border: '1px solid #374151', fontSize: 10 }}
                  formatter={(v) => [`${Number(v).toLocaleString()}億円`, '規模']}
                />
                <Bar dataKey="value" radius={2}>
                  {marketData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Section>
        )}

        {/* Japan assets */}
        {node.japanAssets && node.japanAssets.length > 0 && (
          <Section title="日本の独自技術・アセット (p.12)">
            <ul className="space-y-1">
              {node.japanAssets.map((a, i) => (
                <li key={i} className="text-gray-300 flex items-start gap-1">
                  <span className="text-yellow-500">★</span> {a}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Tech strategy */}
        {techItems.length > 0 && (
          <Section title="宇宙技術戦略 要素技術 (p.22-24)">
            <ul className="space-y-0.5">
              {techItems.map((t, i) => (
                <li key={i} className="text-gray-400 flex items-start gap-1">
                  <span className="text-gray-600">·</span> {t}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Fund items */}
        {fundItems.length > 0 && (
          <Section title="宇宙戦略基金 (p.25-26)">
            {fundItems.map(f => (
              <div key={f.id} className="mb-2 p-2 bg-gray-900 rounded border border-gray-800">
                <div className="text-white font-medium">{f.title}</div>
                <div className="text-gray-400 mt-0.5">{f.ministry}省庁 / {f.budgetOku}億円</div>
                <div className="text-gray-500 mt-0.5">{f.desc}</div>
              </div>
            ))}
          </Section>
        )}

        {/* Age */}
        {ageEntry && node.timing !== 'none' && (
          <Section title={`時代での立ち上がり (p.10) — ${TIMING_LABEL[node.timing]}`}>
            <div className="p-2 bg-gray-900 rounded border border-gray-800">
              <div className="text-blue-300 font-semibold">{ageEntry.name} ({ageEntry.period})</div>
              <div className="text-gray-400 mt-1">{ageEntry.lunaAge}</div>
              <div className="text-gray-400">人数: {ageEntry.population}</div>
              <div className="text-gray-400">活動者: {ageEntry.actors}</div>
            </div>
          </Section>
        )}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{title}</div>
      {children}
    </div>
  )
}

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="text-[9px] px-1.5 py-0.5 rounded border"
      style={{ borderColor: color + '66', color, background: color + '22' }}
    >
      {children}
    </span>
  )
}

function EdgeRow({ label, color, peer, note }: { label: string; color: string; peer: string; note?: string }) {
  return (
    <div className="flex items-start gap-1.5 mb-1 text-[10px]">
      <span className="px-1 py-0.5 rounded text-[9px]" style={{ background: color + '33', color }}>{label}</span>
      <span className="text-gray-300">{peer}</span>
      {note && <span className="text-gray-500 italic">({note})</span>}
    </div>
  )
}

function getBadgeColor(type: 'competition' | 'timing', value: string): string {
  if (type === 'competition') {
    const map: Record<string, string> = { competition: '#d83933', partial: '#f0883e', cooperation: '#1b3a6b' }
    return map[value] || '#9aa4b2'
  }
  const map: Record<string, string> = { earliest: '#d83933', early_infra: '#f0883e', mid_long: '#3d7ed6' }
  return map[value] || '#9aa4b2'
}
