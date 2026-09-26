export interface Incident {
  date: string;
  damage: string;
  note: string;
  /** Placeholder stock photo until we have rights to a real one. */
  photo: string;
  source: { name: string; url: string };
}

/** Every incident is at this bridge, so it's stated once rather than per entry. */
export const BRIDGE = {
  name: "Bill Thorpe Walking Bridge",
  location: "Waterloo Row underpass, Fredericton NB",
};

/** Newest first. Only strikes we could date from a published source. */
export const INCIDENTS: Incident[] = [
  {
    date: "2025-10-17",
    damage: "Truck lodged under overpass",
    note: "Third strike in a month. Local businesses began running contests to predict the next one.",
    photo:
      "https://images.unsplash.com/photo-1506306460327-3164753b74c7?w=600&h=400&fit=crop&auto=format",
    source: {
      name: "The Brunswickan",
      url: "https://thebruns.ca/why-do-trucks-keep-getting-stuck-under-the-bill-thorpe-bridge/",
    },
  },
  {
    date: "2025-09-19",
    damage: "Trailer damaged, driver charged",
    note: "Second strike in three days.",
    photo:
      "https://images.unsplash.com/photo-1596455671092-d7e08c435509?w=600&h=400&fit=crop&auto=format",
    source: {
      name: "CBC News",
      url: "https://www.cbc.ca/news/canada/new-brunswick/truck-stuck-under-fredericton-bridge-1.7638726",
    },
  },
  {
    date: "2025-09-17",
    damage: "Truck stuck, driver charged",
    note: "Transport truck carrying alcohol.",
    photo:
      "https://images.unsplash.com/photo-1711942179703-fce59b6afac6?w=600&h=400&fit=crop&auto=format",
    source: {
      name: "CTV News Atlantic",
      url: "https://www.ctvnews.ca/atlantic/new-brunswick/article/transport-truck-gets-stuck-under-fredericton-overpass/",
    },
  },
];

/**
 * Strikes the City of Fredericton and press have counted overall. Most older
 * ones aren't individually dated online, so the timeline only shows a subset.
 */
export const RECORDED_STRIKES = { total: 15, sinceYear: 2007 };

/** To preview the 0-day "OH NO" view, temporarily replace with today's date. */
export const LAST_INCIDENT_DATE = INCIDENTS[0].date;

/** Photos shown when days = 0. */
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
