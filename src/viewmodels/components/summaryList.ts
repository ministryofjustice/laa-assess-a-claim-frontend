import type { Message } from "#src/viewmodels/components/message.js";

export interface SummaryListRow {
  key: { message: Message };
  value: { text?: string; message?: Message; tag?: { text: string; classes: string } };
  action?: { href?: string; };
}