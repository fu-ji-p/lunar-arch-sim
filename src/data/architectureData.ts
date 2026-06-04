/**
 * 月面活動アーキテクチャ・シミュレータ シードデータ
 * 出典: 内閣府 宇宙開発戦略推進事務局「月面活動に関するアーキテクチャの検討について」
 *       （資料5-2, 2025年3月25日）p.15「月面活動に関するアーキテクチャ案」を中心に、
 *       報告書全体（時代区分 p.10 / 市場推定 p.11 / 貢献シナリオ p.14 / 宇宙技術戦略 p.22-24 /
 *       宇宙戦略基金 p.25-26 / 国際協調 p.22 / 周波数 p.20-21 / 水資源 p.19）を横断的に構造化。
 *
 * 注意:
 *  - ノード/機能(ポート)はアーキテクチャ図を忠実に転記したもの。
 *  - エッジ（接続）は図中のフロー（通信/送電/資材/水/酸素・水素/貨物/資源/サンプル/食料/CO2/補給/移動）を
 *    論理的に再構成したもの。実装前に必ず原図(p.15)と突き合わせ、過不足を補正すること（仕様書 §7.4 参照）。
 *  - これらは「現時点における検討状況」であり仮説（協調/競争・時期）を含む点を UI 上でも明示すること。
 */

// ============================================================
// 1. 列挙型（凡例に対応）
// ============================================================

/** ケーパビリティ大区分（図の左帯・宇宙技術戦略 p.22-24 と対応） */
export type CapabilityCategory =
  | 'exploration'       // 探査
  | 'science'           // 科学
  | 'communication'     // 通信
  | 'positioning'       // 測位
  | 'power'             // 電力
  | 'transport'         // 輸送
  | 'resource_isru'     // 資源(ISRU)
  | 'construction'      // 建設
  | 'food'              // 食料
  | 'habitation'        // 居住
  | 'life_support';     // 生命維持

/** 凡例: システムの帰属 */
export type Ownership =
  | 'overseas'           // 海外での想定システム（濃紺）
  | 'japan'              // 日本で検討中のシステム等（水色）
  | 'precedent_science'; // 先行して実施する科学・探査活動（ピンク枠）

/** 凡例: 協調・競争の仮説 */
export type Competition =
  | 'cooperation'  // 協調
  | 'partial'      // 一部競争
  | 'competition'  // 競争
  | 'none';

/** 凡例: 実装・稼働時期の仮説 */
export type Timing =
  | 'earliest'     // 最早期対応
  | 'early_infra'  // 早期対応（基盤インフラ）
  | 'mid_long'     // 中長期
  | 'none';

/** エッジ（フロー）の種別。色分け・凡例・フィルタに使用 */
export type FlowType =
  | 'comm'        // 通信（データ共有含む）
  | 'positioning' // 測位
  | 'power'       // 送電
  | 'material'    // 資材・加工資材・建材・資材/機器
  | 'water'       // 水
  | 'gas'         // 酸素・水素
  | 'cargo'       // 貨物
  | 'resource'    // 資源
  | 'sample'      // サンプル
  | 'food'        // 食料
  | 'co2'         // 二酸化炭素
  | 'resupply'    // 補給
  | 'mobility';   // 移動（人・貨物の輸送）

/** 想定される月面活動（4分野, p.8） */
export type ActivityKind =
  | 'science_unmanned' // 科学探査（無人）
  | 'science_manned'   // 科学探査（有人）
  | 'propellant'       // 推薬供給
  | 'tourism';         // 観光

/** LunA-10 を参考にした市場推定の5分野（p.11） */
export type MarketSegment =
  | 'transport_mobility' // 輸送・モビリティ
  | 'comm_nav'           // 通信・測位
  | 'power'              // 電力
  | 'construction_robotics' // 建設・ロボティクス
  | 'isru';              // ISRU

// ============================================================
// 2. メタ情報の表示用ラベル（日本語）
// ============================================================

export const CATEGORY_LABEL: Record<CapabilityCategory, string> = {
  exploration: '探査',
  science: '科学',
  communication: '通信',
  positioning: '測位',
  power: '電力',
  transport: '輸送',
  resource_isru: '資源（ISRU）',
  construction: '建設',
  food: '食料',
  habitation: '居住',
  life_support: '生命維持',
};

export const OWNERSHIP_LABEL: Record<Ownership, string> = {
  overseas: '海外での想定システム',
  japan: '日本で検討中のシステム等',
  precedent_science: '先行して実施する科学・探査活動',
};

export const COMPETITION_LABEL: Record<Competition, string> = {
  cooperation: '協調',
  partial: '一部競争',
  competition: '競争',
  none: '—',
};

export const TIMING_LABEL: Record<Timing, string> = {
  earliest: '最早期対応',
  early_infra: '早期対応（基盤インフラ）',
  mid_long: '中長期',
  none: '—',
};

export const FLOW_LABEL: Record<FlowType, string> = {
  comm: '通信', positioning: '測位', power: '送電', material: '資材',
  water: '水', gas: '酸素・水素', cargo: '貨物', resource: '資源',
  sample: 'サンプル', food: '食料', co2: '二酸化炭素', resupply: '補給',
  mobility: '移動',
};

export const ACTIVITY_LABEL: Record<ActivityKind, string> = {
  science_unmanned: '科学探査（無人）',
  science_manned: '科学探査（有人）',
  propellant: '推薬供給',
  tourism: '観光',
};

