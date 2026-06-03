import { create } from 'zustand'
import type {
  Ownership, Competition, Timing, FlowType, ActivityKind, CapabilityCategory,
} from '../data/architectureData'

export type TrackMode = 'direct' | 'upstream' | 'downstream' | 'all'
export type TabId = 'arch' | 'market' | 'scenario' | 'cooperation' | 'frequency' | 'water'

interface AppState {
  selectedNodeId: string | null
  hoveredNodeId: string | null
  hoveredEdgeId: string | null
  trackMode: TrackMode
  activeTab: TabId
  ageIndex: number // 1-5
  activityFilter: ActivityKind | null
  filterOwnership: Ownership[]
  filterCompetition: Competition[]
  filterTiming: Timing[]
  filterCategory: CapabilityCategory[]
  filterFlow: FlowType[]
  searchQuery: string

  setSelectedNode: (id: string | null) => void
  setHoveredNode: (id: string | null) => void
  setHoveredEdge: (id: string | null) => void
  setTrackMode: (m: TrackMode) => void
  setActiveTab: (t: TabId) => void
  setAgeIndex: (n: number) => void
  setActivityFilter: (a: ActivityKind | null) => void
  toggleOwnership: (o: Ownership) => void
  toggleCompetition: (c: Competition) => void
  toggleTiming: (t: Timing) => void
  toggleCategory: (c: CapabilityCategory) => void
  toggleFlow: (f: FlowType) => void
  setSearchQuery: (q: string) => void
  clearFilters: () => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedNodeId: null,
  hoveredNodeId: null,
  hoveredEdgeId: null,
  trackMode: 'direct',
  activeTab: 'arch',
  ageIndex: 5,
  activityFilter: null,
  filterOwnership: [],
  filterCompetition: [],
  filterTiming: [],
  filterCategory: [],
  filterFlow: [],
  searchQuery: '',

  setSelectedNode: (id) => set({ selectedNodeId: id }),
  setHoveredNode: (id) => set({ hoveredNodeId: id }),
  setHoveredEdge: (id) => set({ hoveredEdgeId: id }),
  setTrackMode: (m) => set({ trackMode: m }),
  setActiveTab: (t) => set({ activeTab: t }),
  setAgeIndex: (n) => set({ ageIndex: n }),
  setActivityFilter: (a) => set({ activityFilter: a }),
  toggleOwnership: (o) => set((s) => ({
    filterOwnership: s.filterOwnership.includes(o)
      ? s.filterOwnership.filter(x => x !== o)
      : [...s.filterOwnership, o],
  })),
  toggleCompetition: (c) => set((s) => ({
    filterCompetition: s.filterCompetition.includes(c)
      ? s.filterCompetition.filter(x => x !== c)
      : [...s.filterCompetition, c],
  })),
  toggleTiming: (t) => set((s) => ({
    filterTiming: s.filterTiming.includes(t)
      ? s.filterTiming.filter(x => x !== t)
      : [...s.filterTiming, t],
  })),
  toggleCategory: (c) => set((s) => ({
    filterCategory: s.filterCategory.includes(c)
      ? s.filterCategory.filter(x => x !== c)
      : [...s.filterCategory, c],
  })),
  toggleFlow: (f) => set((s) => ({
    filterFlow: s.filterFlow.includes(f)
      ? s.filterFlow.filter(x => x !== f)
      : [...s.filterFlow, f],
  })),
  setSearchQuery: (q) => set({ searchQuery: q }),
  clearFilters: () => set({
    filterOwnership: [], filterCompetition: [], filterTiming: [],
    filterCategory: [], filterFlow: [], activityFilter: null, searchQuery: '',
  }),
}))
