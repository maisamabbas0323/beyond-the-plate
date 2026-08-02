import type { Dish } from './types'

export const IMAGE_BASE = 'https://images.unsplash.com/photo-'

export const img = (photoId: string, width = 1400) =>
  `${IMAGE_BASE}${photoId}?q=80&w=${width}&auto=format&fit=crop`

export interface DishImagery {
  src: string
  gradient: string
  accent: string
}

/**
 * Curated photography keyed by dish id. Every photo id has been verified to
 * resolve — unknown ids fall back to a category-matched pool so a frame is
 * never left empty.
 */
const CURATED: Record<string, string> = {
  paella: '1534080564583-6be75777b70a',
  pho: '1582878826629-29b7ad1cdc43',
  ramen: '1569718212165-3a8278d5f624',
  tacos: '1565299585323-38d6b0865b47',
  margherita: '1574071318508-1cdbab80d002',
  'butter-chicken': '1603894584373-5ac82b2ae398',
  tagine: '1615874959474-d609969a20ed',
  sushi: '1579871494447-9811cf80d66c',
  mole: '1540189549336-e6e99c3679fe',
  borscht: '1547592180-85f173990554',
  feijoada: '1544025162-d76694265947',
  'pad-thai': '1473093295043-cdd812d0e601',
  'peking-duck': '1555939594-58d7cb561ad1',
  biryani: '1585937421612-70a008356fbe',
  'coq-au-vin': '1604909052743-94e838986d24',
  'kung-pao-chicken': '1525755662778-989d0524087e',
  'mapo-tofu': '1580013759032-c96505e24c1f',
  'char-siu': '1555939594-58d7cb561ad1',
  dumplings: '1563245372-f21724e3856d',
  'dan-dan-noodles': '1526318896980-cf78c088247c',
  'hot-pot': '1606491956689-2ea866880c84',
  'eggs-benedict': '1550317138-10000687a72b',
  'katsu-curry': '1569058242253-92a9c755a0ec',
  okonomiyaki: '1569718212165-3a8278d5f624',
  'bibimbap': '1546069901-ba9599a7e63c',
  bulgogi: '1553163147-622ab57be1c7',
  'kimchi-jjigae': '1596797038530-2c107229654b',
  'goi-cuon': '1476224203421-9ac39bcb3327',
  'banh-mi': '1528735602780-2552fd46c7af',
  'green-curry': '1631292784640-2b24be784d5d',
  'tom-yum': '1547592166-23ac45744acd',
  'massaman-curry': '1565557623262-b51c2513a641',
  rendang: '1585937421612-70a008356fbe',
  'nasi-goreng': '1512058564366-18510be2db19',
  'nasi-lemak': '1512058564366-18510be2db19',
  'satay': '1555939594-58d7cb561ad1',
  momo: '1626777552726-4a6b54c97e46',
  'kottu-roti': '1526318896980-cf78c088247c',
  'dosa': '1601050690597-df0568f70950',
  samosa: '1612929633738-8fe44f7ec841',
  'dal-makhani': '1585937421612-70a008356fbe',
  'rogan-josh': '1631452180519-c014fe946bc7',
  'tandoori-chicken': '1599487488170-d11ec9c172f0',
  'chole-bhature': '1601050690597-df0568f70950',
  'gulab-jamun': '1551024506-0bccd828d307',
  nihari: '1585937421612-70a008356fbe',
  'karahi': '1631452180519-c014fe946bc7',
  'kabuli-pulao': '1512058564366-18510be2db19',
  'chelo-kebab': '1626777552726-4a6b54c97e46',
  'ghormeh-sabzi': '1580013759032-c96505e24c1f',
  'fesenjan': '1534351590666-13e3e96b5017',
  'tah-dig': '1512058564366-18510be2db19',
  'doner-kebab': '1555126634-323283e090fa',
  lahmacun: '1552332386-f8dd00dc2f85',
  menemen: '1504754524776-8f4f37790ca0',
  'iskender': '1555126634-323283e090fa',
  baklava: '1541783245831-57d6fb0926d3',
  'lasagna': '1572802419224-296b0aeee0d9',
  carbonara: '1473093295043-cdd812d0e601',
  risotto: '1551504734-5ee1c4a1479b',
  tiramisu: '1551024506-0bccd828d307',
  'osso-buco': '1555939594-58d7cb561ad1',
  ratatouille: '1540420773420-3366772f4999',
  croissant: '1555507036-ab1f4038808a',
  'bouillabaisse': '1547592166-23ac45744acd',
  crepes: '1484723091739-30a097e8f929',
  'tortilla-espanola': '1546069901-ba9599a7e63c',
  gazpacho: '1540189549336-e6e99c3679fe',
  churros: '1563805042-7684c019e1cb',
  'pulpo-a-la-gallega': '1467003909585-2f8a72700288',
  'bacalhau-a-bras': '1414235077428-338989a2e8c0',
  'pastel-de-nata': '1555507036-ab1f4038808a',
  schnitzel: '1555939594-58d7cb561ad1',
  currywurst: '1568901346375-23c9450c58cd',
  'moussaka': '1555939594-58d7cb561ad1',
  souvlaki: '1555939594-58d7cb561ad1',
  tzatziki: '1512621776951-a57141f2eefd',
  spanakopita: '1509440159596-0249088772ff',
  varenyky: '1476224203421-9ac39bcb3327',
  'chicken-kyiv': '1604909052743-94e838986d24',
  pierogi: '1476224203421-9ac39bcb3327',
  'beef-stroganoff': '1604909052743-94e838986d24',
  pelmeni: '1476224203421-9ac39bcb3327',
  'fish-and-chips': '1467003909585-2f8a72700288',
  'shepherds-pie': '1604909052743-94e838986d24',
  'swedish-meatballs': '1544025162-d76694265947',
  'thieboudienne': '1512058564366-18510be2db19',
  jollof: '1569718212165-3a8278d5f624',
  'egusi': '1534351590666-13e3e96b5017',
  suya: '1555939594-58d7cb561ad1',
  'doro-wat': '1534351590666-13e3e96b5017',
  injera: '1509440159596-0249088772ff',
  koshari: '1512058564366-18510be2db19',
  'ful-medames': '1512058564366-18510be2db19',
  'molokhia': '1547592166-23ac45744acd',
  'bobotie': '1544025162-d76694265947',
  'bunny-chow': '1509440159596-0249088772ff',
  'malva-pudding': '1551024506-0bccd828d307',
  tamales: '1540189549336-e6e99c3679fe',
  'chiles-en-nogada': '1540189549336-e6e99c3679fe',
  pozole: '1547592166-23ac45744acd',
  elote: '1512621776951-a57141f2eefd',
  'pao-de-queijo': '1509440159596-0249088772ff',
  brigadeiro: '1551024506-0bccd828d307',
  ceviche: '1546069901-ba9599a7e63c',
  'lomo-saltado': '1555939594-58d7cb561ad1',
  'aji-de-gallina': '1546069901-ba9599a7e63c',
  asado: '1555939594-58d7cb561ad1',
  empanadas: '1555126634-323283e090fa',
  poutine: '1568901346375-23c9450c58cd',
  'butter-tarts': '1551024506-0bccd828d307',
  'tourtiere': '1604909052743-94e838986d24',
  'mac-and-cheese': '1546069901-ba9599a7e63c',
  gumbo: '1547592166-23ac45744acd',
  'clam-chowder': '1547592166-23ac45744acd',
  'buffalo-wings': '1603133872878-684f208fb84b',
  'key-lime-pie': '1551024506-0bccd828d307',
  pavlova: '1551024506-0bccd828d307',
  lamington: '1563805042-7684c019e1cb',
  'australian-meat-pie': '1604909052743-94e838986d24',
  kokoda: '1546069901-ba9599a7e63c',
  palusami: '1512058564366-18510be2db19',
  poke: '1546069901-ba9599a7e63c',
  'loco-moco': '1550317138-10000687a72b',
}

