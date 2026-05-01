import type { Message } from "#src/viewmodels/components/message.js";

export interface SummaryListRow {
  key: { message: Message };
  value: { text?: string; message?: Message; tag?: { message: Message; classes: string }, html?: string; href?: string };
  action?: { href?: string; };
}