/** 推奨カラーパレット（実装時 §9 のデザイントークンに合わせて調整可） */
export const OWNERSHIP_COLOR: Record<Ownership, string> = {
  overseas: '#1b3a6b',          // 濃紺
  japan: '#3d7ed6',             // 水色
  precedent_science: '#e84f8c', // ピンク
};
export const COMPETITION_COLOR: Record<Competition, string> = {
  competition: '#d83933', // 赤
  partial: '#f0883e',     // 橙
  cooperation: '#1b3a6b', // 紺
  none: '#9aa4b2',
};
export const TIMING_COLOR: Record<Timing, string> = {
  earliest: '#d83933',    // 最早期=赤系
  early_infra: '#f0883e', // 早期(基盤)=橙系
  mid_long: '#3d7ed6',    // 中長期=青系
  none: '#9aa4b2',
};
export const FLOW_COLOR: Record<FlowType, string> = {
  comm: '#2e8b8b', positioning: '#7b5ea7', power: '#e0a800', material: '#8a6d3b',
  water: '#2f86d6', gas: '#5fb0c9', cargo: '#6c757d', resource: '#9c6b3f',
  sample: '#c2410c', food: '#3fa34d', co2: '#7a7a7a', resupply: '#b56576',
  mobility: '#4a5568',
};

// ============================================================
// 3. ノード型
// ============================================================

export interface NodeFunction {
  id: string;     // 機能ID（ポート/ハンドルに対応）
  label: string;  // 機能名（図の「〜する機能」をそのまま）
}

export interface ArchNode {
  id: string;
  label: string;                 // システム名
  category: CapabilityCategory;  // 主たるケーパビリティ大区分
  subCategory?: string;          // 小区分（例: 軌道・月面間, 通信(月近接), 通信(月面)）
  ownership: Ownership;
  competition: Competition;
  timing: Timing;
  functions: NodeFunction[];     // 機能（ポート）

  // --- 報告書横断メタ（クリック時の詳細パネルで使用） ---
  marketSegment?: MarketSegment;            // 市場推定の分野(p.11)
  supports: ActivityKind[];                 // 支援する月面活動(4分野, p.8)
  japanAssets?: string[];                   // 日本の独自技術・アセット(p.12)
  techStrategyKeys?: CapabilityCategory[];  // 紐づく宇宙技術戦略の区分(p.22-24)
  fundItemIds?: string[];                   // 紐づく宇宙戦略基金テーマID(p.25-26)
  note?: string;                            // 補足
}

// ============================================================
// 4. ノード一覧（p.15 アーキテクチャ図より）
// ============================================================

