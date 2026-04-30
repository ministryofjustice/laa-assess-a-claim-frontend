import type { Message } from "#src/viewmodels/components/message.js";

export interface SummaryListRow {
  key: { message: Message };
  value: { text?: string; message?: Message };
  action?: { href?: string; tag?: { text: string; classes: string } };
}