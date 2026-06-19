import type {
  Message,
  TextOrMessage,
} from "#src/viewmodels/components/message.js";
import type { Tag } from "#src/viewmodels/components/tag.js";

export interface SummaryList {
  card?: SummaryCard;
  rows: SummaryListRow[];
  attributes: { id: string };
}

export interface SummaryListRow {
  key: Message;
  value: SummaryListRowValue;
  actions?: SummaryListRowActions;
}

type SummaryListRowValue =
  | { type: "text"; value: TextOrMessage }
  | { type: "texts"; values: TextOrMessage[] }
  | { type: "tag"; value: TextOrMessage; tag: Tag }
  | { type: "link"; value: { text: TextOrMessage; href: string} };

interface SummaryListRowActions {
  items: SummaryListRowActionItem[];
}

interface SummaryListRowActionItem {
  href: string;
  text: TextOrMessage;
  visuallyHiddenText: Message;
}

interface SummaryCard {
  title: { text: TextOrMessage };
  actions?: SummaryListRowActions;
}