export const NODES: ArchNode[] = [
  // ---------- 探査（先行科学・探査, ピンク） ----------
  {
    id: 'tsukimi', label: '資源探査衛星システム（TSUKIMI）',
    category: 'exploration', ownership: 'precedent_science', competition: 'none', timing: 'none',
    functions: [
      { id: 'tsukimi_survey', label: '月面環境調査技術実証をする機能' },
      { id: 'tsukimi_resource', label: '資源を探査する機能' },
      { id: 'tsukimi_data', label: 'データを共有する機能' },
    ],
    supports: ['science_unmanned'],
    japanAssets: ['TSUKIMI（月周回観測）'],
    techStrategyKeys: ['exploration', 'resource_isru'],
    fundItemIds: ['fund_water_survey'],
  },
  {
    id: 'lupex', label: '月極域探査機（LUPEX）',
    category: 'exploration', ownership: 'precedent_science', competition: 'none', timing: 'none',
    functions: [
      { id: 'lupex_survey', label: '月面環境調査・技術実証をする機能' },
      { id: 'lupex_resource', label: '資源を探査する機能' },
      { id: 'lupex_data', label: 'データを共有する機能' },
    ],
    supports: ['science_unmanned', 'propellant'],
    japanAssets: ['LUPEX（月の水資源利用可能性調査・日印協力）'],
    techStrategyKeys: ['exploration', 'resource_isru'],
    fundItemIds: ['fund_water_survey'],
    note: '月の水資源の利用可能性の調査、重力天体表面探査技術実証（主に日印協力）',
  },
  {
    id: 'lda', label: '月面誘電率計測器（LDA）',
    category: 'exploration', ownership: 'precedent_science', competition: 'none', timing: 'none',
    functions: [
      { id: 'lda_survey', label: '月面環境調査・技術実証をする機能' },
      { id: 'lda_resource', label: '資源を探査する機能' },
      { id: 'lda_data', label: 'データを共有する機能' },
    ],
    supports: ['science_unmanned', 'propellant'],
    japanAssets: ['LDA（月面誘電率計測器）'],
    techStrategyKeys: ['exploration', 'resource_isru'],
  },

  // ---------- 科学（先行科学・探査, ピンク） ----------
  {
    id: 'seismometer', label: '月震計ネットワークシステム',
    category: 'science', ownership: 'precedent_science', competition: 'none', timing: 'none',
    functions: [
      { id: 'seis_measure', label: '振動を計測する機能' },
      { id: 'seis_survey', label: '月面環境調査技術実証をする機能' },
      { id: 'seis_data', label: 'データを共有する機能' },
    ],
    supports: ['science_unmanned'],
    techStrategyKeys: ['science'],
    note: '月震計を多点配置し、月の内部構造を分析する（p.8）',
  },
  {
    id: 'observatory', label: '月面天文台システム',
    category: 'science', ownership: 'precedent_science', competition: 'none', timing: 'none',
    functions: [
      { id: 'obs_observe', label: '天体観測する機能' },
      { id: 'obs_survey', label: '月面環境調査・技術実証をする機能' },
    ],
    supports: ['science_unmanned', 'tourism'],
    techStrategyKeys: ['science'],
    note: '月面で低周波宇宙電波を観測する（p.8）。観光（天体観測）とも親和性',
  },
  {
    id: 'other_science', label: 'その他科学・探査',
    category: 'science', ownership: 'precedent_science', competition: 'none', timing: 'none',
    functions: [{ id: 'oth_survey', label: '月面環境調査・技術実証をする機能' }],
    supports: ['science_unmanned'],
    techStrategyKeys: ['science'],
  },
  {
    id: 'sample_return', label: 'サンプルリターンシステム（SLIM）',
    category: 'science', ownership: 'precedent_science', competition: 'none', timing: 'none',
    functions: [
      { id: 'sr_land', label: '目標地点に着陸する機能（SLIM）' },
      { id: 'sr_collect', label: 'サンプルを採取する機能' },
      { id: 'sr_survey', label: '月面環境調査・技術実証をする機能' },
      { id: 'sr_launch', label: '離陸する機能' },
      { id: 'sr_return', label: '帰還する機能' },
    ],
    supports: ['science_unmanned', 'science_manned'],
    japanAssets: ['SLIM（ピンポイント高精度着陸, 2024年1月成功・3度の越夜）', 'はやぶさ/はやぶさ2/MMX（サンプルリターン技術）'],
    techStrategyKeys: ['science', 'transport'],
  },

  // ---------- 通信（地上局） ----------
  {
    id: 'ground_station', label: '地球局',
    category: 'communication', subCategory: '通信（地上局）',
    ownership: 'japan', competition: 'none', timing: 'early_infra',
    functions: [{ id: 'gs_comm', label: '月と直接通信する機能' }],
    marketSegment: 'comm_nav', supports: ['science_unmanned', 'science_manned', 'propellant', 'tourism'],
    techStrategyKeys: ['communication'], fundItemIds: ['fund_moon_earth_comm'],
  },

  // ---------- 通信（月近接）/ 測位 ----------
  {
    id: 'satcom_nav', label: '衛星通信・測位システム',
    category: 'communication', subCategory: '通信（月近接）＋測位',
    ownership: 'japan', competition: 'partial', timing: 'early_infra',
    functions: [
      { id: 'sn_position', label: '月を測位する機能（測位・協調）' },
      { id: 'sn_comm_moon', label: '月面と直接通信する機能（一部競争）' },
      { id: 'sn_comm_earth', label: '地球と直接通信する機能' },
    ],
    marketSegment: 'comm_nav', supports: ['science_unmanned', 'science_manned', 'propellant', 'tourism'],
    japanAssets: ['かぐや/EQUULEUS/TSUKIMI（GPS航法・電波航法・月通信測位）'],
    techStrategyKeys: ['communication', 'positioning'], fundItemIds: ['fund_lunar_pnt'],
    note: '測位機能は協調、通信(月近接)は一部競争という複合的な仮説',
  },
  {
    id: 'moon_earth_direct_comm', label: '月地球直接通信システム',
    category: 'communication', subCategory: '通信（月近接）',
    ownership: 'japan', competition: 'partial', timing: 'none',
    functions: [{ id: 'medc_comm', label: '地球と直接通信する機能' }],
    marketSegment: 'comm_nav', supports: ['science_unmanned', 'science_manned', 'propellant', 'tourism'],
    techStrategyKeys: ['communication'], fundItemIds: ['fund_moon_earth_comm'],
    note: '日本の強みである光通信技術等（Gbps級・遠距離大容量）による基幹回線化を志向（p.14）',
  },

  // ---------- 通信（月面）/ 電力 複合 ----------
  {
    id: 'mesh_comm_power', label: '月面メッシュ通信インフラ＆電力供給システム',
    category: 'communication', subCategory: '通信（月面）＋電力',
    ownership: 'japan', competition: 'partial', timing: 'earliest',
    functions: [
      { id: 'mesh_gen', label: '発電する機能' },
      { id: 'mesh_transmit', label: '送電する機能' },
      { id: 'mesh_comm', label: '月面でメッシュ通信をする機能' },
    ],
    marketSegment: 'comm_nav', supports: ['science_unmanned', 'science_manned', 'propellant', 'tourism'],
    techStrategyKeys: ['communication', 'power'],
    note: '通信(月面)と電力を兼ねる基盤インフラ。時期は最早期〜中長期にまたがる',
  },
  {
    id: 'cellular_comm', label: '月面セルラー通信システム',
    category: 'communication', subCategory: '通信（月面）',
    ownership: 'japan', competition: 'partial', timing: 'none',
    functions: [{ id: 'cell_comm', label: '月面のLTE通信を可能にする機能' }],
    marketSegment: 'comm_nav', supports: ['science_unmanned', 'science_manned', 'tourism'],
    techStrategyKeys: ['communication'],
  },

  // ---------- 電力 ----------
  {
    id: 'semi_permanent_power', label: '半永久電源',
    category: 'power', ownership: 'japan', competition: 'partial', timing: 'none',
    functions: [{ id: 'spp_gen', label: '発電する機能' }],
    marketSegment: 'power', supports: ['science_unmanned', 'science_manned', 'propellant', 'tourism'],
    techStrategyKeys: ['power'], fundItemIds: ['fund_semi_perm_power', 'fund_regen_fuelcell'],
  },
  {
    id: 'battery', label: '蓄電',
    category: 'power', ownership: 'japan', competition: 'partial', timing: 'none',
    functions: [{ id: 'bat_store', label: '蓄電機能' }],
    marketSegment: 'power', supports: ['science_unmanned', 'science_manned', 'propellant', 'tourism'],
    techStrategyKeys: ['power'], fundItemIds: ['fund_regen_fuelcell'],
  },
  {
    id: 'power_transmission', label: '送電',
    category: 'power', ownership: 'japan', competition: 'partial', timing: 'none',
    functions: [{ id: 'pt_transmit', label: '送電する機能' }],
    marketSegment: 'power', supports: ['science_unmanned', 'science_manned', 'propellant', 'tourism'],
    techStrategyKeys: ['power'],
    note: '有線・無線送電技術（p.23）',
  },
  {
    id: 'solar_power_ground', label: '太陽光電力発電',
    category: 'power', ownership: 'japan', competition: 'partial', timing: 'early_infra',
    functions: [
      { id: 'spg_gen', label: '発電する機能' },
      { id: 'spg_transmit', label: '送電する機能' },
    ],
    marketSegment: 'power', supports: ['science_unmanned', 'science_manned', 'propellant', 'tourism'],
    techStrategyKeys: ['power'],
    note: '展開収納型太陽電池タワー等（p.23・p.16イメージの太陽電池タワー）',
  },
  {
    id: 'solar_power_satellite', label: '太陽光発電（衛星）',
    category: 'power', ownership: 'overseas', competition: 'partial', timing: 'none',
    functions: [{ id: 'sps_gen', label: '発電する機能' }],
    marketSegment: 'power', supports: ['science_unmanned', 'science_manned', 'propellant', 'tourism'],
    techStrategyKeys: ['power'],
  },

  // ---------- 輸送 ----------
  {
    id: 'spacecraft', label: '宇宙船',
    category: 'transport', subCategory: '輸送（ロケット）',
    ownership: 'overseas', competition: 'competition', timing: 'earliest',
    functions: [
      { id: 'sc_carry', label: '人・貨物を乗せる機能' },
      { id: 'sc_navigate', label: '航行する機能' },
    ],
    marketSegment: 'transport_mobility', supports: ['science_manned', 'propellant', 'tourism'],
    japanAssets: ['H3（我が国独自の基幹ロケット）'],
    techStrategyKeys: ['transport'],
  },
  {
    id: 'luna_gateway', label: 'LunaGateway',
    category: 'transport', subCategory: '月周回有人拠点',
    ownership: 'overseas', competition: 'cooperation', timing: 'none',
    functions: [
      { id: 'gw_resupply', label: '補給をさせる機能' },
      { id: 'gw_stay', label: '人を滞在させる機能' },
    ],
    marketSegment: 'transport_mobility', supports: ['science_manned', 'propellant', 'tourism'],
    japanAssets: ['HTV-XG（与圧・自動ドッキング技術等で物資補給）', 'Gateway用ECLSS（生命維持・環境制御）'],
    techStrategyKeys: ['transport', 'life_support', 'habitation'],
    fundItemIds: ['fund_logistics'],
  },
  {
    id: 'crewed_lander', label: '月面有人着陸機',
    category: 'transport', subCategory: '輸送（軌道・月面間）',
    ownership: 'overseas', competition: 'competition', timing: 'earliest',
    functions: [
      { id: 'cl_land', label: '月面へ着陸をする機能' },
      { id: 'cl_carry', label: '人を乗せる機能' },
    ],
    marketSegment: 'transport_mobility', supports: ['science_manned', 'tourism'],
    techStrategyKeys: ['transport'],
  },
  {
    id: 'cargo_lander', label: '月面貨物輸送着陸機',
    category: 'transport', subCategory: '輸送（軌道・月面間）',
    ownership: 'japan', competition: 'competition', timing: 'earliest',
    functions: [
      { id: 'cgl_land', label: '月面へ着陸をする機能' },
      { id: 'cgl_load', label: '貨物を積む機能' },
    ],
    marketSegment: 'transport_mobility', supports: ['science_unmanned', 'science_manned', 'propellant', 'tourism'],
    japanAssets: ['SLIM（耐環境・高精度航法誘導）', 'ispace（民間月面ランダー開発）'],
    techStrategyKeys: ['transport'], fundItemIds: ['fund_logistics'],
  },
  {
    id: 'exposed_rover', label: '曝露ローバーシステム',
    category: 'transport', subCategory: '輸送（月面）',
    ownership: 'japan', competition: 'partial', timing: 'earliest',
    functions: [
      { id: 'er_cargo', label: '月面上を貨物輸送する機能' },
      { id: 'er_crew_short', label: '人を短時間輸送する機能' },
      { id: 'er_arm', label: '作業支援機能（ロボットアーム）' },
    ],
    marketSegment: 'transport_mobility', supports: ['science_unmanned', 'science_manned', 'tourism'],
    japanAssets: ['TOYOTA/HONDA/タカラトミー等（モビリティ・非宇宙企業参画）'],
    techStrategyKeys: ['transport', 'construction'],
  },
  {
    id: 'pressurized_rover', label: '与圧ローバーシステム',
    category: 'transport', subCategory: '輸送（月面）',
    ownership: 'japan', competition: 'partial', timing: 'earliest',
    functions: [{ id: 'pr_crew_long', label: '人を長時間輸送する機能' }],
    marketSegment: 'transport_mobility', supports: ['science_manned', 'tourism'],
    japanAssets: ['有人与圧ローバ（宇宙服無しで搭乗可能・越夜等の耐環境・与圧・走行機構技術）'],
    techStrategyKeys: ['transport'],
  },
  {
    id: 'lunar_railway', label: '月面鉄道システム',
    category: 'transport', subCategory: '輸送（月面）',
    ownership: 'overseas', competition: 'partial', timing: 'earliest',
    functions: [{ id: 'rail_cargo', label: '月面上を貨物輸送する機能' }],
    marketSegment: 'transport_mobility', supports: ['propellant', 'tourism'],
    techStrategyKeys: ['transport'],
  },

  // ---------- 資源（ISRU） ----------
  {
    id: 'isru', label: 'ISRUシステム',
    category: 'resource_isru', ownership: 'overseas', competition: 'competition', timing: 'mid_long',
    functions: [
      { id: 'isru_metal', label: '金属資材を生成する機能' },
      { id: 'isru_store', label: '資材をストレージする機能' },
      { id: 'isru_water', label: '水を生成する機能' },
      { id: 'isru_gas', label: '酸素/水素を生成する機能' },
      { id: 'isru_power', label: '発電する機能' },
    ],
    marketSegment: 'isru', supports: ['science_unmanned', 'propellant'],
    japanAssets: ['スターダストプログラム基礎研究（水資源利用・無人建設・食料生産）', '高砂熱学工業（水電気分解）'],
    techStrategyKeys: ['resource_isru'], fundItemIds: ['fund_water_survey'],
    note: 'ISRU=In-Situ Resource Utilization（現地資源利用）。市場規模が比較的大きい分野（約9,000億円）',
  },

  // ---------- 建設 ----------
  {
    id: 'construction', label: '建設システム',
    category: 'construction', ownership: 'japan', competition: 'competition', timing: 'early_infra',
    functions: [{ id: 'con_build', label: '建材を使って建設作業をする機能' }],
    marketSegment: 'construction_robotics', supports: ['science_manned', 'propellant', 'tourism'],
    japanAssets: ['宇宙無人建設技術（スターダストP）', 'JAXA宇宙建設革新プロジェクト'],
    techStrategyKeys: ['construction'],
  },
  {
    id: 'material_processing', label: '建材加工システム',
    category: 'construction', ownership: 'japan', competition: 'competition', timing: 'early_infra',
    functions: [{ id: 'mp_process', label: '建材を加工する機能' }],
    marketSegment: 'construction_robotics', supports: ['science_manned', 'propellant', 'tourism'],
    techStrategyKeys: ['construction', 'resource_isru'],
  },

  // ---------- 食料 ----------
  {
    id: 'food_production', label: '食料生産システム',
    category: 'food', ownership: 'japan', competition: 'competition', timing: 'mid_long',
    functions: [{ id: 'food_grow', label: '食料を生産する機能' }],
    supports: ['science_manned', 'tourism'],
    japanAssets: ['米・大豆・藻類・培養肉等生産技術／完全循環処理技術（スターダストP）'],
    techStrategyKeys: ['food'],
    note: '市場推定の5分野には含まれないが、地上転用（食料安保・脱炭素・被災地QOL）が期待（p.14）',
  },

  // ---------- 居住 / 生命維持 ----------
  {
    id: 'habitation', label: '居住システム',
    category: 'habitation', ownership: 'japan', competition: 'partial', timing: 'mid_long',
    functions: [{ id: 'hab_mission', label: '簡易なミッションを行う機能' }],
    supports: ['science_manned', 'tourism'],
    japanAssets: ['拠点構築技術／インフレータブル型・展開構造型構造物'],
    techStrategyKeys: ['habitation'],
  },
  {
    id: 'life_support', label: '生命維持',
    category: 'life_support', ownership: 'japan', competition: 'partial', timing: 'mid_long',
    functions: [{ id: 'ls_sustain', label: '生命を維持する機能' }],
    supports: ['science_manned', 'tourism'],
    japanAssets: ['Gateway用ECLSS（環境制御・生命維持）／健康管理技術'],
    techStrategyKeys: ['life_support'],
  },
];

