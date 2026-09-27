export interface Incident {
  date: string;
  time?: string;
  damage: string;
  note: string;
  source?: { name: string; url: string };
}

export const BRIDGE = {
  name: "Bill Thorpe Walking Bridge",
  wikipedia: "https://en.wikipedia.org/wiki/Bill_Thorpe_Walking_Bridge",
};

// Newest first
export const INCIDENTS: Incident[] = [
  {
    date: "2025-10-17",
    damage: "Truck lodged under overpass",
    note: "Third strike in a month. Local businesses began running contests to predict the next one.",
    source: {
      name: "The Brunswickan",
      url: "https://thebruns.ca/why-do-trucks-keep-getting-stuck-under-the-bill-thorpe-bridge/",
    },
  },
  {
    date: "2025-09-19",
    damage: "Trailer damaged, driver charged",
    note: "Second strike in three days.",
    source: {
      name: "CBC News",
      url: "https://www.cbc.ca/news/canada/new-brunswick/truck-stuck-under-fredericton-bridge-1.7638726",
    },
  },
  {
    date: "2025-09-17",
    damage: "Truck stuck, driver charged",
    note: "Transport truck carrying alcohol.",
    source: {
      name: "CTV News Atlantic",
      url: "https://www.ctvnews.ca/atlantic/new-brunswick/article/transport-truck-gets-stuck-under-fredericton-overpass/",
    },
  },
];

// Total reported by the city and press; most older strikes aren't dated online
export const RECORDED_STRIKES = { total: 15, sinceYear: 2007 };

export const ZERO_DAY_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1506306460327-3164753b74c7?w=500&h=400&fit=crop&auto=format",
    alt: "Truck incident photo 1",
  },
  {
    src: "https://images.unsplash.com/photo-1596455671092-d7e08c435509?w=500&h=400&fit=crop&auto=format",
    alt: "Truck incident photo 2",
  },
  {
    src: "https://images.unsplash.com/photo-1711942179703-fce59b6afac6?w=500&h=400&fit=crop&auto=format",
    alt: "Truck incident photo 3",
  },
  {
    src: "https://images.unsplash.com/photo-1576538024608-799c500c37c0?w=500&h=400&fit=crop&auto=format",
    alt: "Truck incident photo 4",
  },
];
