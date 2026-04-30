import type { Claim } from "#src/types/Claim.js";
import { formatClaimed, formatDate, formatOptionalString } from "#src/helpers/index.js";
import type { SummaryListRow } from "./components/summaryList.js";
import { Status, StatusTagClass } from "#src/viewmodels/components/status.js";

/**
 *
 */
export class ClaimViewModel {
  readonly summary: SummaryListRow[];
  readonly rows: SummaryListRow[];
  readonly title: string;
  readonly backLink: string = "/"; // todo make "javascript:history.back()" - CSP blocks this currently
  readonly assessLink: string;
  readonly status: Status;
  readonly unassigned: boolean;

  /**
   * Creates a view model containing the summary rows derived from the claim data
   * @param {Claim} claim Array of claims
   */
  constructor(claim: Claim) {
    this.title = "Fixed fee: Special Children Act (Care)"
    this.assessLink = `/claim/${claim.id}/assess`
    // eslint-disable-next-line @typescript-eslint/prefer-destructuring -- temporary while we hardcode values
    this.status = Status.InProgress;
    this.unassigned = false; // TODO - derive from claim

    const summary: SummaryListRow[] = [];
    summary.push({ key: { text: "Total claim amount" }, value: { text: formatClaimed(3480) } });
    summary.push({ key: { text: "Date received" }, value: { text: formatDate(new Date("2026-02-27")) } });
    summary.push({ key: { text: "Case reference number" }, value: { text: "300001820960" } });
    summary.push({ key: { text: "LAA reference number" }, value: { text: "LAA-90d26c" } });
    summary.push({ key: { text: "Assigned to" }, value: { text: "Caseworker name" } });
    summary.push({ key: { text: "Provider risk" }, value: { text: "Low" }, action: { href: "#" } });
    summary.push({ key: { text: "Claim time standard" }, value: { text: "15 minutes" } });

    this.summary = summary;

    const rows: SummaryListRow[] = [];

    rows.push({ key: { text: "Claim ID" }, value: { text: String(claim.id) } });

    if (claim.ufn !== undefined && claim.ufn !== '') {
      rows.push({ key: { text: "UFN" }, value: { text: claim.ufn } });
    }

    if (claim.client !== undefined) {
      rows.push({ key: { text: "Client" }, value: { text: formatOptionalString(claim.client) } });
    }

    if (claim.category !== undefined) {
      rows.push({ key: { text: "Category" }, value: { text: formatOptionalString(claim.category) } });
    }

    if (claim.concluded !== undefined) {
      rows.push({ key: { text: "Concluded" }, value: { text: formatDate(new Date(claim.concluded)) } });
    }

    if (claim.feeType !== undefined) {
      rows.push({ key: { text: "Fee type" }, value: { text: claim.feeType } });
    }

    if (claim.claimed !== undefined) {
      rows.push({ key: { text: "Claimed" }, value: { text: formatClaimed(claim.claimed) } });
    }

    if (claim.submissionId !== undefined) {
      const href = `/submissions/${encodeURIComponent(claim.submissionId)}`;
      rows.push({
        key: { text: "Submission" },
        value: {
          html:
            `<a class="govuk-link" href="${href}">` +
            `View submission<span class="govuk-visually-hidden"> for claim ${this.title}</span>` +
            `</a>`
        }
      });
    }

    this.rows = rows;
  }

  /**
   * Gets the status text
   * @returns {string} the text value of the given status
   */
  get statusText(): string {
    return this.status;
  }

  /**
   * Gets the status tag class
   * @returns {string} the tag class value for the given status
   */
  get statusTagClass(): string {
    return StatusTagClass[this.status];
  }

  /**
   * Gets the text and href of the assignment button
   * @returns {string, string} the text and href for the assignment button
   */
  get assignmentButton(): { text: string; href: string } {
    if (this.unassigned) {
      return {
        text: "Add to my claims",
        href: "#"
      };
    }

    return {
      text: "Remove from your list",
      href: "#"
    };
  }
}
