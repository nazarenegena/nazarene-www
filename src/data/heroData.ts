export const animeItems = [
  { src: "bleach.jpeg", label: "BL", rotate: -2 },
  { src: "mha.jpeg", label: "MH", rotate: 3 },
  { src: "sakamoto_days.webp", label: "SD", rotate: -1 },
  { src: "black_clover.jpeg", label: "BC", rotate: 1 },
  { src: "dandandan.jpeg", label: "DD", rotate: 2 },
];

interface Polaroid {
  src: string;
  caption: string;
  rotate: number;
  top: string;
  right?: string;
  left?: string;
  tooltip: string;
}

export const polaroids: Polaroid[] = [
  {
    src: "/photos/sunset.jpg",
    caption: "sunset",
    rotate: 8,
    top: "65%",
    right: "45%",
    tooltip: "golden hour magic",
  },
  {
    src: "/photos/flowers.jpg",
    caption: "flowers",
    rotate: -9,
    top: "62%",
    right: "35%",
    tooltip: "nature's art",
  },
  {
    src: "/photos/cream_flower.jpg",
    caption: "cream",
    rotate: 10,
    top: "30%",
    right: "15%",
    tooltip: "taken on a good day",
  },
  {
    src: "/photos/rose.jpg",
    caption: "rose",
    rotate: -6,
    top: "18%",
    left: "24%",
    tooltip: "this one smells nice",
  },
  {
    src: "/photos/hike.jpg",
    caption: "hike",
    rotate: -3,
    top: "60%",
    right: "12%",
    tooltip: "worth the climb",
  },
  {
    src: "/photos/white_flowers.jpg",
    caption: "sunflowers",
    rotate: 8,
    top: "17%",
    left: "14%",
    tooltip: "perfect lighting",
  },
  {
    src: "/photos/art_gallery.jpg",
    caption: "art",
    rotate: 3,
    top: "60%",
    right: "2%",
    tooltip: "feeling cultured",
  },
  {
    src: "/photos/books.jpg",
    caption: "reading",
    rotate: -8,
    top: "34%",
    right: "5%",
    tooltip: "lost in pages",
  },
];

export const terminalLines: [string, string][] = [
  ["whoami", "nazarene. dev. nairobi-based."],
  ["cat stack.txt", "Javascript / TypeScript / React.js / "],
  ["cat status.txt", "open to work ✦"],
];
