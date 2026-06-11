import fs from "node:fs";
import path from "node:path";
import type { AnalysisDoc } from "./analysisDoc.js";
import type { SearchResult } from "./searchResult.js";
import { type EnrichmentDoc, type EnrichmentItem, isEnrichmentDoc } from "./enrichmentDoc.js";

const SEARCH_DATA_DIR = path.resolve(process.cwd(), "src/demo-data/search");
const ANALYSIS_DATA_DIR = path.resolve(process.cwd(), "src/demo-data/analysis");
const ENRICHMENT_DATA_DIR = path.resolve(process.cwd(), "src/demo-data/enrichments");

/**
 * Parse JSON from a local file.
 * @param {string} filePath Path to the JSON file.
 * @returns {unknown} Parsed JSON content.
 */
function readJsonFile(filePath: string): unknown {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as unknown;
}

/**
 * Check whether parsed JSON looks like a search result.
 * @param {unknown} value Parsed JSON value.
 * @returns {boolean} True when the value matches the minimum search result shape.
 */
function isSearchResult(value: unknown): value is SearchResult {
  return (
    typeof value === "object" &&
    value !== null &&
    "_id" in value &&
    "_source" in value
  );
}

/**
 * Check whether parsed JSON looks like an analysis document.
 * @param {unknown} value Parsed JSON value.
 * @returns {boolean} True when the value matches the minimum analysis document shape.
 */
function isAnalysisDoc(value: unknown): value is AnalysisDoc {
  return (
    typeof value === "object" &&
    value !== null &&
    "Blocks" in value &&
    Array.isArray(value.Blocks)
  );
}

/**
 * Get a search result for an evidence ID.
 * @param {string} evidenceId Evidence ID used as the search result filename.
 * @returns {SearchResult} Search result JSON.
 */
export function getSearchResult(evidenceId: string): SearchResult {
  if (evidenceId === "") {
    throw new Error("Missing evidenceId");
  }

  const filePath = path.join(SEARCH_DATA_DIR, `${evidenceId}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Search result not found for evidenceId ${evidenceId}`);
  }

  const parsed = readJsonFile(filePath);

  if (!isSearchResult(parsed)) {
    throw new Error(`Invalid search result JSON for evidenceId ${evidenceId}`);
  }

  return parsed;
}

/**
 * Get the Textract analysis document for a PDF filename.
 * @param {string} documentFileName PDF filename from the search result.
 * @returns {AnalysisDoc} Textract analysis JSON.
 */
export function getAnalysisDoc(documentFileName: string): AnalysisDoc {
  if (documentFileName === "") {
    throw new Error("Missing documentFileName");
  }

  const textractFileName = `${documentFileName}.textract.json`;
  const filePath = path.join(ANALYSIS_DATA_DIR, textractFileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Analysis doc not found for ${documentFileName}`);
  }

  const parsed = readJsonFile(filePath);

  if (!isAnalysisDoc(parsed)) {
    throw new Error(`Invalid analysis doc JSON for ${documentFileName}`);
  }

  return parsed;
}

/**
 * Get every demo search result.
 * @returns {SearchResult[]} All search result JSON files.
 */
export function getAllSearchResults(): SearchResult[] {
  const files = fs
    .readdirSync(SEARCH_DATA_DIR)
    .filter((file) => file.endsWith(".json"));

  return files.map((file) => {
    const filePath = path.join(SEARCH_DATA_DIR, file);
    const parsed = readJsonFile(filePath);

    if (!isSearchResult(parsed)) {
      throw new Error(`Invalid search result JSON in ${file}`);
    }

    return parsed;
  });
}

/**
 * Get enrichment data for a document.
 * @param {string} documentFileName PDF filename from the search result.
 * @returns {EnrichmentDoc} Enrichment JSON.
 */
function getEnrichmentDoc(documentFileName: string): EnrichmentDoc {
  if (documentFileName === "") {
    throw new Error("Missing documentFileName");
  }

  const filePath = path.join(ENRICHMENT_DATA_DIR, `${documentFileName}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Enrichment doc not found for ${documentFileName}`);
  }

  const parsed = readJsonFile(filePath);

  if (!isEnrichmentDoc(parsed)) {
    throw new Error(`Invalid enrichment JSON for ${documentFileName}`);
  }

  return parsed;
}

/**
 * Get enrichment item matching a search result page.
 * @param {SearchResult} searchResult Search result JSON.
 * @returns {EnrichmentItem | null} Matching enrichment item.
 */
export function getEnrichmentForSearchResult(
  searchResult: SearchResult,
): EnrichmentItem | null {
  const searchPages = searchResult._source.pages ?? [];

  if (searchPages.length === 0) {
    return null;
  }

  const enrichmentDoc = getEnrichmentDoc(searchResult._source.document_id);

  return (
    enrichmentDoc.items.find((item: { pages: number[]; }) =>
      item.pages.some((page) => searchPages.includes(page)),
    ) ?? null
  );
}