// ============================================================
// 5. エッジ型・一覧（フロー）
//    ※ source/target は機能ID(ポート)に解決する場合は from/to を機能IDに、
//      システム単位で扱う場合はノードIDを用いる。下記はノードID基準。
//      実装ではノード内の該当機能ハンドルへ接続することを推奨（仕様書 §6.2）。
// ============================================================

export interface ArchEdge {
  id: string;
  source: string;          // ノードID
  target: string;          // ノードID
  type: FlowType;
  bidirectional?: boolean; // 双方向（通信・補給・移動等）
  note?: string;
}

export const EDGES: ArchEdge[] = [
  // ---- 通信バックボーン ----
  { id: 'e_gs_satcom', source: 'ground_station', target: 'satcom_nav', type: 'comm', bidirectional: true },
  { id: 'e_gs_medc', source: 'ground_station', target: 'moon_earth_direct_comm', type: 'comm', bidirectional: true },
  { id: 'e_satcom_mesh', source: 'satcom_nav', target: 'mesh_comm_power', type: 'comm', bidirectional: true },
  { id: 'e_satcom_cell', source: 'satcom_nav', target: 'cellular_comm', type: 'comm', bidirectional: true },
  { id: 'e_medc_mesh', source: 'moon_earth_direct_comm', target: 'mesh_comm_power', type: 'comm', bidirectional: true },
  // 月面システム → メッシュ/セルラー（通信・データ共有）
  { id: 'e_tsukimi_comm', source: 'tsukimi', target: 'satcom_nav', type: 'comm' },
  { id: 'e_lupex_comm', source: 'lupex', target: 'mesh_comm_power', type: 'comm' },
  { id: 'e_lda_comm', source: 'lda', target: 'mesh_comm_power', type: 'comm' },
  { id: 'e_seis_comm', source: 'seismometer', target: 'mesh_comm_power', type: 'comm' },
  { id: 'e_obs_comm', source: 'observatory', target: 'mesh_comm_power', type: 'comm' },
  { id: 'e_oth_comm', source: 'other_science', target: 'mesh_comm_power', type: 'comm' },
  { id: 'e_sr_comm', source: 'sample_return', target: 'satcom_nav', type: 'comm' },
  { id: 'e_isru_comm', source: 'isru', target: 'cellular_comm', type: 'comm' },
  { id: 'e_con_comm', source: 'construction', target: 'cellular_comm', type: 'comm' },
  { id: 'e_hab_comm', source: 'habitation', target: 'cellular_comm', type: 'comm' },
  { id: 'e_rover_comm', source: 'pressurized_rover', target: 'cellular_comm', type: 'comm', bidirectional: true },
  { id: 'e_exrover_comm', source: 'exposed_rover', target: 'cellular_comm', type: 'comm', bidirectional: true },
  { id: 'e_gw_comm', source: 'luna_gateway', target: 'ground_station', type: 'comm', bidirectional: true },

  // ---- 測位 ----
  { id: 'e_pos_exrover', source: 'satcom_nav', target: 'exposed_rover', type: 'positioning' },
  { id: 'e_pos_prover', source: 'satcom_nav', target: 'pressurized_rover', type: 'positioning' },
  { id: 'e_pos_crewland', source: 'satcom_nav', target: 'crewed_lander', type: 'positioning' },
  { id: 'e_pos_cargoland', source: 'satcom_nav', target: 'cargo_lander', type: 'positioning' },

  // ---- 送電 ----
  { id: 'e_spp_pt', source: 'semi_permanent_power', target: 'power_transmission', type: 'power' },
  { id: 'e_bat_pt', source: 'battery', target: 'power_transmission', type: 'power', bidirectional: true },
  { id: 'e_spg_pt', source: 'solar_power_ground', target: 'power_transmission', type: 'power' },
  { id: 'e_sps_surface', source: 'solar_power_satellite', target: 'power_transmission', type: 'power', note: '衛星からの無線送電を想定' },
  { id: 'e_pt_isru', source: 'power_transmission', target: 'isru', type: 'power' },
  { id: 'e_pt_con', source: 'power_transmission', target: 'construction', type: 'power' },
  { id: 'e_pt_mp', source: 'power_transmission', target: 'material_processing', type: 'power' },
  { id: 'e_pt_hab', source: 'power_transmission', target: 'habitation', type: 'power' },
  { id: 'e_pt_ls', source: 'power_transmission', target: 'life_support', type: 'power' },
  { id: 'e_pt_food', source: 'power_transmission', target: 'food_production', type: 'power' },
  { id: 'e_pt_cell', source: 'power_transmission', target: 'cellular_comm', type: 'power' },
  { id: 'e_mesh_hab', source: 'mesh_comm_power', target: 'habitation', type: 'power' },
  { id: 'e_mesh_exrover', source: 'mesh_comm_power', target: 'exposed_rover', type: 'power', note: 'ローバ充電' },
  { id: 'e_isrupower_pt', source: 'isru', target: 'power_transmission', type: 'power', note: 'ISRUの発電機能' },

  // ---- 資源 → ISRU ----
  { id: 'e_lupex_isru', source: 'lupex', target: 'isru', type: 'resource', note: '資源分布データ→ISRU' },
  { id: 'e_lda_isru', source: 'lda', target: 'isru', type: 'resource' },

  // ---- 水・ガス（ISRU出力） ----
  { id: 'e_isru_water_ls', source: 'isru', target: 'life_support', type: 'water' },
  { id: 'e_isru_water_food', source: 'isru', target: 'food_production', type: 'water' },
  { id: 'e_isru_gas_ls', source: 'isru', target: 'life_support', type: 'gas', note: '呼吸用酸素' },
  { id: 'e_isru_gas_spacecraft', source: 'isru', target: 'spacecraft', type: 'gas', note: '推薬（酸素・水素）供給' },
  { id: 'e_isru_gas_crewland', source: 'isru', target: 'crewed_lander', type: 'gas', note: '推薬供給' },
  { id: 'e_isru_gas_cargoland', source: 'isru', target: 'cargo_lander', type: 'gas', note: '推薬供給' },

  // ---- 資材・建材 ----
  { id: 'e_isru_metal_mp', source: 'isru', target: 'material_processing', type: 'material', note: '金属資材' },
  { id: 'e_mp_con', source: 'material_processing', target: 'construction', type: 'material', note: '加工資材/建材' },
  { id: 'e_con_hab', source: 'construction', target: 'habitation', type: 'material', note: '建設→居住設置' },

  // ---- 食料・CO2 循環 ----
  { id: 'e_food_hab', source: 'food_production', target: 'habitation', type: 'food' },
  { id: 'e_food_ls', source: 'food_production', target: 'life_support', type: 'food' },
  { id: 'e_ls_co2', source: 'life_support', target: 'food_production', type: 'co2', note: 'CO2→植物生産' },
  { id: 'e_hab_co2', source: 'habitation', target: 'food_production', type: 'co2' },

  // ---- 輸送・補給・移動 ----
  { id: 'e_sc_gw', source: 'spacecraft', target: 'luna_gateway', type: 'mobility', bidirectional: true },
  { id: 'e_gw_resupply', source: 'spacecraft', target: 'luna_gateway', type: 'resupply', bidirectional: true },
  { id: 'e_gw_crewland', source: 'luna_gateway', target: 'crewed_lander', type: 'mobility', bidirectional: true },
  { id: 'e_gw_cargoland', source: 'luna_gateway', target: 'cargo_lander', type: 'resupply', bidirectional: true },
  { id: 'e_crewland_surface', source: 'crewed_lander', target: 'habitation', type: 'mobility', note: '人員の月面展開' },
  { id: 'e_cargoland_con', source: 'cargo_lander', target: 'construction', type: 'cargo', note: '資材・機器' },
  { id: 'e_cargoland_isru', source: 'cargo_lander', target: 'isru', type: 'cargo' },
  { id: 'e_exrover_cargo', source: 'exposed_rover', target: 'construction', type: 'cargo', note: '月面上の貨物輸送' },
  { id: 'e_prover_hab', source: 'pressurized_rover', target: 'habitation', type: 'mobility', bidirectional: true },
  { id: 'e_rail_isru', source: 'lunar_railway', target: 'isru', type: 'cargo', note: '拠点間貨物輸送' },
  { id: 'e_rail_con', source: 'lunar_railway', target: 'construction', type: 'cargo' },

  // ---- サンプル ----
  { id: 'e_sci_sample', source: 'other_science', target: 'sample_return', type: 'sample' },
  { id: 'e_exp_sample', source: 'lupex', target: 'sample_return', type: 'sample' },
];

