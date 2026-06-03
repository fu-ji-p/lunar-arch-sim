import { MARKET, MARKET_REFS } from '../../data/architectureData'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer, LabelList } from 'recharts'

export function MarketTab() {
  const total = MARKET.reduce((s, m) => s + m.sizeOku, 0)
  const colors = ['#3d7ed6', '#e0a800', '#d83933', '#3fa34d', '#9c6b3f']

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-base font-semibold text-white mb-1">市場推定（p.11）</h2>
      <p className="text-gray-500 text-xs mb-1">
        DARPA/LunA-10の Jet Age（2030年代後半〜）を想定した単年推計。1ドル=150円換算。
      </p>
      <p className="text-yellow-400 text-[10px] mb-4 border border-yellow-900 rounded px-2 py-1 bg-yellow-900/20">
        ⚠ 宇宙インフラの開発・製造・整備費は推計対象外。前向きな前提に基づく試算であることに留意。
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {MARKET.map((m, i) => (
          <div key={m.segment} className="bg-gray-900 rounded-lg p-3 border border-gray-800">
            <div className="text-gray-400 text-xs mb-1">{m.label}</div>
            <div className="text-2xl font-bold" style={{ color: colors[i] }}>
              {m.sizeOku.toLocaleString()}
              <span className="text-xs font-normal text-gray-500 ml-1">億円</span>
            </div>
            <div className="text-[10px] text-gray-600 mt-1">
              全体の {Math.round(m.sizeOku / total * 100)}%
            </div>
          </div>
        ))}
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 col-span-3">
          <div className="text-gray-400 text-xs mb-1">合計</div>
          <div className="text-2xl font-bold text-white">
            {total.toLocaleString()}
            <span className="text-xs font-normal text-gray-500 ml-1">億円/年（単年）</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={MARKET.map((m, i) => ({ name: m.label, value: m.sizeOku, fill: colors[i] }))}
          margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} angle={-15} textAnchor="end" />
          <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} unit="億" />
          <Tooltip
            contentStyle={{ background: '#111827', border: '1px solid #374151', fontSize: 11 }}
            formatter={(v) => [`${Number(v).toLocaleString()}億円`, '規模']}
          />
          <Bar dataKey="value" radius={4}>
            {MARKET.map((_, i) => <Cell key={i} fill={colors[i]} />)}
            <LabelList dataKey="value" position="top" style={{ fontSize: 10, fill: '#e2e8f0' }}
              formatter={(v) => `${Number(v).toLocaleString()}`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2">
        <div className="text-[10px] text-gray-500 p-2 bg-gray-900 rounded border border-gray-800">
          <div className="font-semibold text-gray-400 mb-1">推計アプローチ</div>
          {MARKET_REFS.approach}
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2 bg-gray-900 rounded border border-gray-800 text-gray-400">
            <span className="text-gray-300 font-medium">NSR: </span>{MARKET_REFS.nsr}
          </div>
          <div className="p-2 bg-gray-900 rounded border border-gray-800 text-gray-400">
            <span className="text-gray-300 font-medium">PwC: </span>{MARKET_REFS.pwc}
          </div>
        </div>
      </div>
    </div>
  )
}
