export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
}

export interface Category {
  id: string;
  name: string;
  nameHindi: string;
  icon: string;
  description: string;
  youtubeQuery: string;
  color: string;
}

export interface SpiritualNeed {
  id: string;
  icon: string;
  title: string;
  titleHindi: string;
  description: string;
  youtubeQuery: string;
}

export interface JourneyPath {
  id: string;
  title: string;
  description: string;
  steps: JourneyStep[];
}

export interface JourneyStep {
  number: number;
  title: string;
  description: string;
  youtubeQuery: string;
  level: 'start' | 'practice' | 'deepen' | 'master';
}

export interface ProblemSolution {
  id: string;
  problem: string;
  problemHindi: string;
  icon: string;
  description: string;
  traditionContext: string;
  practice: string;
  practiceSteps: string[];
  youtubeQuery: string;
}