// ============================================================
// 6. 付随データ（報告書横断・詳細パネル/タブで使用）
// ============================================================

/** 時代区分（p.10） — 時代スライダーに使用 */
export interface AgeDef {
  id: number;
  name: string;
  period: string;
  isecgPhase: string;
  lunaAge: string;
  population: string;
  actors: string;
  hub: string;
  range: string;
  stay: string;
  demand: string; // 官需/民需
}

export const AGES: AgeDef[] = [
  {
    id: 1, name: '黎明期（前半）', period: '2020年代後半',
    isecgPhase: 'ISECG Phase 1 / Artemis Ⅱ〜Ⅳ',
    lunaAge: 'Exploration Age / Foundational Age（自給前提・技術実証）',
    population: '4人〜', actors: '宇宙飛行士',
    hub: 'Gateway（＋南極ランダ）', range: '月南極（ランダ）周辺',
    stay: '最大14日間（昼：越夜なし）/年1回', demand: '官需',
  },
  {
    id: 2, name: '黎明期（中盤）', period: '2030年代前半',
    isecgPhase: 'ISECG Phase 2A / Artemis Ⅴ〜Ⅶ以降',
    lunaAge: 'Foundational Age',
    population: '4人〜', actors: '宇宙飛行士',
    hub: 'Gateway（＋南極ランダ）', range: '月南極＋周辺数百〜数千km',
    stay: '14〜42日間（昼＋夜＋昼：越夜1回）/年1回', demand: '官需',
  },
  {
    id: 3, name: '黎明期（後半）', period: '2030年代後半',
    isecgPhase: 'ISECG Phase 2B',
    lunaAge: 'Industrial Age（大型物資輸送・投資回収・ISRU完全稼働）',
    population: '40〜100人程度', actors: '宇宙飛行士、産業従事者（インフラ関係等）',
    hub: 'Gateway＋南極拠点', range: '月南極拠点＋周辺数千〜数万km程度',
    stay: '数百日以上（長期滞在）/年複数回', demand: '官需（推薬供給で民需の芽）',
  },
  {
    id: 4, name: '成長期', period: '2040年代以降',
    isecgPhase: 'ISECG Phase 3',
    lunaAge: 'Jet Age（月100tの酸素生産・赤道＋極のマルチサイト・地球からの輸送量減少）',
    population: '数百名〜', actors: '宇宙飛行士、産業従事者、民間人',
    hub: 'Gateway＋南極拠点＋広範囲に複数拠点', range: '複数拠点＋周辺数千〜数万km程度',
    stay: '数年/年複数回', demand: '官需＋民需（富裕層の観光等が始まる）',
  },
  {
    id: 5, name: '成熟期', period: '—',
    isecgPhase: '（ロードマップに明示的な年代の記載なし）',
    lunaAge: 'Jet Age and Beyond',
    population: '数百名〜（増加）', actors: '宇宙飛行士、産業従事者（インフラ・観光業等）、民間人',
    hub: 'Gateway＋南極拠点＋広範囲に多数拠点', range: '多数拠点＋周辺数千〜数万km程度',
    stay: '更なる長期化・人数増加', demand: '官需＋民需（観光等が増加）',
  },
];

