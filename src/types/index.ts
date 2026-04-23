export type AssistantState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'muted';
export type Theme = 'light' | 'dark';

export interface Message {
  role: 'user' | 'assistant';
  time: string;
  text: string;
}

export interface Suggestion {
  i: string;
  t: string;
}
