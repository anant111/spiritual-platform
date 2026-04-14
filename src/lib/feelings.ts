import { Feeling } from './types';

export const feelings: Feeling[] = [
  {
    id: 'peaceful',
    label: 'Peaceful',
    emoji: '😌',
    youtubeQuery: 'peaceful meditation om chanting morning calm',
    causes: [
      { id: 'peaceful-gratitude', label: 'Feeling grateful', youtubeQuery: 'gratitude meditation morning thanksgiving' },
      { id: 'peaceful-prayer', label: 'After prayer', youtubeQuery: 'morning aarti peaceful devotional' },
      { id: 'peaceful-nature', label: 'In nature', youtubeQuery: 'nature meditation peaceful sounds om' },
      { id: 'peaceful-just', label: 'Just peaceful', youtubeQuery: 'peaceful meditation calm guided' },
    ],
  },
  {
    id: 'happy',
    label: 'Happy',
    emoji: '😊',
    youtubeQuery: 'happy devotional bhajan krishna kirtan joy',
    causes: [
      { id: 'happy-blessing', label: 'Feeling blessed', youtubeQuery: 'blessed devotional gratitude bhajan' },
      { id: 'happy-celebration', label: 'Celebrating', youtubeQuery: 'celebration kirtan devotional joy' },
      { id: 'happy-love', label: 'In love', youtubeQuery: 'krishna love bhakti devotional romantic' },
      { id: 'happy-just', label: 'Just happy', youtubeQuery: 'happy devotional bhajan joy' },
    ],
  },
  {
    id: 'anxious',
    label: 'Anxious',
    emoji: '😰',
    youtubeQuery: 'anxiety relief meditation calming mantra breathing',
    causes: [
      { id: 'anxious-work', label: 'Work stress', youtubeQuery: 'work stress relief meditation calming' },
      { id: 'anxious-overthinking', label: 'Overthinking', youtubeQuery: 'overthinking relief nadi shodhana pranayama' },
      { id: 'anxious-future', label: 'Worried about future', youtubeQuery: 'future anxiety relief gita wisdom guidance' },
      { id: 'anxious-just', label: 'Just anxious', youtubeQuery: 'anxiety relief calming meditation mantra' },
    ],
  },
  {
    id: 'sad',
    label: 'Sad',
    emoji: '😢',
    youtubeQuery: 'sadness comfort grief healing mantra peace',
    causes: [
      { id: 'sad-loss', label: 'Lost someone', youtubeQuery: 'grief comfort healing bhagavad gita soul' },
      { id: 'sad-lonely', label: 'Feeling alone', youtubeQuery: 'loneliness comfort krishna bhajan devotion' },
      { id: 'sad-heartbreak', label: 'Heartbreak', youtubeQuery: 'heartbreak healing krishna love comfort' },
      { id: 'sad-just', label: 'Just sad', youtubeQuery: 'sadness comfort healing mantra peace' },
    ],
  },
  {
    id: 'angry',
    label: 'Angry',
    emoji: '😤',
    youtubeQuery: 'anger management cooling pranayama shiva mantra',
    causes: [
      { id: 'angry-frustrated', label: 'Frustrated', youtubeQuery: 'frustration relief cooling breathing patience' },
      { id: 'angry-hurt', label: 'Feeling hurt', youtubeQuery: 'hurt healing forgiveness shiva mantra' },
      { id: 'angry-injustice', label: 'Injustice', youtubeQuery: 'injustice patience gita wisdom dharma' },
      { id: 'angry-just', label: 'Just angry', youtubeQuery: 'anger management cooling pranayama shiva mantra' },
    ],
  },
  {
    id: 'restless',
    label: 'Restless',
    emoji: '🌀',
    youtubeQuery: 'restless mind calming meditation sleep yoga nidra',
    causes: [
      { id: 'restless-sleep', label: 'Can\'t sleep', youtubeQuery: 'sleep yoga nidra hanuman chalisa bedtime' },
      { id: 'restless-focus', label: 'Can\'t focus', youtubeQuery: 'focus concentration trataka candle gazing' },
      { id: 'restless-overwhelmed', label: 'Overwhelmed', youtubeQuery: 'overwhelmed relief grounding meditation calm' },
      { id: 'restless-just', label: 'Just restless', youtubeQuery: 'restless mind calming meditation sleep' },
    ],
  },
];
