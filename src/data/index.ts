import type { Message, Suggestion } from '../types';

export const SAMPLE_TRANSCRIPT: Message[] = [
  {
    role: 'user',
    time: '2:41 PM',
    text: "Hey Lumo, I need to write a thank-you note to my coworker who covered for me last week. Something warm but not corny?",
  },
  {
    role: 'assistant',
    time: '2:41 PM',
    text: "Ah, love this — the sweet spot between a Hallmark card and a Slack message, right? Okay, try this: \"Sam, I really appreciate you jumping in last week. I didn't realize how much I was juggling until you took that off my plate. Coffee on me Friday?\" — warm, specific, low pressure. Want me to make it funnier, or keep it tidy?",
  },
  {
    role: 'user',
    time: '2:42 PM',
    text: "Can you make it a tiny bit funnier?",
  },
];

export const SUGGESTED: Suggestion[] = [
  { i: '✶', t: 'Summarize my unread emails from today' },
  { i: '✦', t: 'Plan a 3-day trip to Lisbon on a budget' },
  { i: '◈', t: 'Quiz me on Spanish past tense verbs' },
  { i: '✸', t: 'Help me debug a slow SQL query' },
];

export const STREAMING_MESSAGE: Message = {
  role: 'assistant',
  time: '2:43 PM',
  text: "Okay, punching it up a notch: \"Sam, I owe you one. Possibly several. You kept everything from imploding while I was out, and I'm not exaggerating when I say I was mentally preparing to throw my laptop into the ocean. Coffee Friday — and I'll throw in a pastry. You've earned it.\"",
};
