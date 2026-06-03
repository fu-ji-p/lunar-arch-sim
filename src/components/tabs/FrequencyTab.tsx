import { FREQUENCY } from '../../data/architectureData'

const FREQ_ITEMS = [
  {
    title: 'ITU-R（唯一の正式国際周波数調整）',
    desc: FREQUENCY.itur,
    color: '#3d7ed6',
    icon: '🌐',
  },
  {
    title: 'SFCG（宇宙機関間の事前調整）',
    desc: FREQUENCY.sfcg,
    color: '#f0883e',
    icon: '🛰',
  },
  {
    title: 'NASA / LSM（民間含む事前調整支援）',
    desc: FREQUENCY.nasa,
    color: '#3fa34d',
    icon: '🚀',
  },
  {
    title: '日本の体制',
    desc: FREQUENCY.japan,
    color: '#e84f8c',
    icon: '🗾',
  },
]

export function FrequencyTab() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-base font-semibold text-white mb-2">月の周波数利用（p.20-21）</h2>
      <div className="text-yellow-400 text-[10px] mb-4 border border-yellow-900 rounded px-2 py-1 bg-yellow-900/20">
        ⚠ 商業利用はWRC-27議題1.15の対象外。商業事業者の参入には独自の調整プロセスが必要。
      </div>

      <div className="space-y-3">
        {FREQ_ITEMS.map(item => (
          <div
            key={item.title}
            className="bg-gray-900 rounded-lg p-4 border border-gray-800"
            style={{ borderLeft: `3px solid ${item.color}` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{item.icon}</span>
              <h3 className="font-semibold text-sm" style={{ color: item.color }}>{item.title}</h3>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-gray-900 rounded-lg p-4 border border-gray-800">
        <div className="text-xs font-semibold text-gray-300 mb-2">周波数調整フロー</div>
        <div className="flex items-center gap-2 flex-wrap text-[10px] text-gray-400">
          <FlowBox text="事業者・宇宙機関" color="#6b7280" />
          <span>→</span>
          <FlowBox text="国内主管庁（日本: 総務省）" color="#e84f8c" />
          <span>→</span>
          <FlowBox text="ITU-R（国際調整）" color="#3d7ed6" />
          <div className="w-full text-center text-gray-600 my-1">+ 宇宙機関間はSFCGで事前調整</div>
          <FlowBox text="SFCG（事前調整推奨リスト）" color="#f0883e" />
          <span>+</span>
          <FlowBox text="NASA/LSMP（民間サポート）" color="#3fa34d" />
        </div>
      </div>
    </div>
  )
}

function FlowBox({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="px-2 py-1 rounded border text-[10px]"
      style={{ borderColor: color + '66', color, background: color + '22' }}
    >
      {text}
    </span>
  )
}
