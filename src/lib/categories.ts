import { Category } from './types';

export const categories: Category[] = [
  {
    id: 'bhajans',
    name: 'Bhajans & Aartis',
    icon: '🙏',
    description: 'Devotional songs and daily prayers from Krishna, Shiva, Hanuman, and Devi traditions',
    youtubeQuery: 'hanuman chalisa krishna bhajan shiva aarti morning aarti daily devotional',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'gita',
    name: 'Gita & Vedic Wisdom',
    icon: '📖',
    description: 'Bhagavad Gita chapter-by-chapter, Vedic teachings, and Upanishad discourses',
    youtubeQuery: 'bhagavad gita chapter explained vedic wisdom upanishad swami sarvapriyananda',
    color: 'from-amber-500 to-yellow-600',
  },
  {
    id: 'meditation',
    name: 'Meditation & Mantra',
    icon: '🧘',
    description: 'Guided meditation, om chanting, mantra japa, and sleep mantras for inner peace',
    youtubeQuery: 'guided meditation hindi om chanting mantra meditation deep relaxation',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'astrology',
    name: 'Jyotish & Panchang',
    icon: '⭐',
    description: 'Vedic astrology guidance, daily panchang, rashi predictions, and muhurat timings',
    youtubeQuery: 'vedic astrology daily panchang rashi muhurat guidance today',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'talks',
    name: 'Guru Wisdom',
    icon: '💬',
    description: 'Life wisdom from Sadhguru, Sri Sri Ravi Shankar, and other spiritual masters',
    youtubeQuery: 'sadhguru spiritual wisdom life guidance guru sri sri ravi shankar',
    color: 'from-emerald-500 to-teal-600',
  },
];
