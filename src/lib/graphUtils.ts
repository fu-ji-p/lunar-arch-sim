import { EDGES, NODES } from '../data/architectureData'
import type { ArchEdge, ArchNode, Timing, ActivityKind } from '../data/architectureData'
import type { TrackMode } from '../store/useAppStore'

export function getConnectedEdges(nodeId: string): ArchEdge[] {
  return EDGES.filter(e =>
    e.source === nodeId || e.target === nodeId ||
    (e.bidirectional && (e.source === nodeId || e.target === nodeId))
  )
}

export function getDirectNeighbors(nodeId: string): Set<string> {
  const ids = new Set<string>()
  EDGES.forEach(e => {
    if (e.source === nodeId) ids.add(e.target)
    if (e.target === nodeId) ids.add(e.source)
  })
  return ids
}

function bfs(startId: string, direction: 'upstream' | 'downstream' | 'all'): Set<string> {
  const visited = new Set<string>()
  const queue = [startId]
  visited.add(startId)
  while (queue.length > 0) {
    const cur = queue.shift()!
    EDGES.forEach(e => {
      let neighbor: string | null = null
      if (direction === 'downstream' || direction === 'all') {
        if (e.source === cur) neighbor = e.target
        if (e.bidirectional && e.target === cur) neighbor = e.source
      }
      if (direction === 'upstream' || direction === 'all') {
        if (e.target === cur) neighbor = e.source
        if (e.bidirectional && e.source === cur) neighbor = e.target
      }
      if (neighbor && !visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)
      }
    })
  }
  visited.delete(startId)
  return visited
}

export function getHighlightedIds(nodeId: string, mode: TrackMode): {
  nodeIds: Set<string>
  edgeIds: Set<string>
} {
  let nodeIds = new Set<string>()
  const edgeIds = new Set<string>()

  if (mode === 'direct') {
    nodeIds = getDirectNeighbors(nodeId)
    EDGES.forEach(e => {
      if (e.source === nodeId || e.target === nodeId) edgeIds.add(e.id)
    })
  } else {
    nodeIds = bfs(nodeId, mode)
    nodeIds.forEach(nid => {
      EDGES.forEach(e => {
        if ((e.source === nodeId || e.source === nid) &&
            (e.target === nodeId || e.target === nid)) {
          edgeIds.add(e.id)
        }
      })
    })
    // also include direct edges
    EDGES.forEach(e => {
      if (e.source === nodeId || e.target === nodeId) edgeIds.add(e.id)
    })
  }

  return { nodeIds, edgeIds }
}

export function getActivityNodes(activity: ActivityKind): Set<string> {
  return new Set(NODES.filter(n => n.supports.includes(activity)).map(n => n.id))
}

export function getActivityEdges(activity: ActivityKind): Set<string> {
  const actNodes = getActivityNodes(activity)
  const edgeIds = new Set<string>()
  EDGES.forEach(e => {
    if (actNodes.has(e.source) && actNodes.has(e.target)) edgeIds.add(e.id)
  })
  return edgeIds
}

// Which timing values are "active" for a given age index (1-5)
export function isTimingActive(timing: Timing, ageIndex: number): boolean {
  if (timing === 'none') return true
  if (timing === 'earliest') return true       // age 1+
  if (timing === 'early_infra') return ageIndex >= 1
  if (timing === 'mid_long') return ageIndex >= 3
  return true
}

export function getNodeById(id: string): ArchNode | undefined {
  return NODES.find(n => n.id === id)
}

export function getEdgesForNode(nodeId: string): ArchEdge[] {
  return EDGES.filter(e => e.source === nodeId || e.target === nodeId)
}
