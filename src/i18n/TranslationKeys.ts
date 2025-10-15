export const I18nKeys = {
  Welcome: 'welcome',
  ExploreAdventure: 'exploreAdventure',
  GameIntro: 'gameIntro',
  JoinDiscussion: 'joinDiscussion',
  DiscussionDescription: 'discussionDescription',
} as const;

export type TranslationKeys = typeof I18nKeys[keyof typeof I18nKeys];

export type TranslationDict = Record<TranslationKeys, string>;

export type Lang = 'zh-CN' | 'en';
