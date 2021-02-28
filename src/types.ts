export type Username = string;
export type Description = string;
export type Emoji = string;
export interface IFeeling {
  id?: number;
  username: Username;
  description: Description;
  emoji: Emoji;
  time?: string;

}
