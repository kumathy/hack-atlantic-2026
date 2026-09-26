export interface Incident {
  date: string;
  location: string;
  bridge: string;
  damage: string;
  note: string;
  photo: string;
}

export const INCIDENTS: Incident[] = [
  {
    date: "2024-09-24",
    location: "Gregson St. Underpass",
    bridge: "US-70 Overpass",
    damage: "Moderate structural damage",
    note: "Box truck carrying HVAC units. Driver claimed GPS told him to go that way.",
    photo:
      "https://images.unsplash.com/photo-1506306460327-3164753b74c7?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "2024-03-11",
    location: "11-foot-8 Bridge, Raleigh NC",
    bridge: "Norfolk Southern Rail Overpass",
    damage: "Roof sheered clean off",
    note: "Third hit this year. The bridge remains completely unbothered.",
    photo:
      "https://images.unsplash.com/photo-1596455671092-d7e08c435509?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "2023-11-02",
    location: "Gregson St. Underpass",
    bridge: "US-70 Overpass",
    damage: "Minor denting to superstructure",
    note: "Moving truck. The movers were moving themselves out of a job.",
    photo:
      "https://images.unsplash.com/photo-1711942179703-fce59b6afac6?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "2023-06-17",
    location: "11-foot-8 Bridge, Raleigh NC",
    bridge: "Norfolk Southern Rail Overpass",
    damage: "Refrigerated trailer destroyed",
    note: "Ice cream truck. The irony was noted by every single witness.",
    photo:
      "https://images.unsplash.com/photo-1576538024608-799c500c37c0?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "2022-08-29",
    location: "11-foot-8 Bridge, Raleigh NC",
    bridge: "Norfolk Southern Rail Overpass",
    damage: "Cab roof partially removed",
    note: "Rental truck. The rental company was not pleased.",
    photo:
      "https://images.unsplash.com/photo-1506306460327-3164753b74c7?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "2022-01-14",
    location: "Gregson St. Underpass",
    bridge: "US-70 Overpass",
    damage: "Truck wedged, traffic halted 4 hours",
    note: "The driver had 11 years of experience. None of it applicable here.",
    photo:
      "https://images.unsplash.com/photo-1596455671092-d7e08c435509?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "2021-07-04",
    location: "11-foot-8 Bridge, Raleigh NC",
    bridge: "Norfolk Southern Rail Overpass",
    damage: "Complete roof peel on Independence Day",
    note: "Fireworks truck. No fireworks were harmed. The truck was not so lucky.",
    photo:
      "https://images.unsplash.com/photo-1711942179703-fce59b6afac6?w=600&h=400&fit=crop&auto=format",
  },
  {
    date: "2020-02-20",
    location: "11-foot-8 Bridge, Raleigh NC",
    bridge: "Norfolk Southern Rail Overpass",
    damage: "Significant trailer damage",
    note: "The sign clearly reads 11ft 8in. It always has. It always will.",
    photo:
      "https://images.unsplash.com/photo-1576538024608-799c500c37c0?w=600&h=400&fit=crop&auto=format",
  },
];

/** Set to today's date to trigger the 0-day "OH NO" view. */
export const LAST_INCIDENT_DATE = "2026-09-25";

/** The streak that ended when the last incident happened (2024-03-11 → 2024-09-24). */
export const PREVIOUS_STREAK_DAYS = 197;

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
