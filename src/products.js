export const localProducts = [
  { name: 'Death By Chocolate', note: 'A rich sundae for chocolate lovers', image: '/products/death-by-chocolate.webp', video: '/products/death-by-chocolate-video.mp4?v=2', color: '#6f3c23', accent: '#d49a69', theme: { background: '#332019', text: '#f9e8d5', muted: '#c6a58e', line: '#d49a6933', glow: '#d49a6933' } },
  { name: 'Karibean Cocktail', note: 'A chocolate sundae topped with cherry', image: '/products/karibean-cocktail.webp', video: '/products/karibean-cocktail-video.mp4?v=2', color: '#93634e', accent: '#e2b28f', theme: { background: '#342923', text: '#f5e8dc', muted: '#c8b6a7', line: '#e2b28f33', glow: '#e2b28f33' } },
  { name: 'Rajadhani Special', note: 'Three scoops with a crunchy topping', image: '/products/rajadhani-special.webp', video: '/products/rajadhani-special-video.mp4?v=2', color: '#c78d36', accent: '#f0ce84', theme: { background: '#3b3020', text: '#fff2d6', muted: '#d2bd94', line: '#f0ce8433', glow: '#f0ce8433' } },
  { name: 'Berry Falooda', note: 'A fruity falooda layered with berries', image: '/products/berry-falooda.webp', video: '/products/berry-falooda-video.mp4?v=2', color: '#d8818d', accent: '#f2b3bd', theme: { background: '#47282c', text: '#ffe8e5', muted: '#d5a9a7', line: '#f2b3bd33', glow: '#f2b3bd33' } },
  { name: 'Screwdriver', note: 'A tall, indulgent sundae', image: '/products/screwdriver.webp', video: '/products/screwdriver-video.mp4?v=2', color: '#7b492c', accent: '#d99c6b', theme: { background: '#332319', text: '#f9e8d5', muted: '#c5a58e', line: '#d99c6b33', glow: '#d99c6b33' } },
  { name: 'Watermelon Candy', note: 'A cool watermelon treat', image: '/products/watermelon-candy.webp', video: '/products/watermelon-candy-video.mp4?v=2', color: '#d75a69', accent: '#f4a0a5', theme: { background: '#3d2026', text: '#ffe8e5', muted: '#d5a6a7', line: '#f4a0a533', glow: '#f4a0a533' } },
  { name: 'Magic Lime', note: 'A refreshing lime ice pop', image: '/products/magic-lime.webp', video: '/products/magic-lime-video.mp4?v=2', color: '#4eb8d7', accent: '#9de6ef', theme: { background: '#173443', text: '#e3f7fa', muted: '#a4cbd2', line: '#9de6ef33', glow: '#9de6ef33' } },
  { name: 'Choco Crunch', note: 'Chocolate crunch to enjoy at home', image: '/products/choco-crunch.webp', video: '/products/choco-crunch-video.mp4?v=2', color: '#2359bd', accent: '#8bb6ff', theme: { background: '#18223d', text: '#e8eeff', muted: '#a8b8d5', line: '#8bb6ff33', glow: '#8bb6ff33' } },
];

export function normalizeProducts(products) {
  const fields = ['name', 'note', 'image', 'video', 'color', 'accent'];
  const themeFields = ['background', 'text', 'muted', 'line', 'glow'];
  if (!products.length || products.some((product) =>
    !product || !Number.isInteger(product.order) || product.order < 0 ||
    fields.some((field) => typeof product[field] !== 'string' || !product[field].trim()) ||
    !product.theme || themeFields.some((field) => typeof product.theme[field] !== 'string' || !product.theme[field].trim())
  )) {
    throw new Error('The products collection is empty or contains an invalid product.');
  }
  if (new Set(products.map((product) => product.order)).size !== products.length) {
    throw new Error('Product order values must be unique.');
  }
  return [...products].sort((a, b) => a.order - b.order);
}