/** 市場推定（p.11, Jet Age想定・単年・1ドル=150円） */
export interface MarketDef { segment: MarketSegment; label: string; sizeOku: number; note?: string; }
export const MARKET: MarketDef[] = [
  { segment: 'transport_mobility', label: '輸送・モビリティ', sizeOku: 7600 },
  { segment: 'comm_nav', label: '通信・測位', sizeOku: 1200 },
  { segment: 'power', label: '電力', sizeOku: 9600 },
  { segment: 'construction_robotics', label: '建設・ロボティクス', sizeOku: 1200 },
  { segment: 'isru', label: 'ISRU', sizeOku: 9000 },
];
export const MARKET_REFS = {
  approach: 'DARPA/LunA-10 の Jet Age（2030年代後半〜）の想定サービスを積み上げて単年推計。宇宙インフラの開発・製造・整備費は対象外（三菱総合研究所試算）。',
  nsr: 'NSR予測: 2022-2032(10年累積) 1,367億ドル（約20兆円）',
  pwc: 'PwC予測: 2020-2040(20年累積) 1,505億ドル（約22兆円）',
};

/** 想定される月面活動（4分野, p.8） */
export const ACTIVITIES: { id: ActivityKind; label: string; desc: string }[] = [
  { id: 'science_unmanned', label: '科学探査（無人）', desc: '無人機（衛星・ローバ・ランダ・設置機器）による月面天文台、月震計、狭域/広域サンプルリターン等' },
  { id: 'science_manned', label: '科学探査（有人）', desc: '宇宙飛行士による狭域/広域の詳細探査・岩石採取（無人探査と連携）' },
  { id: 'propellant', label: '推薬供給', desc: '火星探査含む深宇宙探査・各種月面活動への推薬供給。無人で生産・供給、水資源エリア＋長期滞在拠点中心' },
  { id: 'tourism', label: '観光', desc: '民間人による短期/長期滞在（環境体験・探査遺跡見学・天体観測等）。※十分な議論は未了との注記あり' },
];

