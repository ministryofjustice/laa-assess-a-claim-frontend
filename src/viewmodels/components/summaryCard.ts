import { SummaryListRow } from "./summaryList.js";

export interface SummaryCard {
  title: string;
  rows: SummaryListRow[];
}