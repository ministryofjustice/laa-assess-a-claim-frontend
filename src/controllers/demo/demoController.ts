import { processError } from "#src/helpers/index.js";
import {
  getAllSearchResults,
  getAnalysisDoc,
  getSearchResult,
} from "#src/services/demo/evidenceService.js";
import type { NextFunction, Request, Response } from "express";

/**
 * line items view
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
export function lineItemsPage(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const results = getAllSearchResults();

    res.render("main/demo/line-items.njk", {
      results,
    });
  } catch (error) {
    next(processError(error, `fetching claims details for user`));
  }
}

/**
 * line item view
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
export function lineItemPage(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const results = getAllSearchResults();

    res.render("main/demo/line-item.njk", {
      results,
    });
  } catch (error) {
    next(processError(error, `fetching claims details for user`));
  }
}

/**
 * evidence view
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next function
 */
export function evidencePage(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const evidenceId =
      typeof req.query.evidenceId === "string" ? req.query.evidenceId : "";

    if (evidenceId === "") {
      throw new Error("Missing evidenceId");
    }

    const searchResult = getSearchResult(evidenceId);
    const blockIds = searchResult._source.textract_block_ids ?? [];
    const analysisDoc = getAnalysisDoc(searchResult._source.document_id);

    const pages = Array.from(
      new Set(
        analysisDoc.Blocks
          .filter(
            (block) =>
              blockIds.includes(block.Id) && block.Page !== undefined,
          )
          .map((block) => block.Page)
          .filter((page): page is number => page !== undefined),
      ),
    ).sort((a, b) => a - b);

    const [pageNumber] = pages;

    const pdfUrl = "/demo/mixed_expenses.pdf";

    const matchedBlocks = analysisDoc.Blocks.filter((block) => {
      const hasMatchingId = blockIds.includes(block.Id);
      const boundingBox = block.Geometry?.BoundingBox;
      const hasPage = block.Page !== undefined;

      return hasMatchingId && boundingBox !== undefined && hasPage;
    });

    const boundingBoxes = matchedBlocks.map((block) => {
      const boundingBox = block.Geometry?.BoundingBox;

      if (boundingBox === undefined || block.Page === undefined) {
        throw new Error(`Missing bounding box for block ${block.Id}`);
      }

      return {
        blockId: block.Id,
        page: block.Page,
        boundingBox,
      };
    });

    const mergedBox = (() => {
      if (boundingBoxes.length === 0) {
        return null;
      }

      const left = Math.min(...boundingBoxes.map((b) => b.boundingBox.Left));
      const top = Math.min(...boundingBoxes.map((b) => b.boundingBox.Top));

      const right = Math.max(
        ...boundingBoxes.map((b) => b.boundingBox.Left + b.boundingBox.Width),
      );

      const bottom = Math.max(
        ...boundingBoxes.map((b) => b.boundingBox.Top + b.boundingBox.Height),
      );

      const [firstBox] = boundingBoxes;

      return {
        page: firstBox.page,
        boundingBox: {
          Left: left,
          Top: top,
          Width: right - left,
          Height: bottom - top,
        },
      };
    })();

    res.render("main/demo/evidence.njk", {
      evidenceId,
      pdfUrl,
      pageNumber,
      highlightBox: mergedBox,
    });
  } catch (error) {
    next(processError(error, `fetching claims details for user`));
  }
}