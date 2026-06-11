export interface EnrichmentItem {
  pages: number[];
  document_type: string;
  source_title: string | null;
  start_date: string | null;
  end_date: string | null;
  key_details: string;
  likely_purpose: string;
  confidence: string;
}

export interface EnrichmentDoc {
  items: EnrichmentItem[];
}

//  16:1  error  Missing JSDoc block description           jsdoc/require-description
//  16:1  error  Missing JSDoc @returns declaration        jsdoc/require-returns
//  18:1  error  Missing JSDoc @param "value" description  jsdoc/require-param-description
//  18:1  error  Missing JSDoc @param "value" type         jsdoc/require-param-type

/**
 * Checks if is enrichmentdoc
 * @param {unknown} value the value
 * @returns {unknown} wether its a a doc 
 */
export function isEnrichmentDoc(value: unknown): value is EnrichmentDoc {
  return (
    typeof value === "object" &&
    value !== null &&
    "items" in value &&
    Array.isArray(value.items)
  );
}