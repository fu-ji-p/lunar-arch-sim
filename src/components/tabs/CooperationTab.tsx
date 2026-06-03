import { INTL_COOPERATION } from '../../data/architectureData'

export function CooperationTab() {
  const { artemis, ilrs } = INTL_COOPERATION

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-base font-semibold text-white mb-4">国際協調（p.22）</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Artemis */}
        <div className="bg-gray-900 rounded-lg border border-blue-900 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <h3 className="font-semibold text-blue-300 text-sm">{artemis.title}</h3>
          </div>
          <div className="text-[10px] text-gray-500 mb-2">主導: {artemis.lead}</div>

          <div className="mb-3">
            <div className="text-[10px] text-gray-500 mb-1">初期署名国</div>
            <div className="text-xs text-gray-300">{artemis.initial}</div>
          </div>

          <div className="mb-3">
            <div className="text-[10px] text-gray-500 mb-1">現在（2025年3月）</div>
            <div className="text-2xl font-bold text-blue-400">53<span className="text-sm font-normal ml-1">カ国</span></div>
          </div>

          <div>
            <div className="text-[10px] text-gray-500 mb-1">主要ポイント</div>
            <ul className="space-y-1">
              {artemis.points.map((p, i) => (
                <li key={i} className="text-[10px] text-gray-400 flex items-start gap-1">
                  <span className="text-blue-500 mt-0.5">·</span> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ILRS */}
        <div className="bg-gray-900 rounded-lg border border-red-900 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <h3 className="font-semibold text-red-300 text-sm">{ilrs.title}</h3>
          </div>
          <div className="text-[10px] text-gray-500 mb-2">主導: {ilrs.lead}</div>

          <div className="mb-3">
            <div className="text-[10px] text-gray-500 mb-1">初期</div>
            <div className="text-xs text-gray-300">{ilrs.initial}</div>
          </div>

          <div className="mb-3">
            <div className="text-[10px] text-gray-500 mb-1">現在（2025年3月）</div>
            <div className="text-2xl font-bold text-red-400">13<span className="text-sm font-normal ml-1">カ国＋11機関</span></div>
          </div>

          <div>
            <div className="text-[10px] text-gray-500 mb-1">主要ポイント</div>
            <ul className="space-y-1">
              {ilrs.points.map((p, i) => (
                <li key={i} className="text-[10px] text-gray-400 flex items-start gap-1">
                  <span className="text-red-500 mt-0.5">·</span> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Comparison bar */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
        <div className="text-xs text-gray-400 mb-3">署名国数の比較（2025年3月現在）</div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
              <span>アルテミス合意</span>
              <span className="text-blue-400 font-semibold">53カ国</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
              <span>ILRS</span>
              <span className="text-red-400 font-semibold">13カ国</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full" style={{ width: `${13/53*100}%` }} />
            </div>
          </div>
        </div>
        <div className="mt-3 text-[10px] text-gray-500">
          日本はアルテミス合意の初期8カ国に含まれる署名国。宇宙開発を国際的に進めるにあたり、
          協調・競争の枠組み設計が各システムのアーキテクチャに影響を与える。
        </div>
      </div>
    </div>
  )
}
