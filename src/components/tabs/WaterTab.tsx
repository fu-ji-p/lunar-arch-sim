import { WATER_STATUS } from '../../data/architectureData'
import { useAppStore } from '../../store/useAppStore'

export function WaterTab() {
  const { setActiveTab, setSelectedNode } = useAppStore()

  const items = [
    {
      title: '存在量',
      status: '不明',
      color: '#f0883e',
      desc: WATER_STATUS.amount,
    },
    {
      title: '分布',
      status: '不明',
      color: '#f0883e',
      desc: WATER_STATUS.distribution,
    },
    {
      title: '形態',
      status: '不明',
      color: '#f0883e',
      desc: WATER_STATUS.form,
    },
  ]

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-base font-semibold text-white mb-2">水資源探査の現状（p.19）</h2>

      <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 mb-4">
        <div className="text-red-300 font-semibold text-xs mb-1">⚠ 重要な前提リスク</div>
        <div className="text-[11px] text-red-200">{WATER_STATUS.summary}</div>
      </div>

      <div className="space-y-3 mb-4">
        {items.map(item => (
          <div key={item.title} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-white">{item.title}</h3>
              <span
                className="text-[10px] px-2 py-0.5 rounded border"
                style={{ color: item.color, borderColor: item.color + '66', background: item.color + '22' }}
              >
                {item.status}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-gray-600">
        <p className="text-[11px] text-gray-300 italic leading-relaxed">"{WATER_STATUS.quote}"</p>
      </div>

      {/* ISRU impact */}
      <div className="mt-4 bg-blue-900/20 rounded-lg p-4 border border-blue-900">
        <div className="text-blue-300 font-semibold text-xs mb-2">アーキテクチャへの影響</div>
        <p className="text-[11px] text-gray-300 leading-relaxed mb-2">
          水資源の存在量・形態が不確定なため、ISRUシステムによる推薬生産・生命維持への水供給は
          現時点で仮説的前提に基づく。LUPEX・TSUKIMI・LDAによる探査データが、
          ISRUの実現可能性を左右する重要なマイルストーンとなる。
        </p>
        <button
          className="text-[10px] text-blue-400 hover:text-blue-300 underline"
          onClick={() => {
            setSelectedNode('isru')
            setActiveTab('arch')
          }}
        >
          → ISRUノードの詳細を見る
        </button>
      </div>
    </div>
  )
}
