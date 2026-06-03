import { useState } from 'react'
import { GraphCanvas } from './components/graph/GraphCanvas'
import { FilterPanel } from './components/panels/FilterPanel'
import { NodeDetailPanel } from './components/panels/NodeDetailPanel'
import { MarketTab } from './components/tabs/MarketTab'
import { ScenarioTab } from './components/tabs/ScenarioTab'
import { CooperationTab } from './components/tabs/CooperationTab'
import { FrequencyTab } from './components/tabs/FrequencyTab'
import { WaterTab } from './components/tabs/WaterTab'
import { useAppStore, type TabId } from './store/useAppStore'
import { NODES } from './data/architectureData'

const TABS: { id: TabId; label: string }[] = [
  { id: 'arch', label: 'アーキテクチャ' },
  { id: 'market', label: '市場推定' },
  { id: 'scenario', label: '貢献シナリオ' },
  { id: 'cooperation', label: '国際協調' },
  { id: 'frequency', label: '周波数' },
  { id: 'water', label: '水資源' },
]

function DisclaimerModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-lg mx-4 shadow-2xl">
        <div className="text-yellow-400 text-lg font-bold mb-3">⚠ ご利用にあたっての注意</div>
        <div className="space-y-2 text-[11px] text-gray-300">
          <p>本ツールは内閣府 宇宙開発戦略推進事務局「月面活動に関するアーキテクチャの検討について」
            （資料5-2, 2025年3月25日）を元に作成したインタラクティブ可視化ツールです。</p>
          <ul className="space-y-1 pl-4 border-l-2 border-yellow-700">
            <li>・ 本図は「現時点における検討状況の報告」であり、協調/競争・実装時期は<strong>仮説</strong>です。</li>
            <li>・「観光」分野はビジネスモデル・エビデンスを含め十分な議論が行われたわけではありません（p.8注記）。</li>
            <li>・ 市場推定は前向きな前提に基づく単年推計で、宇宙インフラ開発・製造・整備費は対象外（p.11）。</li>
            <li>・ 月の水資源の存在量・分布・形態は未確認であり、ISRUシナリオには不確実性があります。</li>
          </ul>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-sm transition-colors"
        >
          理解しました
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const { activeTab, setActiveTab, searchQuery, setSearchQuery, setSelectedNode } = useAppStore()
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [showSearch, setShowSearch] = useState(false)

  const handleSearch = (q: string) => {
    setSearchQuery(q)
    if (q.trim()) {
      const node = NODES.find(n =>
        n.label.includes(q) ||
        n.functions.some(f => f.label.includes(q)) ||
        (n.note && n.note.includes(q))
      )
      if (node) setSelectedNode(node.id)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#0a0f1e] text-[#e2e8f0] overflow-hidden">
      {showDisclaimer && <DisclaimerModal onClose={() => setShowDisclaimer(false)} />}

      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-950">
        <div className="flex items-center gap-3">
          <span className="text-xl">🌙</span>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">月面活動アーキテクチャ・シミュレータ</h1>
            <p className="text-[10px] text-gray-500">内閣府 宇宙開発戦略推進事務局 資料5-2（2025年3月25日）</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {showSearch && (
            <input
              autoFocus
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              onBlur={() => { if (!searchQuery) setShowSearch(false) }}
              placeholder="ノード名・機能名で検索..."
              className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white outline-none focus:border-blue-500 w-52"
            />
          )}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="px-2 py-1 text-[11px] text-gray-400 hover:text-white border border-gray-700 rounded hover:border-gray-500 transition-colors"
            title="検索"
          >
            🔍
          </button>
          <button
            onClick={() => setShowDisclaimer(true)}
            className="px-2 py-1 text-[11px] text-yellow-400 hover:text-yellow-300 border border-yellow-900 rounded hover:border-yellow-700 transition-colors"
          >
            注意事項
          </button>
        </div>
      </header>

      {/* Tab bar */}
      <div className="flex-shrink-0 flex border-b border-gray-800 bg-gray-950 px-2">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
              activeTab === t.id
                ? 'border-blue-500 text-blue-300'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'arch' ? (
          <div className="flex h-full">
            {/* Left sidebar */}
            <div className="w-52 flex-shrink-0 border-r border-gray-800 bg-gray-950 overflow-hidden">
              <FilterPanel />
            </div>

            {/* Graph */}
            <div className="flex-1 overflow-hidden">
              <GraphCanvas />
            </div>

            {/* Right sidebar */}
            <div className="w-72 flex-shrink-0 border-l border-gray-800 bg-gray-950 overflow-hidden">
              <NodeDetailPanel />
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto h-full bg-gray-950">
            {activeTab === 'market' && <MarketTab />}
            {activeTab === 'scenario' && <ScenarioTab />}
            {activeTab === 'cooperation' && <CooperationTab />}
            {activeTab === 'frequency' && <FrequencyTab />}
            {activeTab === 'water' && <WaterTab />}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="flex-shrink-0 px-4 py-1.5 border-t border-gray-800 bg-gray-950 text-[9px] text-gray-600 flex items-center justify-between">
        <span>
          出典: 内閣府 宇宙開発戦略推進事務局「月面活動に関するアーキテクチャの検討について」資料5-2（2025年3月25日）
        </span>
        <span className="text-yellow-700">
          ⚠ 協調/競争・実装時期は仮説 / 市場推定はインフラ費除く単年推計 / 観光は議論未了
        </span>
      </footer>
    </div>
  )
}