/** 宇宙戦略基金 第一弾（p.25-26 月面開発＋関連） */
export interface FundItem { id: string; title: string; ministry: string; budgetOku: number; desc: string; capability: CapabilityCategory[]; }
export const FUND_ITEMS: FundItem[] = [
  { id: 'fund_lunar_pnt', title: '月測位システム技術', ministry: '文', budgetOku: 50, desc: '月面・月周回軌道上でリアルタイム測位を行うシステムの実現に向けた技術開発', capability: ['positioning'] },
  { id: 'fund_regen_fuelcell', title: '再生型燃料電池システム', ministry: '文', budgetOku: 230, desc: '月面環境での運用を想定した再生型燃料電池システムの地上実証', capability: ['power'] },
  { id: 'fund_semi_perm_power', title: '半永久電源システムに係る要素技術', ministry: '文', budgetOku: 15, desc: 'メンテナンス不要かつ長期間使用可能な電源システムの要素技術開発', capability: ['power'] },
  { id: 'fund_water_survey', title: '月面水資源探査技術', ministry: '総', budgetOku: 64, desc: 'センシングによる効率的な月面水資源探査（小型軽量センサ搭載の小型衛星）の開発・実証', capability: ['exploration', 'resource_isru'] },
  { id: 'fund_moon_earth_comm', title: '月-地球間通信システム開発・実証FS', ministry: '総', budgetOku: 5, desc: '月-地球間の大容量・高精度捕捉が可能な通信アンテナの基本設計、高品質・高信頼モバイル通信環境の実現可能性調査', capability: ['communication'] },
  { id: 'fund_logistics', title: '国際競争力と自立・自在性を有する物資補給システムに係る技術', ministry: '文', budgetOku: 155, desc: '商業宇宙ステーション等に接続可能な自立飛行型モジュールの基本システム開発（LEO利用、関連）', capability: ['transport'] },
];

