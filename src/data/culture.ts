import type { CultureChapter, Festival } from './types'

export const cultureChapters: CultureChapter[] = [
  {
    era: '10,000 BCE',
    title: 'The Fire',
    text: 'Controlled fire rewires human eating. Meats are cooked, toxins neutralised, and the jaw shrinks while the brain grows. Eating becomes social: the fire is the first restaurant, the first kitchen, the first hearth where stories are told.',
    facts: ['Cooking predates bread by 100,000 years', 'The first "kitchens" were ringed stones', 'Cooked food freed energy for culture'],
    accent: 'fire',
  },
  {
    era: '3000 BCE',
    title: 'The Spice Roads',
    text: 'Cinnamon, pepper and saffron travel further than armies. Trade routes tie India, the Levant and China to Europe and Africa. Spice is wealth, medicine, religion and status — a seed that pays for empires.',
    facts: ['Pepper once counted out grain by grain', 'The spice trade funded the Age of Sail', 'Saffron is still the world\u2019s priciest spice'],
    accent: 'spice',
  },
  {
    era: '1492',
    title: 'The Columbian Exchange',
    text: 'The Old World and the New trade more than gold. Tomatoes, potatoes, chillies, cacao and maize sail east; cattle, wheat and pigs sail west. Every cuisine on earth is rewritten — pizza, pho, mole and butter chicken all owe their existence to this single exchange.',
    facts: ['Tomatoes were once feared as poisonous', 'Chillies became the soul of Indian and Thai food', 'Potatoes fed a European population boom'],
    accent: 'sea',
  },
  {
    era: '1900s',
    title: 'The Industrial Table',
    text: 'Canning, refrigeration and freight transform how a family eats. Food leaves the farm and enters the factory; convenience wins, seasonality fades. Cookbooks, restaurants and chefs are born as professions, and cuisine becomes an art to study.',
    facts: ['The first cookbook dates to ancient Rome', 'Canned food fought both world wars', 'The modern chef uniform comes from a Parisian kitchen'],
    accent: 'field',
  },
  {
    era: 'Today',
    title: 'The Return',
    text: 'A global food culture pushes back — slow food, farm-to-table, heritage grains, fermentation revival. We are rediscovering what our grandmothers knew: that a dish is a story, a region, a season and a handshake across generations.',
    facts: ['Fermentation is 8,000 years old and trending again', 'Heritage crops are being replanted worldwide', 'UNESCO protects food as heritage, not just monuments'],
    accent: 'table',
  },
]

export const festivals: Festival[] = [
  {
    name: 'La Tomatina',
    country: 'Spain',
    flag: '🇪🇸',
    month: 'August',
    dish: 'Paella de Marisco',
    dishId: 'paella',
    text: 'Bu\u00f1ol drowns itself in 120 tonnes of tomatoes, then sits down to an open-air paella cooked over vine fires for the entire town.',
  },
  {
    name: 'T\u1ebft Nguy\u00ean \u0110\u00e1n',
    country: 'Vietnam',
    flag: '🇻🇳',
    month: 'February',
    dish: 'Ph\u1edf B\u00f2',
    dishId: 'pho',
    text: 'The Lunar New Year begins with steaming ph\u1edf and b\u00e1nh ch\u01b0ng, square sticky-rice cakes said to mirror the shape of the earth.',
  },
  {
    name: 'D\u00eda de Muertos',
    country: 'Mexico',
    flag: '🇲🇽',
    month: 'November',
    dish: 'Mole Poblano',
    dishId: 'mole',
    text: 'Families set mole, pan de muerto and cempas\u00fachil on ofrendas — so the departed can smell the kitchen of home once more.',
  },
  {
    name: 'Hanami',
    country: 'Japan',
    flag: '🇯🇵',
    month: 'April',
    dish: 'Nigiri Sushi',
    dishId: 'sushi',
    text: 'Cherry-blossom viewing becomes a movable feast: bento boxes, sakura mochi and chilled sake under the petals.',
  },
  {
    name: 'Tom\u00e1tina de la Paella',
    country: 'Spain',
    flag: '🇪🇸',
    month: 'March',
    dish: 'Paella de Marisco',
    dishId: 'paella',
    text: 'Valencia\u2019s Fira de la Paella crowns the year\u2019s finest pan in a contest judged by the city\u2019s most exacting grandmothers.',
  },
  {
    name: 'Eid al-Fitr',
    country: 'Morocco',
    flag: '🇲🇦',
    month: 'May',
    dish: 'Chicken Tagine',
    dishId: 'tagine',
    text: 'After Ramadan\u2019s fast, lamb and tagines simmer in every courtyard — generosity measured in how many neighbours are fed.',
  },
]

export const mapMarkers = [
  { id: 'paella', x: 46, y: 34, label: 'Valencia', flag: '🇪🇸' },
  { id: 'pho', x: 81, y: 52, label: 'Hanoi', flag: '🇻🇳' },
  { id: 'ramen', x: 85, y: 40, label: 'Fukuoka', flag: '🇯🇵' },
  { id: 'tacos', x: 20, y: 46, label: 'Mexico City', flag: '🇲🇽' },
  { id: 'margherita', x: 52, y: 33, label: 'Naples', flag: '🇮🇹' },
  { id: 'butter-chicken', x: 70, y: 47, label: 'Delhi', flag: '🇮🇳' },
  { id: 'tagine', x: 44, y: 38, label: 'Marrakesh', flag: '🇲🇦' },
  { id: 'sushi', x: 86, y: 44, label: 'Tokyo', flag: '🇯🇵' },
  { id: 'mole', x: 21, y: 50, label: 'Puebla', flag: '🇲🇽' },
]
