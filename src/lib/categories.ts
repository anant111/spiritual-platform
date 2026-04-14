import { Category } from './types';

export const categories: Category[] = [
  {
    id: 'bhajans',
    name: 'Bhajans',
    icon: '🙏',
    description: 'Devotional songs and daily prayers',
    youtubeQuery: 'hanuman chalisa krishna bhajan shiva aarti morning aarti daily devotional',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'gita',
    name: 'Gita',
    icon: '📖',
    description: 'Bhagavad Gita and Vedic teachings',
    youtubeQuery: 'bhagavad gita chapter explained vedic wisdom upanishad swami sarvapriyananda',
    color: 'from-amber-500 to-yellow-600',
  },
  {
    id: 'meditation',
    name: 'Meditation',
    icon: '🧘',
    description: 'Guided meditation, om chanting, and mantras',
    youtubeQuery: 'guided meditation hindi om chanting mantra meditation deep relaxation',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'astrology',
    name: 'Jyotish',
    icon: '⭐',
    description: 'Vedic astrology and panchang',
    youtubeQuery: 'vedic astrology daily panchang rashi muhurat guidance today',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'talks',
    name: 'Guru Wisdom',
    icon: '💬',
    description: 'Teachings from spiritual masters',
    youtubeQuery: 'sadhguru spiritual wisdom life guidance guru sri sri ravi shankar',
    color: 'from-emerald-500 to-teal-600',
  },
];