/** 宇宙技術戦略 要素技術（p.22-24 抜粋, capability区分→要素技術） */
export const TECH_STRATEGY: Partial<Record<CapabilityCategory, string[]>> = {
  transport: ['物資補給技術', '自動ドッキング技術', '航法誘導制御技術', '月着陸技術', '降着系技術', '障害物検知・回避技術', '推薬管理技術', '月表面探査技術', '走行機構技術（不整地・長距離）', '耐環境技術（越夜・防塵）', '作業支援技術（ロボットアーム）'],
  communication: ['月通信・測位技術', '大容量リアルタイム通信技術', '惑星間インターネット技術', '小型軽量化技術', '月面拠点内のRF通信技術'],
  positioning: ['月通信・測位技術', '月測位システム技術'],
  power: ['発電技術（展開収納型太陽電池タワー, 半永久電源等）', '蓄電技術（全固体電池, 高エネルギー密度電池）', '送電技術（有線・無線送電）'],
  construction: ['月周回/月面資源探査技術', '宇宙無人建設技術（自動化・遠隔化・建材製造・簡易施設建設）', '月表面探査技術', '走行機構技術', '耐環境技術'],
  resource_isru: ['月面資源探査技術（資源調査・掘削・採取・地盤調査・環境計測）', '水資源利用技術（資源採取・推薬生成）', '鉱物資源利用技術（分離回収・精製・成形）'],
  life_support: ['環境制御・生命維持システム（ECLSS）', '健康管理技術（QOL向上含む）', '月面環境データ・観測技術'],
  habitation: ['拠点構築技術', '生命維持・環境制御技術', '遠隔化・自動化・自律化を含む有人活動支援技術', '有人宇宙施設運用技術', '有人活動安全評価・管理技術'],
  food: ['月面等での食料生産技術', '拠点構築技術', '生命維持・環境制御技術'],
  science: ['月面科学に係る技術（科学観測機器の自立運用パッケージ化：通信・電源・構造・熱制御）', '月面環境データ・観測技術'],
  exploration: ['月周回資源探査技術', '月面資源探査技術', '環境計測技術'],
};

/** 国際協調（p.22） */
export const INTL_COOPERATION = {
  artemis: {
    title: 'アルテミス合意（Artemis Accords）', lead: '米国',
    initial: '当初署名国8カ国（米・日・加・英・伊・豪・ルクセンブルク・UAE）',
    current: '2025年3月現在 53カ国',
    points: ['全13部構成。第1部で民生宇宙機関の宇宙活動に適用と明記', '第10部「宇宙資源」', '第11部「宇宙活動の衝突回避」'],
  },
  ilrs: {
    title: 'ILRS（ガイドライン＋ILRSCO）', lead: '中国・ロシア',
    initial: '当初2カ国（中・露）',
    current: '2025年3月現在 13カ国＋11の機関・大学等',
    points: ['平和的な開発', '共同での協議・構築と共有', '多様な協力形態', '科学成果の共有', '月資源の保全', '協力組織ILRSCOの設立'],
  },
};

/** 周波数（p.20-21） */
export const FREQUENCY = {
  itur: 'WRC-27に向け議題1.15として議題化。WP7Bが責任グループ。商業利用は当議題の対象外。',
  sfcg: 'SFCGで宇宙機関間の事前調整・推奨周波数のリスト化。LMSGが月・火星近傍のルール策定を担当。',
  nasa: 'NASAがLSM（Lunar Spectrum Manager）を設置し、LSMP（ポータル）とSFCGデータベースで事前調整支援。SFCG非加盟組織にも事前調整を推奨。',
  japan: '正式な国際周波数調整はITU-R。国内は総務省（主管庁）が免許。JAXA等が情報提供。',
};

/** 水資源探査の現状（p.19） */
export const WATER_STATUS = {
  summary: '存在を示唆する観測はあるが、存在量・分布・形態の詳細は未だ不明。月面活動に利用可能な水の量は未確認。',
  amount: '観測ごとに推定値に差。S/N比・解像度・観測深度の違いで相対確度評価自体が困難。',
  distribution: '永久影表面で水氷は数wt%以下（かぐや/韓国KPLO）。極域永久影に集中と考えられるが明確な結論なし。地中数m〜数十mに分布の可能性も。',
  form: '水素の存在可能性は高い（インドChandrayaan-1）。水/水和物/水氷いずれの形態かは不明。',
  quote: '国際宇宙探査シナリオ(案)2021: 量・分布・形態について決定的な結論はまだ得られていない。',
};
