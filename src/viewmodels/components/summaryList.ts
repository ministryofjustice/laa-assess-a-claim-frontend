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
  | { type: "tag";  text: TextOrMessage; tag: TextOrMessage; classes: string }
  | { type: "link"; text: TextOrMessage; href: string };