/** Category-matched fallback pools — a verified photo that reads as the right kind of plate. */
const CATEGORY_POOL: Record<string, readonly string[]> = {
  Soup: ['1547592166-23ac45744acd', '1585032226651-759b368d7246', '1606491956689-2ea866880c84', '1569718212165-3a8278d5f624'],
  Dessert: ['1551024506-0bccd828d307', '1565958011703-44f9829ba187', '1563805042-7684c019e1cb', '1541783245831-57d6fb0926d3'],
  'Street Food': ['1611143669185-af224c5e3252', '1555126634-323283e090fa', '1568901346375-23c9450c58cd', '1552332386-f8dd00dc2f85'],
  Snack: ['1512621776951-a57141f2eefd', '1563245372-f21724e3856d', '1509440159596-0249088772ff', '1551183053-bf91a1d81141'],
  Bread: ['1509440159596-0249088772ff', '1549931319-a545dcf3bc73', '1555507036-ab1f4038808a', '1504754524776-8f4f37790ca0'],
  Beverage: ['1495474472287-4d71bcdd2085', '1544787219-7f47ccb76574', '1447933601403-0c6688de566e', '1571934811356-5cc061b6821f'],
  'Main Course': [
    '1504674900247-0877df9cc836',
    '1476224203421-9ac39bcb3327',
    '1555939594-58d7cb561ad1',
    '1544025162-d76694265947',
    '1467003909585-2f8a72700288',
    '1414235077428-338989a2e8c0',
    '1551504734-5ee1c4a1479b',
    '1604909052743-94e838986d24',
  ],
}

