import type { Message } from "#src/viewmodels/components/message.js";

export interface SummaryListRow {
  key: { text?: string; message?: Message };
  value: { text?: string; html?: string; message?: Message; href?: string };
  action?: {href: string };
}