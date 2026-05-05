import type {
  Message,
  TextOrMessage,
} from "#src/viewmodels/components/message.js";

export interface SummaryListRow {
  key: Message;
  value: SummaryValue;
  action?: { href: string; };
}

type SummaryValue =
  | { type: "text"; value: TextOrMessage }
  | { type: "texts"; values: TextOrMessage[] }
  | { type: "tag"; value: TextOrMessage; tag: { text: TextOrMessage; classes: string } }
  | { type: "link"; value: { text: TextOrMessage; href: string} };