const PALETTES: Record<string, { accent: string; gradient: string }> = {
  Asia: {
    accent: '#e9cf84',
    gradient: 'linear-gradient(135deg,#241206 0%,#8a5214 55%,#d9a03c 100%)',
  },
  Europe: {
    accent: '#cfb98c',
    gradient: 'linear-gradient(135deg,#1d1309 0%,#6b4a1e 50%,#b98a4a 100%)',
  },
  Africa: {
    accent: '#e0a45c',
    gradient: 'linear-gradient(135deg,#241604 0%,#7c4a14 55%,#c9872f 100%)',
  },
  Americas: {
    accent: '#e87a4a',
    gradient: 'linear-gradient(135deg,#241204 0%,#8a2f14 55%,#cf6a2e 100%)',
  },
  Oceania: {
    accent: '#8fc0b3',
    gradient: 'linear-gradient(135deg,#101d21 0%,#2c5a60 55%,#7fb0a5 100%)',
  },
  MiddleEast: {
    accent: '#d9b557',
    gradient: 'linear-gradient(135deg,#1c1408 0%,#6b4a1e 55%,#c9a03c 100%)',
  },
}

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function poolFor(category: string): readonly string[] {
  return CATEGORY_POOL[category] ?? CATEGORY_POOL['Main Course']
}

/**
 * Editorial frame for a dish — curated photo when available, otherwise a
 * deterministic category-matched pick, plus a continent-tinted fallback
 * gradient so a slow or broken load still looks intentional.
 */
export function dishImagery(dish: Pick<Dish, 'id' | 'category' | 'continent'>): DishImagery {
  const photoId = CURATED[dish.id] ?? poolFor(dish.category)[hashString(dish.id) % poolFor(dish.category).length]
  const palette = PALETTES[dish.continent] ?? PALETTES.Americas
  return { src: img(photoId), gradient: palette.gradient, accent: palette.accent }
}

/** Backwards-compatible map for the original fifteen dishes. */
export const DISH_IMAGERY: Record<string, DishImagery> = Object.fromEntries(
  Object.keys(CURATED).map((id) => [id, dishImagery({ id, category: 'Main Course', continent: 'Europe' })]),
)

export const HERO_IMAGE = `${IMAGE_BASE}1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop`
export const ABOUT_IMAGE = `${IMAGE_BASE}1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop`
export const CULTURE_IMAGE = `${IMAGE_BASE}1476718406336-bb5a9690ee2a?q=80&w=1600&auto=format&fit=crop`

export const GALLERY_EXTRA: DishImagery[] = [
  {
    src: img('1482049016688-2d3e1b311543', 1200),
    gradient: 'linear-gradient(135deg,#241a10 0%,#7c5a2e 100%)',
    accent: '#c9a265',
  },
  {
    src: img('1476224203421-9ac39bcb3327', 1200),
    gradient: 'linear-gradient(135deg,#182018 0%,#55704a 100%)',
    accent: '#8aa873',
  },
  {
    src: img('1467003909585-2f8a72700288', 1200),
    gradient: 'linear-gradient(135deg,#1c1912 0%,#7a5a3a 100%)',
    accent: '#d3a06a',
  },
  {
    src: img('1551024506-0bccd828d307', 1200),
    gradient: 'linear-gradient(135deg,#221216 0%,#6e2a38 100%)',
    accent: '#cf7f8c',
  },
  {
    src: img('1414235077428-338989a2e8c0', 1200),
    gradient: 'linear-gradient(135deg,#141417 0%,#4c4638 100%)',
    accent: '#cfb98c',
  },
  {
    src: img('1504674900247-0877df9cc836', 1200),
    gradient: 'linear-gradient(135deg,#221709 0%,#8a5a1e 100%)',
    accent: '#d9a441',
  },
]
