import { JourneyPath } from './types';

export const journeyPaths: JourneyPath[] = [
  {
    id: 'gita-journey',
    title: 'Bhagavad Gita — Complete Journey',
    description: 'Go through the Gita chapter by chapter with guided explanations',
    steps: [
      { number: 1, title: "Arjuna's Despair (Ch 1)", description: 'Understanding the crisis that leads to spiritual seeking', youtubeQuery: 'bhagavad gita chapter 1 explained arjuna vishada yoga', level: 'start' },
      { number: 2, title: 'The Eternal Soul (Ch 2)', description: "Krishna's first teaching: the soul never dies", youtubeQuery: 'bhagavad gita chapter 2 sankhya yoga soul eternal', level: 'practice' },
      { number: 3, title: 'Karma Yoga (Ch 3)', description: 'How to act without attachment to results', youtubeQuery: 'bhagavad gita chapter 3 karma yoga action without attachment', level: 'deepen' },
      { number: 4, title: 'Wisdom & Detachment (Ch 4)', description: 'The meaning of sacrifice and divine knowledge', youtubeQuery: 'bhagavad gita chapter 4 jnana karma sanyasa yoga', level: 'deepen' },
      { number: 5, title: 'Renunciation (Ch 5)', description: 'True renunciation vs external withdrawal', youtubeQuery: 'bhagavad gita chapter 5 karma sanyasa yoga explained', level: 'deepen' },
      { number: 6, title: 'Meditation (Ch 6)', description: 'The discipline of the mind', youtubeQuery: 'bhagavad gita chapter 6 dhyana yoga meditation explained', level: 'master' },
    ],
  },
  {
    id: 'meditation-journey',
    title: 'Meditation — From Beginner to Deep Practice',
    description: 'A progressive meditation path — start with 5 minutes, grow to deep practice',
    steps: [
      { number: 1, title: 'Breath Awareness', description: 'Start with 5 minutes of simply watching your breath', youtubeQuery: 'beginner meditation breath awareness 5 minutes hindi', level: 'start' },
      { number: 2, title: 'Om Chanting Meditation', description: 'Using sound vibration to quiet the mind', youtubeQuery: 'om chanting meditation guided 15 minutes hindi', level: 'practice' },
      { number: 3, title: 'Mantra Japa', description: 'Repeating a sacred mantra with a mala', youtubeQuery: 'mantra meditation japa mala technique explained hindi', level: 'deepen' },
      { number: 4, title: 'Vipassana Introduction', description: 'Insight meditation — observing sensations', youtubeQuery: 'vipassana meditation introduction body scanning goenka', level: 'deepen' },
      { number: 5, title: 'Yoga Nidra (Deep Rest)', description: 'The practice of conscious sleep', youtubeQuery: 'yoga nidra deep rest guided 30 minutes hindi', level: 'master' },
    ],
  },
  {
    id: 'hanuman-devotion',
    title: 'Hanuman Sadhana — 7 Days of Devotion',
    description: 'A weekly practice to build strength, courage, and devotion through Hanuman worship',
    steps: [
      { number: 1, title: 'Day 1: Understanding Hanuman', description: 'Who is Hanuman and why is he the god of strength and devotion?', youtubeQuery: 'hanuman ji story significance who is hanuman hindi', level: 'start' },
      { number: 2, title: 'Day 2: Hanuman Chalisa', description: 'Learn and recite the Hanuman Chalisa with meaning', youtubeQuery: 'hanuman chalisa with meaning explained hindi', level: 'practice' },
      { number: 3, title: 'Day 3: Tuesday Vrat', description: 'The practice of fasting on Tuesdays for Hanuman', youtubeQuery: 'hanuman tuesday vrat how to perform hindi', level: 'practice' },
      { number: 4, title: 'Day 4: Sunderkand', description: 'The most powerful chapter of Ramayana', youtubeQuery: 'sunderkand explained significance why it is powerful', level: 'deepen' },
      { number: 5, title: 'Day 5: Bajrang Baan', description: "Hanuman's powerful prayer for protection", youtubeQuery: 'bajrang baan benefits how to recite hindi', level: 'deepen' },
      { number: 6, title: 'Day 6: Panchmukhi Hanuman', description: 'The five-faced Hanuman and its significance', youtubeQuery: 'panchmukhi hanuman significance five faces hindi', level: 'deepen' },
      { number: 7, title: 'Day 7: Complete Sadhana', description: 'Putting it all together — a daily Hanuman practice', youtubeQuery: 'daily hanuman puja vidhi morning routine hindi', level: 'master' },
    ],
  },
];
