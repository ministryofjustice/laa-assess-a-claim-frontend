import type {
  Message,
  TextOrMessage,
} from "#src/viewmodels/components/message.js";
import type { Tag } from "#src/viewmodels/components/tag.js";

export interface SummaryListRow {
  key: Message;
  value: SummaryValue;
  action?: { href: string; };
}

type SummaryValue =
  | { type: "text"; value: TextOrMessage }
  | { type: "texts"; values: TextOrMessage[] }
  | { type: "tag"; value: TextOrMessage; tag: Tag }
  | { type: "link"; value: { text: TextOrMessage; href: string} };