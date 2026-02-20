export type Personality = 'cozy' | 'zen' | 'social';

export interface Option {
  emoji: string;
  label: string;
  personality: Personality;
}

export interface Question {
  text: string;
  options: Option[];
}

export const QUESTIONS: Question[] = [
  {
    text: 'Pick your Hogwarts house',
    options: [
      { emoji: '🦁', label: 'Gryffindor — brave and bold', personality: 'social' },
      { emoji: '🦅', label: 'Ravenclaw — thoughtful and independent', personality: 'zen' },
      { emoji: '🦡', label: 'Hufflepuff — loyal and warm', personality: 'cozy' },
      { emoji: '🐍', label: 'Slytherin — strategic and ambitious', personality: 'social' },
    ],
  },
  {
    text: "It's Friday night. Friends are picking a movie. You choose:",
    options: [
      { emoji: '🛋️', label: 'A cozy rom-com everyone knows by heart', personality: 'cozy' },
      { emoji: '🎬', label: "An indie film with subtitles you've been meaning to watch", personality: 'zen' },
      { emoji: '🍿', label: 'Whatever the group wants — you just love movie nights', personality: 'social' },
    ],
  },
  {
    text: 'Your Netflix profile looks like:',
    options: [
      { emoji: '🔁', label: 'The same 3 comfort shows on repeat', personality: 'cozy' },
      { emoji: '📺', label: 'One carefully chosen series at a time, no bingeing', personality: 'zen' },
      { emoji: '👥', label: "A mix of everything — always getting recs from friends", personality: 'social' },
    ],
  },
  {
    text: "You're at a party. Where are you?",
    options: [
      { emoji: '🛋️', label: "Curled up with the host's dog in the corner", personality: 'cozy' },
      { emoji: '🌿', label: 'On the balcony, enjoying a quiet moment', personality: 'zen' },
      { emoji: '🎉', label: "Somehow knowing everyone's name by hour two", personality: 'social' },
    ],
  },
  {
    text: 'Pick your dream vacation:',
    options: [
      { emoji: '🏡', label: 'A countryside cottage with books and blankets', personality: 'cozy' },
      { emoji: '🏔️', label: 'A solo hiking trip with no itinerary', personality: 'zen' },
      { emoji: '🌍', label: 'A group trip with friends, packed schedule', personality: 'social' },
    ],
  },
];

export const PERSONALITIES: Record<Personality, { name: string; coffee: string; tagline: string; emoji: string }> = {
  cozy: {
    name: 'Cozy Classic',
    coffee: 'Medium Roast Drip',
    tagline: 'Comfort in every cup',
    emoji: '☕',
  },
  zen: {
    name: 'Zen Minimalist',
    coffee: 'Black Coffee, Single Origin',
    tagline: 'Simple. Clean. Perfect.',
    emoji: '🍵',
  },
  social: {
    name: 'Social Butterfly',
    coffee: 'Cappuccino',
    tagline: 'Coffee is better with company',
    emoji: '✨',
  },
};
