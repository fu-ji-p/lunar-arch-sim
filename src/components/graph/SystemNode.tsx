import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import {
  OWNERSHIP_COLOR, COMPETITION_COLOR, TIMING_COLOR,
  COMPETITION_LABEL, TIMING_LABEL,
  type ArchNode,
} from '../../data/architectureData'
import { useAppStore } from '../../store/useAppStore'

interface SystemNodeData extends ArchNode {
  highlighted: boolean
  dimmed: boolean
  selected: boolean
}

export const SystemNode = memo(({ data, id }: NodeProps) => {
  const d = data as unknown as SystemNodeData
  const { setSelectedNode, selectedNodeId, setHoveredNode } = useAppStore()

  const isSelected = selectedNodeId === id
  const isPrecedent = d.ownership === 'precedent_science'

  const ownerColor = OWNERSHIP_COLOR[d.ownership]
  const compColor = d.competition !== 'none' ? COMPETITION_COLOR[d.competition] : null
  const timColor = d.timing !== 'none' ? TIMING_COLOR[d.timing] : null

  const baseOpacity = d.dimmed ? 'opacity-20' : 'opacity-100'
  const ring = isSelected
    ? 'ring-2 ring-white shadow-[0_0_12px_2px_rgba(255,255,255,0.4)]'
    : d.highlighted
      ? 'ring-1 ring-blue-400 shadow-[0_0_8px_1px_rgba(61,126,214,0.5)]'
      : ''

  return (
    <div
      className={`relative transition-all duration-150 ${baseOpacity} ${ring} cursor-pointer select-none`}
      style={{
        background: '#111827',
        border: `2px solid ${isPrecedent ? '#e84f8c' : ownerColor}`,
        borderRadius: 6,
        minWidth: 160,
        maxWidth: 200,
        padding: '6px 8px',
        boxShadow: isPrecedent ? `0 0 0 1px #e84f8c40` : undefined,
      }}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedNode(isSelected ? null : id)
      }}
      onMouseEnter={() => setHoveredNode(id)}
      onMouseLeave={() => setHoveredNode(null)}
    >
      {/* Source handle (left) */}
      <Handle type="source" position={Position.Left} style={{ opacity: 0, pointerEvents: 'none' }} />
      <Handle type="target" position={Position.Right} style={{ opacity: 0, pointerEvents: 'none' }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: 'none' }} />
      <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: 'none' }} />

      {/* Ownership dot */}
      <div className="flex items-start justify-between mb-1 gap-1">
        <span className="text-[10px] font-semibold leading-tight text-white flex-1">{d.label}</span>
        <span
          className="w-2.5 h-2.5 rounded-full mt-0.5 flex-shrink-0"
          style={{ background: ownerColor }}
          title={d.ownership}
        />
      </div>

      {/* Badges row */}
      <div className="flex flex-wrap gap-1 mb-1.5">
        {compColor && d.competition !== 'none' && (
          <span
            className="text-[9px] px-1 py-0.5 rounded font-medium"
            style={{ background: compColor + '33', color: compColor, border: `1px solid ${compColor}66` }}
          >
            {COMPETITION_LABEL[d.competition]}
          </span>
        )}
        {timColor && d.timing !== 'none' && (
          <span
            className="text-[9px] px-1 py-0.5 rounded font-medium"
            style={{ background: timColor + '22', color: timColor, border: `1px solid ${timColor}44` }}
          >
            {TIMING_LABEL[d.timing]}
          </span>
        )}
      </div>

      {/* Functions */}
      <ul className="space-y-0.5">
        {d.functions.map((fn) => (
          <li
            key={fn.id}
            className="text-[9px] text-gray-300 pl-2 border-l border-gray-600 leading-tight"
          >
            {fn.label}
          </li>
        ))}
      </ul>
    </div>
  )
})

SystemNode.displayName = 'SystemNode'
