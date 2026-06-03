import type { Node, Edge } from '@xyflow/react'
import { NODES, EDGES, FLOW_COLOR, FLOW_LABEL, type CapabilityCategory } from '../../data/architectureData'
import type { ArchNode, ArchEdge } from '../../data/architectureData'

// Lane layout: category → column x
export const CATEGORY_ORDER: CapabilityCategory[] = [
  'exploration', 'science', 'communication', 'positioning',
  'power', 'transport', 'resource_isru', 'construction',
  'food', 'habitation', 'life_support',
]

export const LANE_WIDTH = 190
export const NODE_HEIGHT_APPROX = 110
const LANE_GAP = 20
const TOP_OFFSET = 10
const NODE_GAP = 10

export function getLaneX(category: CapabilityCategory): number {
  const idx = CATEGORY_ORDER.indexOf(category)
  return idx * (LANE_WIDTH + LANE_GAP)
}

export function buildFlowNodes(
  highlightedNodeIds: Set<string>,
  _highlightedEdgeIds: Set<string>,
  selectedNodeId: string | null,
  dimAll: boolean,
): Node[] {
  const laneCount: Record<string, number> = {}

  return NODES.map((n: ArchNode) => {
    const cat = n.category
    const idx = laneCount[cat] ?? 0
    laneCount[cat] = idx + 1

    const x = getLaneX(cat)
    const y = TOP_OFFSET + idx * (NODE_HEIGHT_APPROX + NODE_GAP)

    const isSelected = n.id === selectedNodeId
    const highlighted = highlightedNodeIds.has(n.id)
    const dimmed = dimAll && !isSelected && !highlighted

    return {
      id: n.id,
      type: 'systemNode',
      position: { x, y },
      data: {
        ...n,
        highlighted,
        dimmed,
        selected: isSelected,
      },
    }
  })
}

export function buildFlowEdges(
  highlightedEdgeIds: Set<string>,
  selectedNodeId: string | null,
  filterFlow: string[],
): Edge[] {
  const dimAll = selectedNodeId !== null

  return EDGES
    .filter((e: ArchEdge) => filterFlow.length === 0 || filterFlow.includes(e.type))
    .map((e: ArchEdge) => {
      const isHighlighted = highlightedEdgeIds.has(e.id)
      const color = FLOW_COLOR[e.type]

      return {
        id: e.id,
        source: e.source,
        target: e.target,
        type: 'default' as const,
        animated: isHighlighted,
        markerEnd: { type: 'arrowclosed' as const, color },
        markerStart: e.bidirectional ? { type: 'arrowclosed' as const, color } : undefined,
        label: isHighlighted ? FLOW_LABEL[e.type] : undefined,
        labelStyle: { fontSize: 9, fill: color },
        labelBgStyle: { fill: '#111827', fillOpacity: 0.8 },
        style: {
          stroke: color,
          strokeWidth: isHighlighted ? 2.5 : 1,
          opacity: dimAll ? (isHighlighted ? 1 : 0.05) : 0.45,
          transition: 'opacity 150ms, stroke-width 150ms',
        },
        data: { ...e },
      }
    })
}

export const LANE_DEFS = CATEGORY_ORDER.map((cat) => ({
  category: cat,
  x: getLaneX(cat),
  width: LANE_WIDTH,
}))
