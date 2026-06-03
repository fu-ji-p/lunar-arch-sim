import { useCallback, useMemo } from 'react'
import {
  ReactFlow, Background, Controls, MiniMap, BackgroundVariant,
  useViewport, Panel,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { SystemNode } from './SystemNode'
import { buildFlowNodes, buildFlowEdges, LANE_DEFS, LANE_WIDTH } from './layoutNodes'
import { useAppStore, type TrackMode } from '../../store/useAppStore'
import { getHighlightedIds, getActivityNodes, getActivityEdges, isTimingActive } from '../../lib/graphUtils'
import { NODES, CATEGORY_LABEL } from '../../data/architectureData'

const TRACK_MODES: { id: TrackMode; label: string }[] = [
  { id: 'direct', label: '直接' },
  { id: 'upstream', label: '上流↑' },
  { id: 'downstream', label: '下流↓' },
  { id: 'all', label: '全接続' },
]

const nodeTypes = { systemNode: SystemNode }

export function GraphCanvas() {
  const {
    selectedNodeId, trackMode, activityFilter,
    filterOwnership, filterCompetition, filterTiming,
    filterCategory, filterFlow, ageIndex,
    setSelectedNode, setTrackMode,
  } = useAppStore()

  const { nodeIds: hlNodes, edgeIds: hlEdges } = useMemo(() => {
    if (activityFilter) {
      return { nodeIds: getActivityNodes(activityFilter), edgeIds: getActivityEdges(activityFilter) }
    }
    if (selectedNodeId) return getHighlightedIds(selectedNodeId, trackMode)
    return { nodeIds: new Set<string>(), edgeIds: new Set<string>() }
  }, [selectedNodeId, trackMode, activityFilter])

  const dimAll = selectedNodeId !== null || activityFilter !== null

  const visibleNodes = useMemo(() => {
    return new Set(
      NODES
        .filter(n => {
          if (filterOwnership.length && !filterOwnership.includes(n.ownership)) return false
          if (filterCompetition.length && !filterCompetition.includes(n.competition)) return false
          if (filterTiming.length && !filterTiming.includes(n.timing)) return false
          if (filterCategory.length && !filterCategory.includes(n.category)) return false
          if (!isTimingActive(n.timing, ageIndex) && n.ownership !== 'precedent_science') return false
          return true
        })
        .map(n => n.id)
    )
  }, [filterOwnership, filterCompetition, filterTiming, filterCategory, ageIndex])

  const nodes = useMemo(() => {
    const all = buildFlowNodes(hlNodes, hlEdges, selectedNodeId, dimAll)
    return all.map(n => ({
      ...n,
      hidden: !visibleNodes.has(n.id),
      data: {
        ...n.data,
        dimmed: (n.data as { dimmed: boolean }).dimmed || !visibleNodes.has(n.id),
      },
    }))
  }, [hlNodes, hlEdges, selectedNodeId, dimAll, visibleNodes])

  const edges = useMemo(() =>
    buildFlowEdges(hlEdges, selectedNodeId, filterFlow),
    [hlEdges, selectedNodeId, filterFlow]
  )

  const onPaneClick = useCallback(() => setSelectedNode(null), [setSelectedNode])

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onPaneClick={onPaneClick}
        fitView
        fitViewOptions={{ padding: 0.05, maxZoom: 0.8 }}
        minZoom={0.05}
        maxZoom={2}
        defaultEdgeOptions={{ type: 'default' }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1f2937" />
        <Controls style={{ background: '#111827', border: '1px solid #1f2937' }} />
        <MiniMap
          style={{ background: '#0a0f1e', border: '1px solid #1f2937' }}
          nodeColor={(n) => {
            const d = n.data as { dimmed?: boolean }
            return d.dimmed ? '#1f2937' : '#3d7ed6'
          }}
        />
        <SwimlaneOverlay />

        {/* Track mode selector — shown when node is selected */}
        {selectedNodeId && (
          <Panel position="top-center">
            <div className="flex items-center gap-1 bg-gray-950 border border-gray-700 rounded-lg px-2 py-1 shadow-lg">
              <span className="text-[10px] text-gray-500 mr-1">追跡:</span>
              {TRACK_MODES.map(m => (
                <button
                  key={m.id}
                  onClick={() => setTrackMode(m.id)}
                  className={`text-[10px] px-2 py-0.5 rounded transition-all ${
                    trackMode === m.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  )
}

// Swimlane headers that follow viewport transform
function SwimlaneOverlay() {
  const { x: vpX, zoom } = useViewport()

  return (
    <Panel position="top-left" style={{ margin: 0, padding: 0, pointerEvents: 'none', overflow: 'visible' }}>
      <div style={{ position: 'relative', width: 0, height: 0, overflow: 'visible' }}>
        {LANE_DEFS.map(({ category, x }) => {
          const screenX = x * zoom + vpX
          const label = CATEGORY_LABEL[category as keyof typeof CATEGORY_LABEL]
          return (
            <div
              key={category}
              style={{
                position: 'absolute',
                left: screenX,
                top: 0,
                width: LANE_WIDTH * zoom,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background: '#0d1424dd',
                  borderBottom: '1px solid #1f2937',
                  borderLeft: '2px solid #2d3748',
                  padding: '2px 6px',
                  fontSize: Math.max(8, 10 * zoom),
                  color: '#9ca3af',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </div>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
